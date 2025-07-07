'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '@/utils/appwrite';
import { countries } from '@/utils/data/countries';

function generateVerificationCode(length = 4) {
  return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)).toString();
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [codeSent, setCodeSent] = useState(false);
  const [codeButtonDisabled, setCodeButtonDisabled] = useState(false);
  const [codeButtonTimer, setCodeButtonTimer] = useState(0);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (codeButtonTimer > 0) {
      timer = setTimeout(() => setCodeButtonTimer(codeButtonTimer - 1), 1000);
    } else if (codeButtonTimer === 0 && codeButtonDisabled) {
      setCodeButtonDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [codeButtonTimer, codeButtonDisabled]);

  const formik = useFormik({
    initialValues: {
      countryCode: '+1',
      phone: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      verificationCode: '',
      agree: false,
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .required('Phone number is required')
        .matches(/^\d+$/, 'Phone number must be digits only'),
      email: Yup.string()
        .required('Email is required')
        .email('Invalid email address'),
      username: Yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
      confirmPassword: Yup.string()
        .required('Please confirm your password')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
      verificationCode: Yup.string()
        .required('Verification code is required')
        .test('match', 'Verification code is incorrect', function (value) {
          if (!codeSent) return true; // Don't validate if code not sent yet
          return value === generatedCode;
        }),
      agree: Yup.boolean().oneOf([true], 'You must agree to the User Registration Agreement'),
    }),
    onSubmit: async (values) => {
      setError(null);
      setSuccess(null);
      setLoading(true);
      try {
        if (!codeSent) {
          setError('Please request and enter the verification code.');
          setLoading(false);
          return;
        }
        if (values.verificationCode !== generatedCode) {
          setError('Verification code is incorrect.');
          setLoading(false);
          return;
        }
        const phoneWithCode = `${values.countryCode}${values.phone}`;
        await registerUser(phoneWithCode, values.password, values.username, values.email);
        setSuccess('Registration successful! You can now log in.');
        // Optionally redirect to login page:
        // window.location.href = '/';
      } catch (err: any) {
        setError(err?.message || 'Registration failed');
      } finally {
        setLoading(false);
      }
    },
  });

  const handleSendCode = () => {
    if (!formik.values.phone || formik.errors.phone) {
      setError('Please enter a valid phone number before requesting the code.');
      return;
    }
    const code = generateVerificationCode(4);
    setGeneratedCode(code);
    setCodeSent(true);
    setCodeButtonDisabled(true);
    setCodeButtonTimer(60); // 60 seconds cooldown
    setError(null);
    // In a real app, send the code via SMS or email here.
    // For demo, just show an alert (remove in production):
    alert(`Your verification code is: ${code}`);
  };

  return (
    <div className="min-h-screen flex flex-row justify-center pt-24 relative bg-[url('/assets/login-bg.png')] bg-cover bg-top bg-no-repeat overflow-auto">
      <form className="relative z-10 flex flex-col items-center w-full max-w-xs" onSubmit={formik.handleSubmit} autoComplete="off">
        <h2 className="text-white text-xl font-semibold mb-2">User Registration</h2>
        <div className="text-gray-200 text-xs mb-6 flex my-8 items-center gap-1 cursor-pointer select-none">
          English
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <div className="flex items-center w-full mb-4 border-b border-gray-300">
          <select
            className="bg-transparent text-black border-none outline-none pr-2 text-sm"
            id="countryCode"
            name="countryCode"
            value={formik.values.countryCode}
            onChange={formik.handleChange}
          >
            {countries.map((country) => (
              <option key={country.code + country.name} value={country.code}>
                {country.name} ({country.code})
              </option>
            ))}
          </select>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Phone number"
            className="flex-1 bg-transparent text-white placeholder-gray-300 px-2 py-2 focus:outline-none"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
        </div>
        {formik.touched.phone && formik.errors.phone && (
          <div className="text-red-400 text-xs mb-2 w-full text-left">{formik.errors.phone}</div>
        )}
        <div className="flex items-center w-full mb-4 border-b border-gray-300">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
            className="w-full bg-transparent text-white placeholder-gray-300 px-2 py-2 focus:outline-none"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-400 text-xs mb-2 w-full text-left">{formik.errors.email}</div>
        )}
        <div className="flex items-center w-full mb-4 border-b border-gray-300">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            className="w-full bg-transparent text-white placeholder-gray-300 px-2 py-2 focus:outline-none"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
        </div>
        {formik.touched.username && formik.errors.username && (
          <div className="text-red-400 text-xs mb-2 w-full text-left">{formik.errors.username}</div>
        )}
        <div className="flex items-center w-full mb-4 relative border-b border-gray-300">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="Input password"
            className="w-full bg-transparent text-white placeholder-gray-300 px-2 py-2 focus:outline-none pr-8"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
          >
            {showPassword ? (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.77 21.77 0 0 1 5.06-6.06M9.9 4.24A10.94 10.94 0 0 1 12 5c7 0 11 7 11 7a21.77 21.77 0 0 1-4.43 5.19M1 1l22 22" stroke="currentColor" strokeWidth="2" />
              </svg>
            )}
          </button>
        </div>
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-400 text-xs mb-2 w-full text-left">{formik.errors.password}</div>
        )}
        <div className="flex items-center w-full mb-4 relative border-b border-gray-300">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Please enter the password again"
            className="w-full bg-transparent text-white placeholder-gray-300 px-2 py-2 focus:outline-none pr-8"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300"
            onClick={() => setShowConfirmPassword((v) => !v)}
            tabIndex={-1}
          >
            {showConfirmPassword ? (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.77 21.77 0 0 1 5.06-6.06M9.9 4.24A10.94 10.94 0 0 1 12 5c7 0 11 7 11 7a21.77 21.77 0 0 1-4.43 5.19M1 1l22 22" stroke="currentColor" strokeWidth="2" />
              </svg>
            )}
          </button>
        </div>
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <div className="text-red-400 text-xs mb-2 w-full text-left">{formik.errors.confirmPassword}</div>
        )}
        <div className="flex items-center w-full mb-4 border-b border-gray-300">
          <input
            type="text"
            id="verificationCode"
            name="verificationCode"
            placeholder="Please enter the verification code"
            className="flex-1 bg-transparent text-white placeholder-gray-300 px-2 py-2 focus:outline-none"
            value={formik.values.verificationCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            autoComplete="off"
            disabled={!codeSent}
          />
          <button
            type="button"
            className={`ml-2 bg-white/20 text-white px-2 py-1 rounded text-xs border border-white/30 hover:bg-white/30 transition ${codeButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleSendCode}
            disabled={codeButtonDisabled}
          >
            {codeButtonDisabled ? `Resend (${codeButtonTimer}s)` : (codeSent ? 'Resend' : 'Send')}
          </button>
        </div>
        {formik.touched.verificationCode && formik.errors.verificationCode && (
          <div className="text-red-400 text-xs mb-2 w-full text-left">{formik.errors.verificationCode}</div>
        )}
        <div className="flex items-center w-full mb-6">
          <input
            id="agree"
            name="agree"
            type="checkbox"
            checked={formik.values.agree}
            onChange={formik.handleChange}
            className="accent-purple-500 mr-2"
            required
          />
          <label htmlFor="agree" className="text-white text-xs cursor-pointer select-none">
            I have read and agree to the User Registration Agreement
          </label>
        </div>
        {formik.touched.agree && formik.errors.agree && (
          <div className="text-red-400 text-xs mb-2 w-full text-left">{formik.errors.agree}</div>
        )}
        {error && (
          <div className="text-red-500 text-xs mb-2 w-full text-left">{error}</div>
        )}
        {success && (
          <div className="text-green-400 text-xs mb-2 w-full text-left">{success}</div>
        )}
        <button
          type="submit"
          className="w-fit px-8 bg-white text-black font-extralight py-2 rounded hover:bg-gray-200 transition mb-2"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register Now'}
        </button>
        <div className="flex justify-center w-full mb-4">
          <Link href="/" className="text-purple-400 text-sm hover:underline">
            Log in
          </Link>
        </div>
        <div className="text-gray-200 text-xs mt-2">version number: 1.1.25</div>
      </form>
      <button className="fixed left-4 bottom-4 z-20 bg-black/40 text-white text-xs px-3 py-1 rounded hover:bg-black/60 transition">
        Réglages Système
      </button>
    </div>
  );
}