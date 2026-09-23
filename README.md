# Hosting Support Platform — Frontend

Frontend of the **Hébergement Web Maroc** support platform. A single React application that powers a public marketing website, a customer support portal (tickets, hosting accounts, domains, AI assistant), and a full-featured admin dashboard.

Built with **React 19**, **Vite**, **Redux Toolkit**, **Tailwind CSS** and **shadcn/ui**.

---

## Features

### Public / Marketing
- Landing page, hosting plans, e-commerce and "Site Mojoud" package pages
- Domain search page, FAQ, contact page
- Login / register with JWT-based authentication

### Client Portal
- Dashboard with account overview
- Hosting accounts, domains and website orders management
- Support ticket system (create, list, detail, replies)
- AI assistant and AI chat widget powered by server-side responses
- Notifications, profile and settings

### Admin Panel
- Admin dashboard with analytics charts
- Users management (CRUD)
- Hosting plans & hosting accounts management
- Website orders and ticket management
- FAQ, contacts, workflow logs and settings management
- Admin profile & notifications

### Security & UX
- Protected routes with role-based access (`client` / `admin`)
- Auto-redirect to `/login` and token invalidation on `401`
- Lazy components, responsive sidebar layout, toast notifications

---

## Tech Stack

| Layer    | Tools |
|----------|-------|
| UI       | React 19, React Router v7, Redux Toolkit (RTK), react-redux |
| Styling  | Tailwind CSS, shadcn/ui components, tw-animate-css |
| Charts   | Recharts |
| Tables   | TanStack Table |
| Drag & drop | dnd-kit |
| Forms/validation | Zod, react-hook-form patterns |
| Data layer | Axios (interceptors for auth & 401 handling) |
| Icons    | Tabler Icons, Lucide Icons |
| Fonts    | Geist (variable) |
| Build    | Vite + `@vitejs/plugin-react` |

---

## Getting Started

### Prerequisites
- Node.js **20+**
- npm

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Create environment variables (optional, defaults work out of the box)
cp .env.example .env
```

### Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `/api` | Base URL of the backend API |
| `VITE_APP_NAME` | `Hosting Support Platform` | Application display name |

### Run in development

```bash
npm run dev
```

The dev server runs on `http://localhost:5173` and proxies `/api` requests to the backend at `http://localhost:8081` (configured in `vite.config.js`).

### Production build

```bash
npm run build    # builds to dist/
npm run preview  # locally preview the production build
```

### Lint

```bash
npm run lint
```

---

## Project Structure

```
src/
├── app/                 # App entry & router (AppRouter.jsx)
├── components/
│   ├── ai/              # AI chat widget
│   ├── auth/            # Route guards (Protected, AdminBlock)
│   ├── layout/          # Sidebar, Navbar, Footer, Header, Hero...
│   ├── form/            # Auth forms
│   └── ui/              # shadcn/ui primitives (Button, Card, Dialog...)
├── config/              # Environment config (env.js)
├── context/             # Auth & Toast providers
├── features/            # Redux slices (auth, users, tickets) + async actions
├── hooks/               # Shared hooks (use-mobile)
├── lib/                 # Axios instance, store, utils, role helpers
├── pages/               # Route-level pages
│   ├── admin/           # Admin-only pages
│   ├── client/          # Client portal pages
│   ├── tickets/         # Ticket UI (list/detail/create)
│   ├── plans/           # Marketing plan pages (Plans, Ecommerce, SiteMojoud)
│   ├── accounts/        # Hosting accounts, domains, website orders
│   ├── faq/             # FAQ with admin-managed questions
│   ├── domain/          # Domain landing page
│   ├── contact/         # Contact form page
│   ├── notifications/   # Notifications page
│   └── profile/         # User profile/settings
├── services/            # API service modules (Auth, Ticket, Plan, AI...)
├── style/               # Global CSS (Tailwind directives)
└── utils/               # Helpers (lazyComponent, token expiry)
```

---

## Routing Overview

| Area | Route prefix |
|------|--------------|
| Public | `/`, `/plans`, `/ecommerce`, `/site-mojoud`, `/domain`, `/faq`, `/contact` |
| Auth | `/login`, `/register` |
| Client | `/client/*` (dashboard, tickets, accounts, domains, ai-assistant...) |
| Admin | `/admin/*` (dashboard, users, hosting-plans, tickets, settings...) |

Protected routes are enforced via `<ProtectedRoute requireAdmin>`, and admins are blocked from public storefront routes via `<AdminBlockRoute>`.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Create a production bundle |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint over the project |

---

## Continuous Integration

A GitHub Actions workflow (`.github/workflows/ci.yml`) runs on push/PR to `main`/`master` and executes:

- `npm ci`
- `npm run build`

---

## License

Proprietary — © Hébergement Web Maroc. All rights reserved.