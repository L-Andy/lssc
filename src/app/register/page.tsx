'use client'
import Link from 'next/link';
import React, { useState } from 'react';

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agree, setAgree] = useState(false);

    // For demonstration, no actual form handling is implemented
    return (
        <div className="min-h-screen flex flex-row justify-center pt-24 relative bg-[url('/assets/login-bg.png')] bg-cover bg-top bg-no-repeat overflow-auto">
            <form className="relative z-10 flex flex-col items-center w-full max-w-xs">
                <h2 className="text-white text-xl font-semibold mb-2">User Registeration</h2>
                <div className="text-gray-200 text-xs mb-6 flex my-8 items-center gap-1 cursor-pointer select-none">
                    English
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <div className="flex items-center w-full mb-4 border-b border-gray-300">
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
                {/* Password */}
                <div className="flex items-center w-full mb-4 relative border-b border-gray-300">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Input password"
                        className="w-full bg-transparent text-white placeholder-gray-300 px-2 py-2 focus:outline-none pr-8"
                        required
                    />
                    <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300"
                        onClick={() => setShowPassword((v) => !v)}
                        tabIndex={-1}
                    >
                        {showPassword ? (
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" /></svg>
                        ) : (
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.77 21.77 0 0 1 5.06-6.06M9.9 4.24A10.94 10.94 0 0 1 12 5c7 0 11 7 11 7a21.77 21.77 0 0 1-4.43 5.19M1 1l22 22" stroke="currentColor" strokeWidth="2" /></svg>
                        )}
                    </button>
                </div>
                {/* Confirm Password */}
                <div className="flex items-center w-full mb-4 relative border-b border-gray-300">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Please enter the password again"
                        className="w-full bg-transparent text-white placeholder-gray-300 px-2 py-2 focus:outline-none pr-8"
                        required
                    />
                    <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300"
                        onClick={() => setShowConfirmPassword((v) => !v)}
                        tabIndex={-1}
                    >
                        {showConfirmPassword ? (
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" /></svg>
                        ) : (
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.77 21.77 0 0 1 5.06-6.06M9.9 4.24A10.94 10.94 0 0 1 12 5c7 0 11 7 11 7a21.77 21.77 0 0 1-4.43 5.19M1 1l22 22" stroke="currentColor" strokeWidth="2" /></svg>
                        )}
                    </button>
                </div>
                {/* Verification code */}
                <div className="flex items-center w-full mb-4 border-b border-gray-300">
                    <input
                        type="text"
                        placeholder="Please enter the verification code"
                        className="flex-1 bg-transparent text-white placeholder-gray-300 px-2 py-2 focus:outline-none"
                        required
                    />
                    <button
                        type="button"
                        className="ml-2 bg-white/20 text-white px-2 py-1 rounded text-xs border border-white/30 hover:bg-white/30 transition"
                    >
                        8341
                    </button>
                </div>
                {/* Agreement */}
                <div className="flex items-center w-full mb-6">
                    <input
                        id="agree"
                        type="checkbox"
                        checked={agree}
                        onChange={() => setAgree((v) => !v)}
                        className="accent-purple-500 mr-2"
                        required
                    />
                    <label htmlFor="agree" className="text-white text-xs cursor-pointer select-none">
                        I have read and agree to the User Registration Agreement
                    </label>
                </div>
                {/* Register button */}
                <button type="submit" className="w-fit px-8 bg-white text-black font-extralight py-2 rounded hover:bg-gray-200 transition mb-2">
                    Register Now
                </button>
                <div className="flex justify-center w-full mb-4">
                    <Link href="/" className="text-purple-400 text-sm hover:underline">Log in</Link>
                </div>
                <div className="text-gray-200 text-xs mt-2">version number: 1.1.25</div>
            </form>
            {/* System settings button (bottom left) */}
            <button className="fixed left-4 bottom-4 z-20 bg-black/40 text-white text-xs px-3 py-1 rounded hover:bg-black/60 transition">Réglages Système</button>
        </div>
    );
}