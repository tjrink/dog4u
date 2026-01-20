import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-16 px-4 bg-neutral-900">
      <div className="w-full max-w-xl bg-white/5 border border-white/10 rounded-xl p-8 shadow-inner flex flex-col items-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          404: Page Not Found
        </h2>
        <p className="text-lg text-white/80 mb-6 text-center">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="w-full py-4 bg-amber-400 hover:bg-amber-500 text-neutral-950 font-bold rounded-lg transition-transform active:scale-95 shadow-lg shadow-amber-400/10 text-center"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
