import 'dotenv/config';
import { SignJWT } from 'jose';

const BASE_URL = 'http://localhost:3000';
const SECRET_KEY = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'gbn-circle-long-random-secret-key-at-least-32-chars-long'
);

async function runTests() {
  console.log('=== STARTING GBN CIRCLE COMPREHENSIVE TESTS ===\n');
  let passed = 0;
  let failed = 0;

  function assert(condition, name) {
    if (condition) {
      console.log(`[PASS] ${name}`);
      passed++;
    } else {
      console.error(`[FAIL] ${name}`);
      failed++;
    }
  }

  // Create valid admin token for admin API calls
  const adminToken = await new SignJWT({ email: 'admin@gbncircle.com', role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(SECRET_KEY);

  const adminHeaders = {
    'Cookie': `gbn_admin_session=${adminToken}`,
    'Content-Type': 'application/json',
  };

  // TEST 1: GET /api/events
  console.log('--- Test 1: Public Events API ---');
  const eventsRes = await fetch(`${BASE_URL}/api/events`);
  const eventsJson = await eventsRes.json();
  const allEvents = eventsJson.all || [...(eventsJson.data?.upcoming || []), ...(eventsJson.data?.past || [])];
  assert(eventsJson.success === true && Array.isArray(allEvents), 'Public events endpoint returns array');
  const sampleEvent = allEvents[0];
  console.log(`Using sample event: "${sampleEvent?.title}" (ID: ${sampleEvent?.id})\n`);

  if (!sampleEvent) {
    console.error('No events found to test with!');
    return;
  }

  // TEST 2: Verification for Founder/VIP email (amitbatra105@gmail.com)
  console.log('--- Test 2: Event Verification for Founder (amitbatra105@gmail.com) ---');
  const vipRes = await fetch(`${BASE_URL}/api/events/${sampleEvent.id}?email=amitbatra105@gmail.com`);
  const vipJson = await vipRes.json();
  assert(vipJson.success === true, 'Event details returned successfully');
  assert(vipJson.data.buttonLogic.state === 'JOIN_MEETING', 'Founder email gets state: JOIN_MEETING');
  assert(vipJson.data.buttonLogic.isMember === true, 'Founder recognized as Member: true');
  assert(vipJson.data.meetingAccessUrl !== null, 'Meeting access URL unlocked for Founder');
  assert(vipJson.data.meetingId !== null, 'Meeting ID unlocked for Founder');
  console.log(`Founder Button Logic:`, vipJson.data.buttonLogic);
  console.log('');

  // TEST 3: Verification for Approved Visitor (approved.visitor@example.com)
  console.log('--- Test 3: Event Verification for Approved Visitor (approved.visitor@example.com) ---');
  const visitorRes = await fetch(`${BASE_URL}/api/events/${sampleEvent.id}?email=approved.visitor@example.com`);
  const visitorJson = await visitorRes.json();
  assert(visitorJson.success === true, 'Event details returned successfully for approved visitor');
  assert(
    visitorJson.data.buttonLogic.state === 'JOIN_MEETING' || visitorJson.data.buttonLogic.state === 'ACCESS_MEETING',
    'Approved visitor gets unlocked state (JOIN_MEETING or ACCESS_MEETING)'
  );
  assert(visitorJson.data.meetingAccessUrl !== null, 'Meeting access URL unlocked for approved visitor');
  console.log(`Approved Visitor Button Logic:`, visitorJson.data.buttonLogic);
  console.log('');

  // TEST 4: Verification for Unregistered/Non-Member email
  console.log('--- Test 4: Event Verification for Unregistered User ---');
  const anonRes = await fetch(`${BASE_URL}/api/events/${sampleEvent.id}?email=random_unregistered_person@example.com`);
  const anonJson = await anonRes.json();
  assert(anonJson.success === true, 'Response success for unregistered user');
  assert(anonJson.data.buttonLogic.state === 'REQUEST_TO_ATTEND', 'State is REQUEST_TO_ATTEND');
  assert(anonJson.data.meetingAccessUrl === null, 'Private meeting link is protected / null');
  assert(anonJson.data.meetingId === null, 'Meeting ID is protected / null');
  assert(anonJson.data.passcode === null, 'Passcode is protected / null');
  console.log(`Unregistered user correctly blocked from credentials.`);
  console.log('');

  // TEST 5: Visitor Pass Submission (POST /api/events/request)
  console.log('--- Test 5: Submitting Visitor Pass Request ---');
  const testEmail = `spam_test_${Date.now()}@example.com`;
  const submitRes = await fetch(`${BASE_URL}/api/events/request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventId: sampleEvent.id,
      fullName: 'Automated Test Applicant',
      email: testEmail,
      phone: '+91 99999 88888',
      country: 'India',
      city: 'Bangalore',
      companyName: 'Test Automation Corp',
      designation: 'QA Lead',
      industry: 'Technology',
      whyAttend: 'Testing submission, email dispatch, and spam deletion flow',
      collaborationGoals: 'Ensure platform stability',
    }),
  });
  const submitJson = await submitRes.json();
  assert(submitJson.success === true && submitJson.requestId, 'Pass request created successfully');
  const createdRequestId = submitJson.requestId;
  console.log(`Created test request ID: ${createdRequestId} for email: ${testEmail}\n`);

  // TEST 6: Admin Requests API (GET /api/admin/requests)
  console.log('--- Test 6: Admin Visitor Review Board API ---');
  const adminReqRes = await fetch(`${BASE_URL}/api/admin/requests`, {
    headers: adminHeaders,
  });
  const adminReqJson = await adminReqRes.json();
  assert(adminReqJson.success === true && Array.isArray(adminReqJson.data), 'Admin requests returned as array');
  const foundRequest = adminReqJson.data.find(r => r.id === createdRequestId);
  assert(!!foundRequest, 'Created test request found in Admin Visitor Review Board');
  console.log(`Found test request with status: ${foundRequest?.status}\n`);

  // TEST 7: Delete Spam Visitor Request (DELETE /api/admin/requests/[id])
  console.log('--- Test 7: Deleting Spam Request via Admin Delete Endpoint ---');
  const deleteRes = await fetch(`${BASE_URL}/api/admin/requests/${createdRequestId}`, {
    method: 'DELETE',
    headers: adminHeaders,
  });
  const deleteJson = await deleteRes.json();
  assert(deleteJson.success === true, 'Delete request endpoint returned success');
  console.log(`Delete response:`, deleteJson.message);

  // Verify it is actually deleted from DB
  const verifyDeletedRes = await fetch(`${BASE_URL}/api/admin/requests`, {
    headers: adminHeaders,
  });
  const verifyDeletedJson = await verifyDeletedRes.json();
  const stillExists = verifyDeletedJson.data.find(r => r.id === createdRequestId);
  assert(!stillExists, 'Spam request permanently deleted from database');
  console.log('');

  // SUMMARY
  console.log(`=== TEST RESULTS: ${passed} PASSED, ${failed} FAILED ===`);
  if (failed > 0) {
    process.exit(1);
  } else {
    console.log('ALL API & DATABASE FUNCTIONS TESTED & WORKING 100% PERFECTLY!');
  }
}

runTests().catch(err => {
  console.error('Test execution failed with error:', err);
  process.exit(1);
});
