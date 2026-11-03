import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Search } from 'lucide-react';
import { useSeo } from '@/lib/seo';

export default function NotFound() {
  useSeo({ title: 'Page Not Found', description: 'The page you are looking for does not exist.', path: '/404' });
  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4 py-20">
      <div className="hero-grid absolute inset-0" />
      <div className="orb left-1/4 top-0 h-72 w-72 bg-electric/25" />
      <div className="orb bottom-0 right-1/4 h-72 w-72 bg-glow/20" />
      <div className="relative text-center">
        <div className="gradient-text text-8xl font-black sm:text-9xl">404</div>
        <h1 className="mt-4 text-2xl font-extrabold text-ink">Page Not Found</h1>
        <p className="font-bangla mx-auto mt-3 max-w-md text-sm text-muted">
          দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি। ঠিকানাটি ভুল হতে পারে অথবা পেজটি সরানো হয়েছে।
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary"><Home size={16} /> Back to Home</Link>
          <Link to="/courses" className="btn-outline"><Search size={16} /> Browse Courses</Link>
        </div>
        <button type="button" onClick={() => window.history.back()} className="btn-ghost mt-4 text-xs">
          <ArrowLeft size={14} /> Go back
        </button>
      </div>
    </div>
  );
}
