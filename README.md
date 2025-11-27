# Modern Blog Frontend (Next.js 16+)

A high-performance, SEO-optimized frontend for a full-stack blogging platform. Built with **Next.js (App Router)**, **TypeScript**, and **Shadcn UI**, this project showcases the bleeding edge of modern web development features like Server Actions, advanced caching strategies, and streaming.

This frontend is designed to consume the **Dockerized Express/Prisma Backend**.

---

## Tech Stack

- **Framework:** Next.js 16+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Shadcn UI
- **Icons:** Lucide React
- **Validation:** Zod
- **Forms:** React Server Actions, `useActionState`
- **Notifications:** Sonner
- **Animation:** Framer Motion (optional integration ready)

---

## Key Features

### **Advanced Next.js Architecture**

- **Server Components First:** 95% of the application runs on the server for maximum performance and SEO.
- **Advanced Caching:** Utilizes React's `cache()`, the `'use cache'` directive, and `revalidateTag` for granular, on-demand cache invalidation.
- **Streaming & Suspense:** Implements granular `<Suspense>` boundaries with Skeleton loaders to prevent blocking the UI while fetching data.
- **Dynamic SEO:** Fully dynamic metadata generation for Open Graph, Twitter Cards, and Canonical URLs for every blog post.

### **Security & Authentication**

- **Middleware Protection:** A robust `proxy.ts` (middleware) handles route protection and Role-Based Access Control (RBAC).
- **HttpOnly Cookies:** Authentication relies on secure cookies set by the backend, ensuring tokens are never exposed to client-side JavaScript.
- **Server Actions:** All mutations (Login, Register, Create Post, Update Profile) are handled via Server Actions, keeping API keys and logic off the client.

### **Modern UI/UX**

- **Admin Dashboard:** A secured dashboard with a Sidebar, Stats overview, and Data Tables.
- **Interactive Search:** Debounced search functionality with URL state management.
- **Responsive Design:** Fully mobile-responsive Navbar, Sidebar, and Layouts.
- **Engagement:** Users can read and post reviews on articles.

---

## Getting Started

### Prerequisites

1.  **Node.js** (v18 or higher)
2.  **Backend API Running:** Ensure your [Backend API](https://github.com/devsafix/blog-app-backend) is running on port `5000`.

### 1\. Installation

Clone the repository:

```bash
git clone https://github.com/devsafix/blog-app-client
cd blog-app-client
```

Install dependencies:

```bash
npm install
```

### 2\. Environment Setup

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

**Required Variables:**

```env
# The URL of your running backend (Express)
API_BASE_URL="http://localhost:5000/api/v1"

# Must match the JWT_SECRET in your backend .env (used for Middleware verification)
JWT_SECRET="your-super-secret-key-change-this"
```

### 3\. Run Development Server

```bash
npm run dev
# The app will be available at http://localhost:3000
```

---

## Folder Structure

```
src/
│── actions
│── app/
│   ├── (auth)/             # Login & Register routes (Auth Layout)
│   ├── (common)/           # Public routes (Home, Blog, About)
│   ├── dashboard/          # Admin/User Dashboard (Protected)
│   │   ├── posts/          # CRUD for Posts (Admin only)
│   │   ├── settings/       # User Profile Settings
│   │   └── page.tsx        # Stats Overview
│   ├── layout.tsx          # Root Layout with Toaster & Context
│   └── globals.css         # Tailwind directives
│── components/
│   ├── dashboard/          # Sidebar, Header
│   ├── modules/            # Feature-specific components (ReviewForm, etc.)
│   ├── shared/             # Reusable (Navbar, Footer, Pagination)
│   └── ui/                 # Shadcn UI primitives (Button, Input, etc.)
│── lib/
│   ├── actions.ts          # Server Actions (Mutations)
│   ├── auth.ts             # Auth utilities (JWT verification)
│   ├── data.ts             # Data fetching (Cached functions)
│   └── utils.ts            # CN helper
│── types/                  # TypeScript interfaces
│── proxy.ts           # Route protection & RBAC logic
```

---

## Key Concepts Implemented

### 1\. The "Fetch & Cache" Pattern

We avoid `useEffect` for data fetching. Instead, we fetch directly in Server Components using `lib/data.ts`.

```typescript
// Example: Cached Data Fetching
export async function getPostById(id: string) {
  "use cache";
  cacheTag(`post:${id}`);
  // ... fetch logic
}
```

### 2\. The "Server Action" Pattern

We avoid API Routes (`/api/auth/...`) for mutations. Instead, we use Server Actions in `lib/actions.ts`.

```typescript
// Example: Server Action
export async function createPostAction(formData: FormData) {
  "use server";
  // ... validate, fetch backend, revalidateTag('posts')
}
```

### 3\. Middleware Security

The `proxy.ts` file runs on the Edge. It decodes the HttpOnly cookie to check for the user's role (`ADMIN` vs `USER`) before the request even reaches the layout, providing instant redirects for unauthorized access.

---

## Scripts

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Contribution

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
