import Link from 'next/link';

export default function LocaleNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-[#94A3B8] mb-8">Page not found</p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-lg bg-[#4F46E5] text-white hover:bg-[#4338CA] transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
