'use client'
import React, { useState } from 'react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  return (
    <div className="min-h-screen flex flex-row justify-center pt-24 relative bg-[url('/assets/login-bg.png')] bg-cover bg-top bg-no-repeat overflow-auto">
      <form className="relative z-10 flex flex-col items-center w-full max-w-xs">
        <h2 className="text-white text-xl font-semibold mb-2">User Login</h2>
        <div className="text-gray-200 text-xs mb-6 flex my-8 items-center gap-1 cursor-pointer select-none">
          English
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div className="flex items-center w-full mb-6 border-b border-gray-300v">
          <select className="bg-transparent text-white border-none outline-none pr-2 text-sm" defaultValue="+1">
            <option value="+1">+1</option>
            <option value="+33">+33</option>
            <option value="+44">+44</option>
            {/* Add more country codes as needed */}
          </select>
          <input
            type="tel"
            placeholder="Phone number"
            className="flex-1 bg-transparent text-white placeholder-gray-300 px-2 py-2 focus:outline-none"
            required
          />
        </div>
        <div className="flex items-center w-full mb-2 relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Input password"
            className="w-full bg-transparent border-b border-gray-300 text-white placeholder-gray-300 px-2 py-2 focus:outline-none pr-8"
            required
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
          >
            {showPassword ? (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/></svg>
            ) : (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.77 21.77 0 0 1 5.06-6.06M9.9 4.24A10.94 10.94 0 0 1 12 5c7 0 11 7 11 7a21.77 21.77 0 0 1-4.43 5.19M1 1l22 22" stroke="currentColor" strokeWidth="2"/></svg>
            )}
          </button>
        </div>
        <div className="flex items-center w-full mb-6">
          <input
            id="remember"
            type="checkbox"
            checked={remember}
            onChange={() => setRemember((v) => !v)}
            className="accent-purple-500 mr-2"
          />
          <label htmlFor="remember" className="text-white text-sm cursor-pointer select-none">Remember Password</label>
        </div>
        <div className="flex justify-between w-full mb-4">
          <a href="/ms" className="text-purple-400 text-sm hover:underline">Log in</a>
          <a href="/register" className="text-purple-400 text-sm hover:underline">Register Now</a>
        </div>
        <div className="text-gray-200 text-xs mt-2">version number: 1.1.25</div>
      </form>
      {/* System settings button (bottom left) */}
      <button className="fixed left-4 bottom-4 z-20 bg-black/40 text-white text-xs px-3 py-1 rounded hover:bg-black/60 transition">Réglages Système</button>
    </div>
  );
}