# INOVIQ GLOBAL PVT. LTD. — Premium Full-Stack MERN Website

> **"Ideas Into Impact. Digital Solutions That Grow Your Business."**

A complete, production-ready, full-stack business web application built for **INOVIQ GLOBAL PVT. LTD.** featuring all 5 core service domains (48+ catalogued services), interactive quotation and customer inquiry management, real MongoDB database persistence, secure JWT administrator portal, responsive design, and technical SEO optimization.

---

## 🌟 Executive Overview & Key Features

- **Brand Identity & Aesthetic:**
  - Modern corporate digital agency styling tailored in deep navy (`#0A192F`), electric blue (`#0066FF`), cyan accents, clean typography (Outfit & Plus Jakarta Sans), rounded cards, glassmorphic headers, and micro-interactions.
  - Bespoke vector brand mark for **INOVIQ GLOBAL PVT. LTD.**
- **Comprehensive Public Pages (15 Routes):**
  - **Homepage (`/`):** Announcement strip, responsive mega-menu navigation, animated hero section with digital visual showcase, trust metrics, 5 service domain cards, why choose us, 5-step process, featured demonstration case studies, customer feedback framework, FAQ accordion, strong conversion CTA, and dark navy corporate footer.
  - **About Us (`/about`):** Corporate story, mission, vision, 5 core values, operational philosophy, and regulatory commitment.
  - **All Services Directory (`/services`):** Searchable and filterable directory of all 48+ services with direct "Enquire Now" popups.
  - **Graphic Design (`/services/graphic-design`):** All 20 specialized Category A services (2D/3D Logo, Visiting Card, Letterhead, Full HD Intro Video, Promotional Video, Company Profile, Packaging, Labels, 3D Rendering, etc.).
  - **Web Development (`/services/web-development`):** All 7 Category B services (Dynamic MERN Web Apps, Headless E-commerce, Digital NFC Business Cards, Website SEO, Chatbots & AI Customer Support).
  - **Digital Services (`/services/digital-services`):** All 8 Category C services (Google My Business / Profile Setup, Facebook Page Creation & Follower Growth, Instagram Business Creation & Organic Strategy, Social Media Handling, YouTube Management, Marketplace Storefronts) with policy-compliant organic guarantees.
  - **Marketing Services (`/services/marketing`):** All 8 Category D services (Meta Ads, Consent-based Bulk WhatsApp Marketing, Registered DLT SMS, Local Area Geo-fencing, Marketing Strategy, Influencer Marketing & Event Activations).
  - **Legal & Business Support (`/services/legal-business-support`):** All 5 Category E services (Trademark Search Assistance, Company Registration Paperwork Support, Digital Payment Gateways, WhatsApp Business API Onboarding, Domain & DNS Setup) with clear administrative disclaimers.
  - **Our Work / Portfolio (`/portfolio`):** Filterable demonstration case studies with industry categories, tags, and challenge/solution breakdowns.
  - **Portfolio Case Study (`/portfolio/:slug`):** Comprehensive project detail page with client industry, challenge, solution, deliverables, and contextual quotation form.
  - **Contact Us (`/contact`):** Full contact details, office hours, registered Sikar address, telephone, email, WhatsApp click-to-chat, and inquiry form.
  - **Get a Quote (`/get-a-quote`):** Dedicated quotation wizard explaining the 3-step evaluation process.
  - **Frequently Asked Questions (`/faq`):** Categorized and searchable FAQ accordion.
  - **Privacy Policy (`/privacy-policy`):** Transparent data processing terms, inquiry storage in MongoDB, and deletion rights.
  - **Terms & Conditions (`/terms-and-conditions`):** Business engagement terms, IP transfer upon settlement, and administrative disclaimers.
  - **Custom 404 (`*`):** Animated 404 page with return-to-home and service shortcuts.
- **Customer Inquiry & Quotation Workflow:**
  - Automated generation of unique tracking reference numbers (e.g. `INQ-2026-6BZTH`).
  - Frontend and server-side validation and sanitization.
  - Accidental duplicate submission protection.
  - Immediate on-screen confirmation with "Copy Reference" button.
  - Background asynchronous email notification dispatch (Nodemailer) with graceful fallback.
- **Secure Administrator Portal (`/admin`):**
  - Protected with bcrypt password hashing and JSON Web Tokens (JWT).
  - **Dashboard (`/admin/dashboard`):** Real MongoDB metrics (Total, New, In Progress, Contacted, Quoted, Converted, Closed), domain breakdown, and recent submissions table.
  - **Inquiry Management (`/admin/inquiries`):** Searchable, filterable by status & category & date, paginated table, quick status updates, internal admin notes timeline, scheduled follow-up calendar, and deletion confirmation.
  - **CSV Export:** Formula-injection sanitized spreadsheet export with one click.
  - **Services Management (`/admin/services`):** Full database-backed CRUD to add, edit, publish/unpublish, and reorder catalogued services.
  - **Portfolio Management (`/admin/portfolio`):** Add, update, and manage case studies with demonstration labels.
  - **Site Settings (`/admin/settings`):** Live configuration of telephone, email, address, WhatsApp number, and top announcement bar.

---

## 🏗️ Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | React.js 19 + Vite 8 | Lightning-fast build and reactive rendering |
| **Styling** | Tailwind CSS v4 + Vanilla CSS | Modern glassmorphism, gradients, and custom animations |
| **Icons** | Lucide React | Clean, scalable vector icon library |
| **Routing** | React Router v7 | Client-side routing with public and protected admin layouts |
| **HTTP Client** | Axios | REST API client with JWT interceptor and auto 401 handling |
| **Backend Runtime** | Node.js (v24+) | High-performance asynchronous JavaScript runtime |
| **Backend Framework** | Express.js 4 | RESTful architecture with routing and middleware |
| **Database** | MongoDB / Mongoose | Schemas, validation, indexes, and full CRUD |
| **Security & Headers** | Helmet + CORS | Content security headers, origin allowlist, and XSS defense |
| **Rate Limiting** | express-rate-limit | Brute-force and inquiry spam prevention |
| **Authentication** | JWT + bcryptjs | Secure token authentication and salted password hashing |
| **Logging** | Morgan | Clean request logging (excluding passwords and tokens) |
| **Email Notifications** | Nodemailer | Asynchronous customer acknowledgement and admin alerts |

---

## 📁 Repository Folder Structure

```
INOVIQ SIKAR/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection (Atlas & in-memory fallback)
│   ├── controllers/
│   │   ├── authController.js     # Admin login, profile, and logout
│   │   ├── inquiryController.js  # Inquiry submission, pagination, stats, CSV export
│   │   ├── serviceController.js  # Public & Admin services CRUD
│   │   ├── portfolioController.js# Public & Admin portfolio CRUD
│   │   └── settingsController.js # Site settings and company profile
│   ├── middleware/
│   │   ├── auth.js               # JWT verification & role authorization
│   │   ├── errorHandler.js       # Centralized error handler & status codes
│   │   └── rateLimiter.js        # IP rate limiters for auth & inquiries
│   ├── models/
│   │   ├── Admin.js              # Admin schema with bcrypt hooks
│   │   ├── Inquiry.js            # Customer inquiry schema with reference numbers
│   │   ├── Service.js            # 48+ services schema across 5 categories
│   │   ├── Portfolio.js          # Demonstration case studies schema
│   │   └── Setting.js            # Dynamic site configuration schema
│   ├── routes/
│   │   ├── authRoutes.js         # /api/admin/auth/*
│   │   ├── healthRoutes.js       # /api/health
│   │   ├── inquiryRoutes.js      # /api/inquiries, /api/contact, /api/admin/inquiries/*
│   │   ├── portfolioRoutes.js    # /api/portfolio, /api/admin/portfolio/*
│   │   ├── serviceRoutes.js      # /api/services, /api/admin/services/*
│   │   └── settingsRoutes.js     # /api/settings, /api/admin/settings
│   ├── scripts/
│   │   └── seed.js               # Idempotent seed script (admin, 48 services, demo projects)
│   ├── services/
│   │   └── emailService.js       # Nodemailer notification service
│   ├── .env                      # Local environment configuration
│   ├── .env.example              # Example environment template
│   ├── package.json              # Backend dependencies and scripts
│   └── server.js                 # Express server entrypoint
│
├── frontend/
│   ├── public/
│   │   ├── favicon.svg           # High-resolution vector brand mark
│   │   ├── robots.txt            # Search engine directives
│   │   └── sitemap.xml           # XML sitemap for SEO indexing
│   ├── src/
│   │   ├── components/
│   │   │   ├── FloatingActions.jsx  # Floating WhatsApp, quote pill, and scroll-to-top
│   │   │   ├── Footer.jsx           # Dark navy corporate footer with legal disclaimer
│   │   │   ├── InquiryForm.jsx      # Reusable validated quotation form
│   │   │   ├── InquiryModal.jsx     # "Enquire Now" popup dialog
│   │   │   ├── Logo.jsx             # INOVIQ GLOBAL PVT. LTD. brand mark
│   │   │   └── Navbar.jsx           # Top strip, logo, mega-menu, and mobile drawer
│   │   ├── layouts/
│   │   │   ├── AdminLayout.jsx      # Authenticated admin panel with sidebar & export
│   │   │   └── PublicLayout.jsx     # Public layout with auto-scroll reset
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.jsx     # Real-time metrics and recent inquiries
│   │   │   │   ├── AdminInquiries.jsx     # Searchable, paginated table & CSV export
│   │   │   │   ├── AdminInquiryDetail.jsx # Requirements view, notes, status update
│   │   │   │   ├── AdminPortfolio.jsx     # Portfolio management
│   │   │   │   ├── AdminServices.jsx      # Service catalog CRUD
│   │   │   │   ├── AdminSettings.jsx      # Company settings & announcement bar
│   │   │   │   └── AdminLogin.jsx         # Secure login screen with demo helper
│   │   │   ├── services/
│   │   │   │   ├── DigitalServices.jsx    # Category C (8 services)
│   │   │   │   ├── GraphicDesign.jsx      # Category A (20 services)
│   │   │   │   ├── LegalBusinessSupport.jsx# Category E (5 services + disclaimer)
│   │   │   │   ├── MarketingServices.jsx  # Category D (8 services)
│   │   │   │   └── WebDevelopment.jsx     # Category B (7 services)
│   │   │   ├── About.jsx            # Company story, mission, and 5 pillars
│   │   │   ├── Contact.jsx          # Contact info, phone, email, Sikar office
│   │   │   ├── FAQ.jsx              # Categorized search and accordion FAQ
│   │   │   ├── GetAQuote.jsx        # Dedicated quotation workflow
│   │   │   ├── Home.jsx             # Full corporate homepage
│   │   │   ├── NotFound.jsx         # Custom 404 page
│   │   │   ├── Portfolio.jsx        # Demonstration portfolio directory
│   │   │   ├── PortfolioDetail.jsx  # Case study challenge, solution, and outcomes
│   │   │   ├── PrivacyPolicy.jsx    # Data privacy and MongoDB storage notice
│   │   │   ├── ServicesIndex.jsx    # 48+ services searchable index
│   │   │   └── TermsConditions.jsx  # Terms of business and intellectual property
│   │   ├── services/
│   │   │   └── api.js               # Axios instance, endpoints, and CSV download
│   │   ├── App.jsx                  # Main routing hierarchy
│   │   ├── index.css                # Tailwind v4 import & design tokens
│   │   └── main.jsx                 # React root & BrowserRouter
│   ├── index.html                   # SEO title, meta tags, and JSON-LD schema
│   ├── package.json                 # Frontend dependencies and scripts
│   └── vite.config.js               # Vite config with Tailwind & API proxy
│
└── README.md                        # Master project documentation
```

---

## 🚀 Running The Application Locally

### Prerequisites
- Node.js v18+ (tested on Node.js v24)
- npm v9+

### 1. Backend Setup
Open a terminal in the project directory:
```bash
cd backend
npm install
```

Start the backend development server:
```bash
npm run dev
# Or standard start:
npm start
```
The backend server will run on `http://localhost:5000`.
- **Health Check Endpoint:** `http://localhost:5000/api/health`
- **Zero-Setup Database:** The backend automatically connects to MongoDB Atlas if `MONGO_URI` is provided, or seamlessly launches an in-memory database fallback if MongoDB is not locally running!

### 2. Idempotent Database Seeding
To populate or refresh the 48 services, demonstration projects, and the initial administrator account:
```bash
cd backend
npm run seed
```

### 3. Frontend Setup
Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```
The frontend will start on `http://localhost:5173` (or the next available port like `5174`) and automatically proxy `/api` requests to the backend server.

---

## 🔑 Initial Administrator Credentials

When the database is seeded or starts for the first time, a secure administrator account is initialized:

- **Portal URL:** `http://localhost:5173/admin/login` (or `/admin/login` in production)
- **Email:** `admin@INOVIQglobal.com`
- **Password:** `INOVIQAdmin@2026`
- **Role:** Superadmin

> **Security Note:** In production, update the administrator password immediately via the Admin Settings or environment variables.

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

```env
# Server Port
PORT=5000
NODE_ENV=development

# Database Connection (MongoDB Atlas or Local MongoDB)
# For Atlas, use: mongodb+srv://<username>:<password>@cluster0.mongodb.net/INOVIQ_global?retryWrites=true&w=majority
MONGO_URI=mongodb://localhost:27017/INOVIQ_global

# Authentication Secret
JWT_SECRET=INOVIQ_super_secure_jwt_token_key_change_in_production_2026
JWT_EXPIRES_IN=7d

# Allowed Frontend Origin for CORS
FRONTEND_URL=http://localhost:5173

# Optional: Nodemailer SMTP Settings (Inquiries are saved safely even if blank)
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=no-reply@INOVIQglobal.com
ADMIN_NOTIFICATION_EMAIL=inquiries@INOVIQglobal.com

# Company Information Placeholders
COMPANY_NAME=INOVIQ GLOBAL PVT. LTD.
COMPANY_EMAIL=info@inoviqglobal.com
COMPANY_PHONE=+91 80001 80600
COMPANY_ADDRESS=Corporate Towers, Tech Corridor, Sikar, Rajasthan, India
```

### Frontend (`frontend/.env`)

```env
# In development, leave blank to use the Vite proxy (/api -> http://localhost:5000).
# In production on Netlify, point to your deployed Render backend:
VITE_API_BASE_URL=https://your-INOVIQ-backend.onrender.com/api
```

---

## 🧪 Testing & Verification Guide

1. **Public Site Navigation:**
   - Open `http://localhost:5173/` in your browser.
   - Test the navigation links: Home, About Us, Services (with mega-menu), Our Work, Contact Us, and Get a Quote.
2. **5 Service Domain Pages:**
   - Browse `/services/graphic-design` (20 design services).
   - Browse `/services/web-development` (7 web engineering services).
   - Browse `/services/digital-services` (8 organic social & map services).
   - Browse `/services/marketing` (8 performance marketing services).
   - Browse `/services/legal-business-support` (5 business support services with administrative disclaimer).
3. **Customer Inquiry Submission:**
   - Go to `/get-a-quote` or click "Enquire Now" on any service card.
   - Fill in your details and submit.
   - Verify that a unique tracking reference number (e.g. `INQ-2026-XXXXX`) is generated and displayed with the "Copy" button.
4. **Admin Dashboard Review & Persistence:**
   - Go to `/admin/login`.
   - Log in with `admin@INOVIQglobal.com` / `INOVIQAdmin@2026`.
   - Verify that your newly submitted inquiry appears at the top of the table.
   - Open the inquiry details, change the status to "In Progress", type an internal note, and save.
   - Refresh the page or log out and log in again: observe that the status and notes persist in MongoDB.
5. **CSV Export:**
   - In the Admin Dashboard or Inquiries page, click **Export CSV**.
   - Verify that the downloaded file contains all customer inquiry fields with spreadsheet formula-injection protection (`'` prefix on formula triggers).

---

## 🌐 Production Deployment Instructions

### 1. MongoDB Atlas Setup (Database)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign in.
2. Create a free **M0 Sandbox Cluster**.
3. Under **Database Access**, create a user (e.g. `INOVIQ_user`) with a strong password.
4. Under **Network Access**, add `0.0.0.0/0` (Allow access from anywhere) so cloud hosts like Render can connect.
5. Click **Connect** > **Drivers** > Copy the connection string:
   ```
   mongodb+srv://INOVIQ_user:<password>@cluster0.xxxxxx.mongodb.net/INOVIQ_global?retryWrites=true&w=majority
   ```

### 2. Render Deployment (Backend API)
1. Go to [Render.com](https://render.com) and create a new **Web Service**.
2. Connect your Git repository.
3. Configure the settings:
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
4. Under **Environment Variables**, add:
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `MONGO_URI`: *Your MongoDB Atlas connection string*
   - `JWT_SECRET`: *A random 64-character secret string*
   - `FRONTEND_URL`: *Your Netlify frontend domain (e.g. `https://INOVIQglobal.netlify.app`)*
5. Deploy. Once deployed, copy your backend URL (e.g. `https://INOVIQ-backend.onrender.com`).

### 3. Netlify Deployment (Frontend React App)
1. Go to [Netlify.com](https://www.netlify.com) and click **Add new site** > **Import an existing project**.
2. Connect your Git repository.
3. Configure the build settings:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
4. Under **Environment Variables**, add:
   - `VITE_API_BASE_URL`: `https://your-backend-name.onrender.com/api`
5. Deploy the site.
6. Configure SPA redirects by adding a `_redirects` file in `frontend/public/`:
   ```
   /*    /index.html   200
   ```
   *(This ensures that client-side React Router handles all direct URL refreshes like `/services/graphic-design` or `/admin/dashboard`).*

### 4. Custom Domain & SSL
1. In Netlify, go to **Domain management** > **Add a domain** > enter `INOVIQglobal.com`.
2. Configure your DNS provider (e.g. GoDaddy, Namecheap, Cloudflare) with Netlify’s CNAME or ALIAS records.
3. Netlify will automatically provision a free Let's Encrypt SSL/TLS HTTPS certificate.

---

## 🔍 Technical SEO & Google Search Console

- **Sitemap:** Available at `/sitemap.xml` containing all 15 public URLs with priority ratings.
- **Robots.txt:** Available at `/robots.txt` allowing public indexation while disallowing `/admin/` and `/api/`.
- **Structured Data:** Embedded JSON-LD schema (`schema.org/Organization`) in `index.html`.
- **Connecting Google Search Console:**
  1. Open [Google Search Console](https://search.google.com/search-console).
  2. Add your domain property (`INOVIQglobal.com`).
  3. Verify ownership via DNS TXT record or HTML meta tag.
  4. Submit your sitemap URL: `https://INOVIQglobal.com/sitemap.xml`.

---

## 🛡️ Security & Privacy Compliance

- **NoSQL Injection Defense:** All queries sanitize inputs with Mongoose parameter binding.
- **Rate Limiting:** Prevents brute-force login attempts and automated inquiry submission bots.
- **CORS Protection:** Configured to allow only trusted frontend domains.
- **CSV Formula Sanitization:** Protects spreadsheets against CSV command injection by escaping cells starting with `=`, `+`, `-`, `@`, `\t`, or `\r`.
- **Administrative Transparency:** Clear disclaimers stating that INOVIQ GLOBAL PVT. LTD. provides technical configuration and administrative documentation coordination, distinguishing our services from regulated professional legal representation.

---

## 🤝 Project Support & Contact

**INOVIQ GLOBAL PVT. LTD.**  
- **Corporate Address:** 2nd Floor, Bhawani Plaza,
Chandpol Gate, Sikar,
Rajasthan 332001  
- **Email:** [info@inoviqglobal.com](mailto:info@inoviqglobal.com)  
- **Telephone / WhatsApp:** +91 80001 80600  
- **Office Hours:** Monday – Saturday: 9:30 AM – 7:00 PM IST  
