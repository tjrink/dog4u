import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col font-sans w-full">
      <main className="flex flex-col md:flex-row items-center justify-center flex-1 px-6 py-16 gap-16 w-full">
        <div className="flex flex-col items-center max-w-xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-6 leading-tight">
            Your Perfect Dog
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 mb-8">
            Discover your best dog breed with our interactive quiz. More quiz
            types and features coming soon!
          </p>
          <div className="flex gap-6">
            <Link
              to="/slider"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg text-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 transform hover:scale-105 active:scale-95 hover:shadow-xl"
            >
              Find My Breed
            </Link>
            <button
              disabled
              className="bg-gray-200 text-gray-500 px-8 py-4 rounded-xl shadow-lg text-lg font-semibold cursor-not-allowed opacity-60 border border-gray-300 transform hover:scale-105 active:scale-95 hover:shadow-xl transition-all duration-200"
            >
              AB Quiz (Coming Soon)
            </button>
          </div>
        </div>
        {/* Image removed for cleaner layout */}
      </main>
      <footer className="text-center text-slate-500 text-sm py-6 border-t border-slate-200 bg-white/60">
        &copy; {new Date().getFullYear()} Dog4U. All rights reserved.
      </footer>
    </div>
  );
}
