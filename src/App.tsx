import { Suspense, lazy } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { Header, NotFound, RouteScroll } from "./components/Header";
import { Footer } from "./components/Footer";
import { FloatingAssistant } from "./components/FloatingAssistant";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Home } from "./pages/Home";

const Courses = lazy(() =>
  import("./pages/Courses").then((module) => ({ default: module.Courses })),
);
const CourseDetails = lazy(() =>
  import("./pages/Courses").then((module) => ({
    default: module.CourseDetails,
  })),
);
const Skills = lazy(() =>
  import("./pages/Skills").then((module) => ({ default: module.Skills })),
);
const Services = lazy(() =>
  import("./pages/Services").then((module) => ({ default: module.Services })),
);
const Products = lazy(() =>
  import("./pages/Products").then((module) => ({ default: module.Products })),
);
const Gallery = lazy(() =>
  import("./pages/Gallery").then((module) => ({ default: module.Gallery })),
);
const About = lazy(() =>
  import("./pages/About").then((module) => ({ default: module.About })),
);
const Contact = lazy(() =>
  import("./pages/Contact").then((module) => ({ default: module.Contact })),
);
const Blog = lazy(() =>
  import("./pages/Blog").then((module) => ({ default: module.Blog })),
);
const BlogArticle = lazy(() =>
  import("./pages/Blog").then((module) => ({ default: module.BlogArticle })),
);
const Notices = lazy(() =>
  import("./pages/Notices").then((module) => ({ default: module.Notices })),
);
const Checkout = lazy(() =>
  import("./pages/Checkout").then((module) => ({ default: module.Checkout })),
);
const AdminLogin = lazy(() =>
  import("./pages/AdminLogin").then((module) => ({
    default: module.AdminLogin,
  })),
);
const AdminDashboard = lazy(() =>
  import("./pages/AdminDashboard").then((module) => ({
    default: module.AdminDashboard,
  })),
);

function Loading() {
  return (
    <div
      className="container-site flex min-h-[60vh] items-center justify-center"
      role="status"
    >
      <div className="text-center">
        <span className="mx-auto mb-4 block h-7 w-7 animate-spin rounded-full border-2 border-line border-t-cyan-400" />
        <p className="text-xs text-muted">Connecting you to your next skill…</p>
      </div>
    </div>
  );
}
function Shell() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <RouteScroll />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:slug" element={<CourseDetails />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      {!isAdmin && <FloatingAssistant />}
      {!isAdmin && (
        <div className="border-t border-line bg-surface/50 py-3">
          <div className="container-site flex flex-wrap items-center justify-between gap-3 text-[9px] text-muted">
            <span>
              Browser-local content & enrollment system. No connected payment
              gateway.
            </span>
            <Link to="/contact" className="hover:text-cyan-400">
              Questions? Let’s talk.
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
export function App() {
  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <Shell />
      </MotionConfig>
    </ErrorBoundary>
  );
}
