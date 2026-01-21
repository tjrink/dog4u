import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'AB Quiz', to: '/quiz' },
  { name: 'Slider Quiz', to: '/slider' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="relative w-full bg-neutral-900 shadow-inner">
      <nav>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button */}
              <button
                type="button"
                aria-controls="mobile-menu"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((open) => !open)}
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                {/* Hamburger icon */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                  className={`size-6 ${mobileOpen ? 'hidden' : ''}`}
                >
                  <path
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {/* Close icon */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                  className={`size-6 ${mobileOpen ? '' : 'hidden'}`}
                >
                  <path
                    d="M6 18 18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              {/* Logo removed for a cleaner look */}
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      aria-current={
                        location.pathname === link.to ? 'page' : undefined
                      }
                      className={`rounded-lg px-4 py-2 text-sm font-bold transition-colors ${
                        location.pathname === link.to
                          ? 'bg-white/10 text-white shadow-inner'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {/* Removed avatar and notification bell for simplicity */}
          </div>
        </div>
        {/* Mobile menu */}
        {mobileOpen && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  aria-current={
                    location.pathname === link.to ? 'page' : undefined
                  }
                  className={`block rounded-lg px-4 py-2 text-base font-bold transition-colors ${
                    location.pathname === link.to
                      ? 'bg-white/10 text-white shadow-inner'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
