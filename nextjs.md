### **1. Routing in Next.js**
Next.js uses a file-based routing system where the folder structure in the `app` directory defines routes.

- **Explanation**: Files like `page.tsx` in the `app` folder map to routes. For example, `app/about/page.tsx` creates the `/about` route.
- **Example 1**: Basic route
```tsx
// app/page.tsx
export default function Home() {
  return <h1>Home Page</h1>;
}

// app/about/page.tsx
export default function About() {
  return <h1>About Page</h1>;
}
```
*Access*: `/` for Home, `/about` for About.

- **Example 2**: Folder-based routing
```tsx
// app/contact/page.tsx
export default function Contact() {
  return <h1>Contact Us</h1>;
}
```
*Access*: `/contact`.

---

### **2. Nested Routes**
Nested routes are created by nesting folders in the `app` directory.

- **Explanation**: A folder inside another folder creates a nested route, e.g., `app/dashboard/settings/page.tsx` maps to `/dashboard/settings`.
- **Example 1**: Simple nested route
```tsx
// app/dashboard/page.tsx
export default function Dashboard() {
  return <h1>Dashboard</h1>;
}

// app/dashboard/settings/page.tsx
export default function Settings() {
  return <h1>Settings</h1>;
}
```
*Access*: `/dashboard` and `/dashboard/settings`.

- **Example 2**: Multi-level nesting
```tsx
// app/dashboard/users/profile/page.tsx
export default function Profile() {
  return <h1>User Profile</h1>;
}
```
*Access*: `/dashboard/users/profile`.

---

### **3. Dynamic Routes**
Dynamic routes use brackets `[param]` to capture dynamic segments.

- **Explanation**: A folder like `[id]` captures a URL segment, accessible via `params` in the page.
- **Example 1**: Single dynamic route
```tsx
// app/blog/[id]/page.tsx
export default function BlogPost({ params }: { params: { id: string } }) {
  return <h1>Blog Post: {params.id}</h1>;
}
```
*Access*: `/blog/123` shows “Blog Post: 123”.

- **Example 2**: Dynamic user profile
```tsx
// app/users/[userId]/page.tsx
export default function UserProfile({ params }: { params: { userId: string } }) {
  return <h1>User ID: {params.userId}</h1>;
}
```
*Access*: `/users/abc` shows “User ID: abc”.

---

### **4. Nested Dynamic Routes**
Dynamic routes can be nested for complex URL structures.

- **Explanation**: Combine static and dynamic segments, e.g., `app/shop/[category]/[productId]`.
- **Example 1**: Nested dynamic route
```tsx
// app/shop/[category]/[productId]/page.tsx
export default function Product({
  params,
}: {
  params: { category: string; productId: string };
}) {
  return (
    <h1>
      Category: {params.category}, Product: {params.productId}
    </h1>
  );
}
```
*Access*: `/shop/electronics/456` shows “Category: electronics, Product: 456”.

- **Example 2**: Multi-level dynamic
```tsx
// app/courses/[courseId]/lessons/[lessonId]/page.tsx
export default function Lesson({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) {
  return (
    <h1>
      Course: {params.courseId}, Lesson: {params.lessonId}
    </h1>
  );
}
```
*Access*: `/courses/math/lesson1` shows “Course: math, Lesson: lesson1”.

---

### **5. Catch-All Segments**
Catch-all routes use `[...slug]` to capture all segments after a path.

- **Explanation**: Useful for flexible URLs like `/docs/a/b/c`.
- **Example 1**: Basic catch-all
```tsx
// app/docs/[...slug]/page.tsx
export default function Docs({ params }: { params: { slug: string[] } }) {
  return <h1>Docs Path: {params.slug.join("/")}</h1>;
}
```
*Access*: `/docs/a/b/c` shows “Docs Path: a/b/c”.

- **Example 2**: Optional catch-all
```tsx
// app/wiki/[...path]/page.tsx
export default function Wiki({ params }: { params: { path?: string[] } }) {
  return <h1>Wiki: {params.path ? params.path.join("/") : "Home"}</h1>;
}
```
*Access*: `/wiki` shows “Wiki: Home”, `/wiki/a/b` shows “Wiki: a/b”.

---

### **6. Not Found Page**
Custom 404 pages are created with `not-found.tsx`.

- **Explanation**: Define a `not-found.tsx` file to handle unmatched routes.
- **Example 1**: Global not-found
```tsx
// app/not-found.tsx
export default function NotFound() {
  return <h1>404 - Page Not Found</h1>;
}
```
*Access*: Any invalid route shows this page.

- **Example 2**: Route-specific not-found
```tsx
// app/dashboard/not-found.tsx
export default function DashboardNotFound() {
  return <h1>404 - Dashboard Resource Not Found</h1>;
}
```
*Access*: Invalid routes under `/dashboard` show this.

---

### **7. File Colocation**
Non-route files (components, utilities) can coexist with route files in `app`.

- **Explanation**: Files like `utils.ts` or `Component.tsx` don’t affect routing.
- **Example 1**: Colocated component
```tsx
// app/dashboard/MyChart.tsx
export default function MyChart() {
  return <div>Chart Component</div>;
}

// app/dashboard/page.tsx
import MyChart from "./MyChart";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <MyChart />
    </div>
  );
}
```

- **Example 2**: Utility function
```tsx
// app/lib/utils.ts
export function formatDate(date: Date) {
  return date.toLocaleDateString();
}

// app/blog/page.tsx
import { formatDate } from "../lib/utils";

export default function Blog() {
  return <p>Posted on: {formatDate(new Date())}</p>;
}
```

---

### **8. Private Folders**
Private folders start with `_` (e.g., `_utils`) and are excluded from routing.

- **Explanation**: Useful for organizing code without exposing routes.
- **Example 1**: Private utilities
```tsx
// app/_utils/helpers.ts
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// app/page.tsx
import { capitalize } from "./_utils/helpers";

export default function Home() {
  return <h1>{capitalize("hello")}</h1>;
}
```

- **Example 2**: Private components
```tsx
// app/_components/Button.tsx
export default function Button() {
  return <button>Click Me</button>;
}

// app/page.tsx
import Button from "./_components/Button";

export default function Home() {
  return <Button />;
}
```

---

### **9. Route Groups**
Route groups use `(group)` folders to organize routes without affecting URLs.

- **Explanation**: `(auth)` groups routes like `login` and `signup` without adding `/auth` to the URL.
- **Example 1**: Basic route group
```tsx
// app/(auth)/login/page.tsx
export default function Login() {
  return <h1>Login Page</h1>;
}

// app/(auth)/signup/page.tsx
export default function Signup() {
  return <h1>Signup Page</h1>;
}
```
*Access*: `/login`, `/signup`.

- **Example 2**: Multiple groups
```tsx
// app/(marketing)/about/page.tsx
export default function About() {
  return <h1>About</h1>;
}

// app/(dashboard)/profile/page.tsx
export default function Profile() {
  return <h1>Profile</h1>;
}
```
*Access*: `/about`, `/profile`.

---

### **10. Layouts**
Layouts wrap pages and nested routes with shared UI.

- **Explanation**: A `layout.tsx` file applies to all pages in its folder and subfolders.
- **Example 1**: Root layout
```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <nav>Navbar</nav>
        {children}
        <footer>Footer</footer>
      </body>
    </html>
  );
}
```

- **Example 2**: Nested layout
```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>Dashboard Header</h1>
      {children}
    </div>
  );
}

// app/dashboard/page.tsx
export default function Dashboard() {
  return <p>Dashboard Content</p>;
}
```
*Output*: Dashboard page wrapped with “Dashboard Header”.

---

### **11. Nested Layouts**
Layouts can be nested for hierarchical UI.

- **Explanation**: Each folder can have its own `layout.tsx`, composing with parent layouts.
- **Example 1**: Nested layout
```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <header>Site Header</header>
        {children}
      </body>
    </html>
  );
}

// app/shop/layout.tsx
export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h2>Shop Sidebar</h2>
      {children}
    </div>
  );
}

// app/shop/page.tsx
export default function Shop() {
  return <p>Shop Content</p>;
}
```
*Output*: Shop page with “Site Header” and “Shop Sidebar”.

- **Example 2**: Deep nesting
```tsx
// app/dashboard/users/layout.tsx
export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3>Users Menu</h3>
      {children}
    </div>
  );
}

// app/dashboard/users/profile/page.tsx
export default function Profile() {
  return <p>Profile Page</p>;
}
```

---

### **12. Multiple Root Layouts**
Route groups can have separate root layouts.

- **Explanation**: Use `(group)` folders to define distinct layouts for different sections.
- **Example 1**: Marketing vs. App layouts
```tsx
// app/(marketing)/layout.tsx
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <header>Marketing Header</header>
        {children}
      </body>
    </html>
  );
}

// app/(app)/layout.tsx
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <header>App Header</header>
        {children}
      </body>
    </html>
  );
}
```

---

### **13. Routing Metadata**
Metadata configures SEO and page settings.

- **Explanation**: Use `metadata` object or `generateMetadata` for dynamic metadata.
- **Example 1**: Static metadata
```tsx
// app/page.tsx
export const metadata = {
  title: "Home Page",
  description: "Welcome to our site",
};

export default function Home() {
  return <h1>Home</h1>;
}
```

- **Example 2**: Dynamic metadata
```tsx
// app/blog/[id]/page.tsx
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const post = await fetchPost(params.id); // Assume fetchPost exists
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogPost({ params }: { params: { id: string } }) {
  return <h1>Blog Post: {params.id}</h1>;
}
```

---

### **14. Title Metadata**
Set page titles dynamically or statically.

- **Explanation**: Use `title` in `metadata` or `generateMetadata`.
- **Example 1**: Static title
```tsx
// app/about/page.tsx
export const metadata = {
  title: "About Us",
};

export default function About() {
  return <h1>About</h1>;
}
```

- **Example 2**: Dynamic title
```tsx
// app/users/[id]/page.tsx
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}) {
  return { title: `User ${params.id}` };
}

export default function User({ params }: { params: { id: string } }) {
  return <h1>User: {params.id}</h1>;
}
```

---

### **15. Link Component**
Next.js `<Link>` enables client-side navigation.

- **Explanation**: Prevents full page reloads for faster navigation.
- **Example 1**: Basic Link
```tsx
// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/about">Go to About</Link>
    </div>
  );
}
```

- **Example 2**: Link with dynamic route
```tsx
// app/users/page.tsx
import Link from "next/link";

export default function Users() {
  const users = ["alice", "bob"];
  return (
    <ul>
      {users.map((user) => (
        <li key={user}>
          <Link href={`/users/${user}`}>{user}</Link>
        </li>
      ))}
    </ul>
  );
}
```

---

### **16. Active Links**
Highlight active links based on the current route.

- **Explanation**: Use `usePathname` to check the current route.
- **Example 1**: Active link with class
```tsx
// app/components/Nav.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav>
      <Link href="/" className={pathname === "/" ? "active" : ""}>
        Home
      </Link>
      <Link href="/about" className={pathname === "/about" ? "active" : ""}>
        About
      </Link>
    </nav>
  );
}
```

- **Example 2**: Reusable active link component
```tsx
// app/components/ActiveLink.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <Link href={href} className={pathname === href ? "active" : ""}>
      {children}
    </Link>
  );
}

// app/page.tsx
import ActiveLink from "./components/ActiveLink";

export default function Home() {
  return (
    <div>
      <ActiveLink href="/about">About</ActiveLink>
    </div>
  );
}
```

---

### **17. Params and Search Params**
Access URL parameters and query strings.

- **Explanation**: `params` for dynamic routes, `searchParams` for query strings.
- **Example 1**: Dynamic params
```tsx
// app/products/[id]/page.tsx
export default function Product({
  params,
}: {
  params: { id: string };
}) {
  return <h1>Product ID: {params.id}</h1>;
}
```

- **Example 2**: Search params
```tsx
// app/search/page.tsx
export default function Search({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  return <h1>Search Query: {searchParams.query || "None"}</h1>;
}
```
*Access*: `/search?query=nextjs` shows “Search Query: nextjs”.

---

### **18. Navigating Programmatically**
Navigate without `<Link>` using `useRouter`.

- **Explanation**: Use `useRouter` for dynamic navigation in client components.
- **Example 1**: Basic navigation
```tsx
// app/components/RedirectButton.tsx
"use client";
import { useRouter } from "next/navigation";

export default function RedirectButton() {
  const router = useRouter();
  return (
    <button onClick={() => router.push("/about")}>Go to About</button>
  );
}
```

- **Example 2**: Dynamic navigation
```tsx
// app/components/UserButton.tsx
"use client";
import { useRouter } from "next/navigation";

export default function UserButton({ userId }: { userId: string }) {
  const router = useRouter();
  return (
    <button onClick={() => router.push(`/users/${userId}`)}>
      View User
    </button>
  );
}
```

---

### **19. Templates**
Templates are similar to layouts but re-render on navigation.

- **Explanation**: Use `template.tsx` for fresh instances per navigation.
- **Example 1**: Basic template
```tsx
// app/template.tsx
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <p>Template Rendered at {new Date().toISOString()}</p>
      {children}
    </div>
  );
}
```

- **Example 2**: Nested template
```tsx
// app/dashboard/template.tsx
export default function DashboardTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <p>Dashboard Template: {Math.random()}</p>
      {children}
    </div>
  );
}
```

---

### **20. Loading UI**
Show loading states with `loading.tsx`.

- **Explanation**: Automatically displayed during data fetching or navigation.
- **Example 1**: Global loading
```tsx
// app/loading.tsx
export default function Loading() {
  return <p>Loading...</p>;
}
```

- **Example 2**: Route-specific loading
```tsx
// app/dashboard/loading.tsx
export default function DashboardLoading() {
  return <div>Dashboard Loading...</div>;
}
```

---

### **21. Error Handling**
Handle errors with `error.tsx`.

- **Explanation**: Catches errors in a route segment.
- **Example 1**: Basic error
```tsx
// app/error.tsx
"use client";
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h1>Error: {error.message}</h1>
      <button onClick={reset}>Try Again</button>
    </div>
  );
}
```

- **Example 2**: Route-specific error
```tsx
// app/dashboard/error.tsx
"use client";
export default function DashboardError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h1>Dashboard Error: {error.message}</h1>
      <button onClick={reset}>Retry</button>
    </div>
  );
}
```

---

### **22. Recovering from Errors**
Use `reset` to retry rendering after an error.

- **Explanation**: Provided in `error.tsx` to re-render the component.
- **Example**: See `error.tsx` examples above (reset button).

---

### **23. Handling Errors in Nested Routes**
Nested `error.tsx` files catch errors in specific segments.

- **Explanation**: Each folder can have its own error boundary.
- **Example 1**: Nested error
```tsx
// app/shop/[id]/error.tsx
"use client";
export default function ShopError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h1>Shop Error: {error.message}</h1>
      <button onClick={reset}>Retry</button>
    </div>
  );
}
```

---

### **24. Handling Errors in Layouts**
Errors in layouts are caught by the nearest `error.tsx`.

- **Explanation**: Layout errors bubble up to the closest error boundary.
- **Example**: Use `error.tsx` in the same or parent folder as the layout.

---

### **25. Handling Global Errors**
Global errors are caught by `app/global-error.tsx`.

- **Explanation**: Handles errors in the root layout or app.
- **Example**:
```tsx
// app/global-error.tsx
"use client";
export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h1>Global Error: {error.message}</h1>
        <button onClick={reset}>Retry</button>
      </body>
    </html>
  );
}
```

---

### **26. Parallel Routes**
Parallel routes render multiple pages simultaneously.

- **Explanation**: Use `@slot` folders to define parallel routes.
- **Example 1**: Basic parallel route
```tsx
// app/layout.tsx
export default function RootLayout({
  children,
  @dashboard,
}: {
  children: React.ReactNode;
  dashboard: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <div>{children}</div>
        <div>{dashboard}</div>
      </body>
    </html>
  );
}

// app/@dashboard/page.tsx
export default function Dashboard() {
  return <h1>Dashboard Slot</h1>;
}
```

---

### **27. Unmatched Routes**
Handle unmatched parallel routes with `default.tsx`.

- **Explanation**: Renders when no route matches in a slot.
- **Example**:
```tsx
// app/@dashboard/default.tsx
export default function DefaultDashboard() {
  return <p>No dashboard content</p>;
}
```

---

### **28. Conditional Routes**
Conditionally render routes based on logic.

- **Explanation**: Use server-side logic in layouts or pages.
- **Example**:
```tsx
// app/page.tsx
export default function Home({ searchParams }: { searchParams: { mode?: string } }) {
  if (searchParams.mode === "admin") {
    return <h1>Admin Dashboard</h1>;
  }
  return <h1>Public Home</h1>;
}
```

---

### **29. Intercepting Routes**
Intercept routes to override default rendering.

- **Explanation**: Use `(.)` or `(..)` to intercept routes.
- **Example**:
```tsx
// app/(.)login/page.tsx
export default function InterceptedLogin() {
  return <h1>Intercepted Login Page</h1>;
}
```

---

### **30. Parallel Intercepting Routes**
Combine parallel routes with interception.

- **Explanation**: Intercept a slot in a parallel route setup.
- **Example**: Extend parallel route example with `(.)` interception.

---

### **31. Route Handlers**
Handle HTTP requests with `route.ts`.

- **Explanation**: Define API-like endpoints in `app`.
- **Example 1**: GET handler
```tsx
// app/api/hello/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello, World!" });
}
```
*Access*: `/api/hello`.

- **Example 2**: POST handler
```tsx
// app/api/users/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ name: body.name });
}
```

---

### **32. Dynamic Route Handlers**
Handle dynamic routes in `route.ts`.

- **Example**:
```tsx
// app/api/users/[id]/route.ts
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ userId: params.id });
}
```

---

### **33. Handling PATCH, DELETE Requests**
Extend route handlers for other HTTP methods.

- **Example**:
```tsx
// app/api/users/[id]/route.ts
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  return NextResponse.json({ id: params.id, updated: body });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ message: `Deleted user ${params.id}` });
}
```

---

### **34. URL Query Parameters, Headers, Cookies, Redirects, Caching**
Handle advanced request features in route handlers.

- **Example**: Combined features
```tsx
// app/api/data/route.ts
import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const authHeader = headers().get("authorization");
  const session = cookies().get("session")?.value;

  if (!session) {
    return NextResponse.redirect("/login");
  }

  return NextResponse.json(
    { query, authHeader, session },
    { headers: { "Cache-Control": "s-maxage=3600" } }
  );
}
```

---

### **35. Middleware**
Run code before requests are processed.

- **Example**:
```tsx
// middleware.ts
import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const { pathname } = new URL(request.url);
  if (pathname.startsWith("/admin") && !request.headers.get("authorization")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

---

### **36. Rendering (Client-Side, Server-Side, Suspense SSR, React Server Components)**
Next.js supports multiple rendering strategies.

- **Client-Side Rendering (CSR)**:
```tsx
// app/client-page.tsx
"use client";
import { useState, useEffect } from "react";

export default function ClientPage() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then(setData);
  }, []);
  return <div>{data ? JSON.stringify(data) : "Loading..."}</div>;
}
```

- **Server-Side Rendering (SSR)**:
```tsx
// app/ssr-page.tsx
export default async function SSRPage() {
  const data = await fetch("https://api.example.com/data").then((res) =>
    res.json()
  );
  return <div>{JSON.stringify(data)}</div>;
}
```

- **React Server Components (RSC)**:
```tsx
// app/rsc-page.tsx
async function fetchData() {
  return await fetch("https://api.example.com/data").then((res) => res.json());
}

export default async function RSCPage() {
  const data = await fetchData();
  return <div>{JSON.stringify(data)}</div>;
}
```

---

### **37. Static and Dynamic Rendering**
Control rendering at build time or request time.

- **Static**:
```tsx
// app/static-page.tsx
export default function StaticPage() {
  return <h1>Statically Rendered</h1>;
}
```

- **Dynamic**:
```tsx
// app/dynamic-page.tsx
export const dynamic = "force-dynamic";

export default async function DynamicPage() {
  const data = await fetch("https://api.example.com/data").then((res) =>
    res.json()
  );
  return <div>{JSON.stringify(data)}</div>;
}
```

---

### **38. generateStaticParams**
Pre-render dynamic routes at build time.

- **Example**:
```tsx
// app/blog/[id]/page.tsx
export async function generateStaticParams() {
  const posts = await fetchPosts(); // Assume fetchPosts exists
  return posts.map((post) => ({ id: post.id }));
}

export default function BlogPost({ params }: { params: { id: string } }) {
  return <h1>Post: {params.id}</h1>;
}
```

---

### **39. Streaming**
Stream content to the client incrementally.

- **Example**:
```tsx
// app/streaming-page.tsx
import { Suspense } from "react";

async function SlowComponent() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return <p>Loaded!</p>;
}

export default function StreamingPage() {
  return (
    <div>
      <p>Instant Content</p>
      <Suspense fallback={<p>Loading...</p>}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}
```

---

### **40. Server and Client Composition Patterns**
Combine server and client components effectively.

- **Example**:
```tsx
// app/page.tsx
import ClientComponent from "./ClientComponent";

async function fetchData() {
  return { message: "Hello from Server" };
}

export default async function Page() {
  const data = await fetchData();
  return (
    <div>
      <p>{data.message}</p>
      <ClientComponent />
    </div>
  );
}

// app/ClientComponent.tsx
"use client";
import { useState } from "react";

export default function ClientComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

---

### **41. Server-Only and Client-Only Code**
Segregate code for server or client execution.

- **Server-Only**:
```tsx
// app/lib/server-only.ts
import "server-only";

export async function getServerData() {
  return { secret: "Server Secret" };
}
```

- **Client-Only**:
```tsx
// app/components/client-only.tsx
import "client-only";

export default function ClientOnly() {
  return <p>Client-side only</p>;
}
```

---

### **42. Context Provider**
Share state across components.

- **Example**:
```tsx
// app/context/ThemeContext.tsx
"use client";
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

// app/page.tsx
import { ThemeProvider, useTheme } from "./context/ThemeContext";

export default function Page() {
  return (
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );
}

// app/ThemeToggle.tsx
"use client";
import { useTheme } from "./context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <p>Current Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

---

### **43. Data Fetching**
Fetch data in client and server components.

- **Client Component**:
```tsx
// app/client-fetch.tsx
"use client";
import { useState, useEffect } from "react";

export default function ClientFetch() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then(setData);
  }, []);
  return <div>{data ? JSON.stringify(data) : "Loading..."}</div>;
}
```

- **Server Component**:
```tsx
// app/server-fetch.tsx
async function fetchData() {
  const res = await fetch("https://api.example.com/data");
  return res.json();
}

export default async function ServerFetch() {
  const data = await fetchData();
  return <div>{JSON.stringify(data)}</div>;
}
```

---

### **44. Fetching from a Database**
Use ORMs like Prisma for database queries.

- **Example**:
```tsx
// app/lib/db.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUsers() {
  return prisma.user.findMany();
}

// app/users/page.tsx
import { getUsers } from "../lib/db";

export default async function Users() {
  const users = await getUsers();
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

### **45. Data Mutations**
Mutate data with server actions.

- **Example**:
```tsx
// app/actions.ts
"use server";
import { prisma } from "./lib/db";

export async function createUser(data: { name: string }) {
  return prisma.user.create({ data });
}

// app/users/new/page.tsx
import { createUser } from "../../actions";

export default function NewUser() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    await createUser({ name });
  }

  return (
    <form action={handleSubmit}>
      <input type="text" name="name" />
      <button type="submit">Create User</button>
    </form>
  );
}
```

---

### **46. Forms with Server Actions**
Handle form submissions server-side.

- **Example**:
```tsx
// app/form/page.tsx
"use server";
import { redirect } from "next/navigation";

export default function FormPage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    // Save to DB
    redirect("/success");
  }

  return (
    <form action={handleSubmit}>
      <input type="text" name="name" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

### **47. Form Validation with useActionState**
Validate forms with server feedback.

- **Example**:
```tsx
// app/form/page.tsx
"use client";
import { useActionState } from "react";

async function submitForm(_: any, formData: FormData) {
  const name = formData.get("name") as string;
  if (!name) return { error: "Name is required" };
  return { success: true };
}

export default function FormPage() {
  const [state, action] = useActionState(submitForm, null);
  return (
    <form action={action}>
      <input type="text" name="name" />
      {state?.error && <p>{state.error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

### **48. Authentication with Various Data Providers**
Implement auth with NextAuth.js and databases (e.g., PostgreSQL, MongoDB).

- **Example (NextAuth with Prisma)**:
```tsx
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../../../lib/db";

export const { handlers, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    {
      id: "google",
      name: "Google",
      type: "oauth",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: "https://accounts.google.com/o/oauth2/auth",
    },
  ],
});
```

- **Example (MongoDB with Credentials)**:
```tsx
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";

export const { handlers, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = new MongoClient(process.env.MONGODB_URI!);
        const db = client.db("mydb");
        const user = await db
          .collection("users")
          .findOne({ username: credentials.username });
        if (user && credentials.password === user.password) {
          return { id: user._id, name: user.username };
        }
        return null;
      },
    }),
  ],
});
```

