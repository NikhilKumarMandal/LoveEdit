import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-violet-500 rounded-lg flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="2" width="6" height="6" rx="1.5" fill="white" opacity="0.9" />
              <rect x="10" y="2" width="6" height="6" rx="1.5" fill="white" opacity="0.6" />
              <rect x="2" y="10" width="6" height="6" rx="1.5" fill="white" opacity="0.6" />
              <rect x="10" y="10" width="6" height="6" rx="1.5" fill="white" opacity="0.9" />
            </svg>
          </div>
          <span className="text-lg font-medium">LoveEdit</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
              Pricing
            </a>
            <a href="#docs" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
              Docs
            </a>
          </div>
          <Link
            href="/login"
            className="text-sm px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/sign-up"
            className="text-sm px-4 py-2 rounded-lg bg-violet-500 text-white hover:bg-violet-600 transition-colors"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center px-6 pt-20 pb-16 max-w-3xl mx-auto">
        <div className="inline-block bg-violet-50 text-violet-700 text-xs font-medium px-4 py-1.5 rounded-full mb-6">
          AI-powered image editing
        </div>
        <h1 className="text-4xl md:text-5xl font-medium leading-tight mb-5">
          Edit images with the <br />
          <span className="text-violet-500">power of AI</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed max-w-xl mx-auto mb-8">
          LoveEdit lets you remove backgrounds, apply filters, draw, and transform
          your images — all in your browser, powered by AI.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/sign-up"
            className="px-7 py-3 rounded-lg bg-violet-500 text-white text-sm font-medium hover:bg-violet-600 transition-colors"
          >
            Start editing for free
          </Link>
          <a
            href="#features"
            className="px-7 py-3 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            See how it works
          </a>
        </div>
      </section>

      {/* Editor Preview */}
      <div className="max-w-4xl mx-auto px-6 mb-20">
        <div className="border border-gray-100 rounded-xl overflow-hidden bg-gray-50">
          {/* Fake window bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-white">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            <span className="ml-3 text-xs text-gray-400">LoveEdit — editor</span>
          </div>
          {/* Toolbar */}
          <div className="flex flex-wrap gap-2 px-4 py-3 border-b border-gray-100 bg-white">
            {["Crop", "Draw", "Filter", "Remove BG", "Text", "AI Enhance"].map((tool, i) => (
              <button
                key={tool}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${i === 0
                    ? "bg-violet-50 text-violet-700 border-violet-200"
                    : "bg-white text-gray-500 border-gray-100 hover:bg-gray-50"
                  }`}
              >
                {tool}
              </button>
            ))}
          </div>
          {/* Canvas */}
          <div className="h-48 flex items-center justify-center bg-white">
            <div className="text-center">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                className="mx-auto"
              >
                <rect x="4" y="4" width="40" height="40" rx="6" fill="#EEEDFE" />
                <path
                  d="M16 32L22 24L27 29L31 24L36 32H16Z"
                  fill="#AFA9EC"
                />
                <circle cx="20" cy="19" r="3" fill="#7F77DD" />
              </svg>
              <p className="text-xs text-gray-400 mt-2">
                Drop an image or click to upload
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <section id="features" className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-center text-3xl font-medium mb-2">
          Everything you need to edit
        </h2>
        <p className="text-center text-gray-500 text-sm mb-12">
          Powerful tools built for creators, designers, and anyone who works with images.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 10C3 6.13 6.13 3 10 3s7 3.13 7 7-3.13 7-7 7-7-3.13-7-7z" stroke="#7F77DD" strokeWidth="1.5" />
                  <path d="M10 7v3l2 2" stroke="#7F77DD" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ),
              bg: "bg-violet-50",
              title: "AI background removal",
              desc: "Instantly remove or replace backgrounds with one click using AI.",
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 16l3-3 2 2 4-5 4 6H4z" stroke="#1D9E75" strokeWidth="1.5" strokeLinejoin="round" />
                  <circle cx="7" cy="7" r="2" stroke="#1D9E75" strokeWidth="1.5" />
                </svg>
              ),
              bg: "bg-emerald-50",
              title: "Smart filters",
              desc: "Apply stunning filters and adjustments with real-time preview.",
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 14l4-4 2 2 2-2 4 4" stroke="#D85A30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 6h10M5 10h6" stroke="#D85A30" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ),
              bg: "bg-orange-50",
              title: "Drawing tools",
              desc: "Annotate, sketch, and draw directly on your images with ease.",
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="3" y="5" width="14" height="10" rx="2" stroke="#378ADD" strokeWidth="1.5" />
                  <path d="M8 5V4M12 5V4" stroke="#378ADD" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ),
              bg: "bg-blue-50",
              title: "Works in browser",
              desc: "No downloads needed. Edit right from your browser on any device.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="bg-white border border-gray-100 rounded-xl p-5"
            >
              <div className={`w-10 h-10 ${f.bg} rounded-lg flex items-center justify-center mb-4`}>
                {f.icon}
              </div>
              <h3 className="text-sm font-medium mb-1.5">{f.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center px-6 py-20 bg-gray-50 border-t border-gray-100">
        <h2 className="text-3xl font-medium mb-3">Start creating today</h2>
        <p className="text-gray-500 text-sm mb-8">
          Join thousands of creators editing smarter with LoveEdit.
        </p>
        <Link
          href="/sign-up"
          className="inline-block px-8 py-3 rounded-lg bg-violet-500 text-white text-sm font-medium hover:bg-violet-600 transition-colors"
        >
          Get started for free
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-gray-100 text-xs text-gray-400">
        © 2026 LoveEdit. Built with Next.js & AI.
      </footer>
    </div>
  );
}