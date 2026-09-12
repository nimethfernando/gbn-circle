# GBN Circle — Project Handover & Technical Documentation

**Client:** Amit Batra  
**Project:** GBN Circle Web Platform & CMS  
**Date:** September 2026  

---

## 1. Executive Summary

GBN Circle is a modern, high-performance web platform tailored with a deep navy and gold aesthetic. It features an informative multi-page public portal along with an administrative CMS dashboard to manage dynamic events, blogs, contact inquiries, and attendee access workflows.

---

## 2. Architecture & Technology Stack

- **Frontend Framework:** Next.js (App Router, TypeScript) for server-rendered page performance and SEO optimization.
- **Styling & UI:** Tailwind CSS paired with Lucide React icons for a responsive, mobile-first design system.
- **Backend & API:** Next.js API Routes (Node.js runtime) managing business logic, secure endpoints, and form submissions.
- **Database & ORM:** Prisma ORM connecting to an underlying database for persistent storage of events, attendees, blogs, and inquiries.
- **Security & Auth:** Dedicated admin authentication layer protecting CMS routes and member data.

---

## 3. Key Features & Modules

### Public Web Portal
- **Home Page:** Dynamic showcase introducing the GBN Circle network, core values, upcoming events, and network journey.
- **About Page:** Brand story, mission, and strategic global vision.
- **Leadership Page:** Profiles highlighting executive leadership and network advisors.
- **Community & Members:** Member network directory and business categories.
- **Events System:** Filterable list of upcoming and past events with a dedicated registration request form.
- **Contact & Inquiries:** Direct contact form with backend submission handling.

### Admin CMS Dashboard (`/admin`)
- **Event Management:** Create, edit, duplicate, activate/deactivate, and archive events.
- **Attendee Requests:** Review and approve/reject visitor access requests before disclosing private meeting links/venue details.
- **Blog Management:** Publish and update thought leadership articles and news.
- **Inquiry Inbox:** Centralized review of all incoming contact submissions.

---

## 4. Repository & Directory Structure

```plaintext
gbn-circle/
├── prisma/
│   ├── schema.prisma          # Database schema definitions
│   └── seed.ts                # Initial seed data for testing
├── public/                    # Static assets, logos, and event imagery
├── src/
│   ├── app/
│   │   ├── about/             # About page route
│   │   ├── admin/             # Secure CMS dashboard (Events, Blogs, Inquiries)
│   │   ├── api/               # Server-side Node.js API routes & endpoints
│   │   ├── blogs/             # Blog listing and detail routes
│   │   ├── community/         # Member community directory route
│   │   ├── contact/           # Contact form and location details route
│   │   ├── events/            # Events listing, dynamic [id] details & requests
│   │   ├── leadership/        # Leadership showcase route
│   │   └── page.tsx           # Main homepage
│   ├── components/            # Reusable modular UI components (Hero, Layout, Forms)
│   └── lib/                   # Auth handlers and Prisma DB client instances
├── package.json               # Node.js project dependencies & build scripts
└── tsconfig.json              # TypeScript configuration
```

---

## 5. Local Setup & Development

To run the project locally on your development machine:

### Clone & Install Dependencies:
```bash
npm install
```

### Environment Variables:
Create a `.env` file in the root directory:
```env
DATABASE_URL="your-database-connection-string"
ADMIN_PASSWORD="your-admin-secure-password"
```

### Database Migration & Seeding:
```bash
npx prisma migrate dev
npx prisma db seed
```

### Start Development Server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 6. Production Deployment (BigRock cPanel)

### Build the Application:
```bash
npm run build
```

### cPanel Node.js Configuration:
1. Open **Setup Node.js App** in the BigRock cPanel.
2. Select Node.js version **18.x** or **20.x**.
3. Set the **Application Root** to the directory containing the build files.
4. Set the **Application Startup File** to `node_modules/next/dist/bin/next` with argument `start` (or run a standalone server entry point).
5. Ensure environment variables (`DATABASE_URL`, `PORT`) are configured in the cPanel environment settings.

### DNS Configuration (GoDaddy):
- Point the GoDaddy **A Record** (`@`) to the BigRock server IP address.
- Point the **CNAME** (`www`) to your domain.

---

## 7. Maintenance & Next Steps

- **Future Enhancements:** Direct integration with payment gateways (Razorpay/Stripe) for paid event bookings, or automated transactional email dispatch via Resend/SendGrid.
- **Backups:** Schedule automated exports of the database via cPanel or cloud DB snapshots prior to running batch updates.
