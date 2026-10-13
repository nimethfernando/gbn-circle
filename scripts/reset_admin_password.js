const crypto = require('crypto');
const mariadb = require('mariadb');
require('dotenv').config();

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
  try {
    const [salt, key] = storedHash.split(':');
    if (!salt || !key) return false;
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    return crypto.timingSafeEqual(Buffer.from(key, 'hex'), Buffer.from(hash, 'hex'));
  } catch {
    return false;
  }
}

async function main() {
  const newPassword = process.argv[2] || 'Admin@2026';
  console.log(`Setting GBN Circle admin password to: "${newPassword}"`);

  const rawConnString = process.env.DATABASE_URL;
  // Parse MariaDB connection string
  // mariadb://user:pass@host:port/db
  const parsed = new URL(rawConnString.replace('mariadb://', 'http://'));

  const pool = mariadb.createPool({
    host: parsed.hostname,
    port: parseInt(parsed.port || '3306'),
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    database: parsed.pathname.replace(/^\//, ''),
    connectionLimit: 5,
    connectTimeout: 15000,
  });

  const conn = await pool.getConnection();
  try {
    console.log('Connected to MariaDB database.');

    // Direct reset of admin security credentials
    console.log('\n--- Updating GBN Circle Admin Security Credentials ---');
    const newHash = hashPassword(newPassword);
    const securityData = {
      adminEmail: 'gbncircle@gmail.com',
      passwordHash: newHash,
      lastChangedAt: new Date().toISOString(),
    };
    const jsonStr = JSON.stringify(securityData);

    const existing = await conn.query("SELECT * FROM PageContent WHERE slug = 'admin_security'");
    if (existing.length > 0) {
      await conn.query(
        "UPDATE PageContent SET title = 'Admin Security Credentials', data = ?, updatedAt = NOW() WHERE slug = 'admin_security'",
        [jsonStr]
      );
      console.log('Updated existing admin_security record.');
    } else {
      const id = 'admin_sec_' + Date.now();
      await conn.query(
        "INSERT INTO PageContent (id, slug, title, data, createdAt, updatedAt) VALUES (?, 'admin_security', 'Admin Security Credentials', ?, NOW(), NOW())",
        [id, jsonStr]
      );
      console.log('Inserted new admin_security record.');
    }

    // 3. Verify verification check passes
    const row = await conn.query("SELECT * FROM PageContent WHERE slug = 'admin_security'");
    const savedData = JSON.parse(row[0].data);
    const isVerified = verifyPassword(newPassword, savedData.passwordHash);
    console.log('\nVerification Test:');
    console.log(' - Admin Email:', savedData.adminEmail);
    console.log(' - Password match test:', isVerified ? '✓ SUCCESS' : '✗ FAILED');
    console.log(' - Last changed at:', savedData.lastChangedAt);

    if (!isVerified) {
      throw new Error('Self-test failed: Password verification did not pass.');
    }

    console.log('\n=============================================');
    console.log('Admin credentials successfully updated:');
    console.log('  Email:    gbncircle@gmail.com');
    console.log('  Password: ' + newPassword);
    console.log('=============================================\n');
  } finally {
    conn.release();
    await pool.end();
  }
}

main().catch(err => {
  console.error('Error resetting admin credentials:', err);
  process.exit(1);
});

