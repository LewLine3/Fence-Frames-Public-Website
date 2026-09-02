'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SiteNav } from '@/components/ff/site-nav';
import { SiteFooter } from '@/components/ff/site-footer';

// ==========================================
// COLOR PALETTE & DESIGN TOKENS
// ==========================================
const COLORS = {
  gold: '#E5B842',      // Step 1: Find It (Sun Gold)
  orange: '#F27A22',    // Step 2: Frame It (Ember Orange)
  green: '#4ADE80',     // Step 3: Fence It (Bright Forest Green)
  parchment: '#F4ECDC',  // Base Canvas Ground
  ivory: '#FAF6EE',      // Card Ground
  deepForest: '#16432D', // Major Grid Line / Dark Secondary
  darkInk: '#1A1A1A',    // Border / Dark Primary
};

// ==========================================
// COMPONENT: CROP-MARKS (35% / 5.5px LAW)
// ==========================================
const CropMarks = ({ type }: { type: 'technical' | 'cedar' }) => {
  const isTechnical = type === 'technical';
  const color = isTechnical ? COLORS.orange : COLORS.green;

  return (
    <>
      {/* Top-Left Crop Mark (Technical Style: Top-Left + Bottom-Right) */}
      {isTechnical && (
        <div className="absolute -top-[5.5px] -left-[5.5px] w-5 h-5 pointer-events-none overflow-visible z-10">
          <div className="absolute top-[5.5px] left-0 w-5 h-[2.5px]" style={{ backgroundColor: color }} />
          <div className="absolute top-0 left-[5.5px] w-[2.5px] h-5" style={{ backgroundColor: color }} />
        </div>
      )}

      {/* Top-Right Crop Mark (Cedar Style: Top-Right + Bottom-Left) */}
      {!isTechnical && (
        <div className="absolute -top-[5.5px] -right-[5.5px] w-5 h-5 pointer-events-none overflow-visible z-10">
          <div className="absolute top-[5.5px] right-0 w-5 h-[2.5px]" style={{ backgroundColor: color }} />
          <div className="absolute top-0 right-[5.5px] w-[2.5px] h-5" style={{ backgroundColor: color }} />
        </div>
      )}

      {/* Bottom-Left Crop Mark (Cedar Style: Top-Right + Bottom-Left) */}
      {!isTechnical && (
        <div className="absolute -bottom-[5.5px] -left-[5.5px] w-5 h-5 pointer-events-none overflow-visible z-10">
          <div className="absolute bottom-[5.5px] left-0 w-5 h-[2.5px]" style={{ backgroundColor: color }} />
          <div className="absolute bottom-0 left-[5.5px] w-[2.5px] h-5" style={{ backgroundColor: color }} />
        </div>
      )}

      {/* Bottom-Right Crop Mark (Technical Style: Top-Left + Bottom-Right) */}
      {isTechnical && (
        <div className="absolute -bottom-[5.5px] -right-[5.5px] w-5 h-5 pointer-events-none overflow-visible z-10">
          <div className="absolute bottom-[5.5px] right-0 w-5 h-[2.5px]" style={{ backgroundColor: color }} />
          <div className="absolute bottom-0 right-[5.5px] w-[2.5px] h-5" style={{ backgroundColor: color }} />
        </div>
      )}
    </>
  );
};

// ==========================================
// CORE PAGE COMPONENT
// ==========================================
export default function AuthGate() {
  // Portal Roles
  type RoleType = 'HOMEOWNER' | 'HOA' | 'CONTRACTOR';
  const [activeRole, setActiveRole] = useState<RoleType>('HOMEOWNER');

  // Multi-step Registration / OTP States
  const [step, setStep] = useState<1 | 2>(1);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [zip, setZip] = useState('');
  const [otpCode, setOtpCode] = useState<string[]>(new Array(6).fill(''));
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Verification Countdown Timer (120 seconds)
  const [timer, setTimer] = useState(120);
  const [timerActive, setTimerActive] = useState(false);

  // Verification Success simulation state
  const [isSuccess, setIsSuccess] = useState(false);

  // Trigger countdown timer on Step 2
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setTimerActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, timer]);

  // Handle Step 1: Submit Form to Request OTP
  const handleRequestOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !zip) return;
    setTimer(120);
    setTimerActive(true);
    setStep(2);
  };

  // Handle digit input in OTP Box
  const handleOtpChange = (val: string, index: number) => {
    const digit = val.replace(/[^0-9]/g, '');
    if (!digit) return;

    const newOtp = [...otpCode];
    newOtp[index] = digit[digit.length - 1];
    setOtpCode(newOtp);

    // Auto-focus next box
    if (index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace in OTP Box
  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (otpCode[index] !== '') {
        const newOtp = [...otpCode];
        newOtp[index] = '';
        setOtpCode(newOtp);
      } else if (index > 0) {
        const newOtp = [...otpCode];
        newOtp[index - 1] = '';
        setOtpCode(newOtp);
        otpInputRefs.current[index - 1]?.focus();
      }
    }
  };

  // Verify entered OTP
  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.join('').length < 6) return;
    setIsSuccess(true);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const resetOTPStep = () => {
    setStep(1);
    setOtpCode(new Array(6).fill(''));
    setTimerActive(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col font-['Rowdies'] select-none relative overflow-x-hidden"
      style={{
        backgroundColor: COLORS.parchment,
        backgroundImage: `
          linear-gradient(rgba(22,67,45,0.35) 1px, transparent 1px),
          linear-gradient(90deg, rgba(22,67,45,0.35) 1px, transparent 1px),
          linear-gradient(#16432D 2px, transparent 2px),
          linear-gradient(90deg, #16432D 2px, transparent 2px)
        `,
        backgroundSize: '25px 25px, 25px 25px, 100px 100px, 100px 100px',
        color: '#1A1A1A',
      }}
    >
      <SiteNav />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: SECURITY AUTH GATEWAY */}
        <section className="lg:col-span-7 flex flex-col space-y-6">
          <div
            className="relative has-outside-corners rounded-[5px] border-[2.5px] border-[#1A1A1A] shadow-[5px_5px_0px_0px_#1A1A1A] overflow-visible p-6 md:p-8"
            style={{ backgroundColor: COLORS.ivory }}
          >
            {/* Technical Orange Crop Marks */}
            <CropMarks type="technical" />

            {!isSuccess ? (
              <>
                <div className="inline-block bg-[#1A1A1A] text-[#FAF6EE] px-2.5 py-0.5 rounded-[5px] font-rowdies-regular text-[10px] uppercase tracking-wider mb-3">
                  PORTAL SECURE GATEWAY
                </div>

                <h1 className="font-rowdies-bold text-2xl md:text-3xl leading-tight text-[#1A1A1A] uppercase">
                  Log In / Sign Up
                </h1>
                <h2 className="font-rowdies-regular text-sm md:text-base leading-tight text-[#16432D] uppercase mt-1">
                  Unlock Architectural File
                </h2>
                
                <p className="font-rowdies-light text-xs text-[#1A1A1A]/80 mt-1 mb-5 leading-relaxed">
                  Your temporary design is cached. Verify your contact details to generate an HOA-ready PDF blueprint and access local labor estimates.
                </p>

                {/* Conditional Portal Intercept Alerts */}
                {activeRole === 'HOMEOWNER' && (
                  <div className="bg-[#E5B842]/10 border-l-[3px] border-[#E5B842] p-3 rounded-[5px] mb-5">
                    <p className="font-rowdies-regular text-xs text-[#1A1A1A] uppercase tracking-wide">
                      🔒 Temporary Cache Secured
                    </p>
                    <p className="font-rowdies-light text-[11px] text-[#1A1A1A]/80 mt-0.5">
                      Your technical parameters are preserved in local IP memory. Complete SMS validation to download complete structural assets.
                    </p>
                  </div>
                )}

                {activeRole === 'HOA' && (
                  <div className="bg-[#F27A22]/10 border-l-[3px] border-[#F27A22] p-3 rounded-[5px] mb-5">
                    <p className="font-rowdies-regular text-xs text-[#1A1A1A] uppercase tracking-wide">
                      📋 HOA Board Route
                    </p>
                    <p className="font-rowdies-light text-[11px] text-[#1A1A1A]/80 mt-0.5">
                      Access community structural submittals, spatial plots, and regional engineering reference guidelines.
                    </p>
                  </div>
                )}

                {activeRole === 'CONTRACTOR' && (
                  <div className="bg-[#4ADE80]/10 border-l-[3px] border-[#4ADE80] p-3 rounded-[5px] mb-5">
                    <p className="font-rowdies-regular text-xs text-[#1A1A1A] uppercase tracking-wide">
                      ⚡ Contractor Dispatch Access
                    </p>
                    <p className="font-rowdies-light text-[11px] text-[#1A1A1A]/80 mt-0.5">
                      Input credentials to unlock active regional job bidding pools, client specs, and pre-scoped tender estimates.
                    </p>
                  </div>
                )}

                {/* Dual-Step SMS Form */}
                {step === 1 ? (
                  <form onSubmit={handleRequestOTP} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name Box */}
                      <div className="flex flex-col space-y-1">
                        <label className="font-rowdies-regular text-[10px] uppercase text-[#1A1A1A] tracking-wider">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Colton Lewis"
                          className="px-2.5 py-1.5 rounded-[5px] border-[2px] border-[#1A1A1A] font-rowdies-light text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#F27A22]"
                        />
                      </div>

                      {/* ZIP Box */}
                      <div className="flex flex-col space-y-1">
                        <label className="font-rowdies-regular text-[10px] uppercase text-[#1A1A1A] tracking-wider">
                          Project Location ZIP
                        </label>
                        <input
                          type="text"
                          maxLength={5}
                          required
                          value={zip}
                          onChange={(e) => setZip(e.target.value.replace(/[^0-9]/g, ''))}
                          placeholder="98045"
                          className="px-2.5 py-1.5 rounded-[5px] border-[2px] border-[#1A1A1A] font-rowdies-light text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#F27A22]"
                        />
                      </div>
                    </div>

                    {/* Phone Box */}
                    <div className="flex flex-col space-y-1">
                      <label className="font-rowdies-regular text-[10px] uppercase text-[#1A1A1A] tracking-wider">
                        Mobile Phone Number (SMS-Capable)
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(425) 555-0199"
                        className="px-2.5 py-1.5 rounded-[5px] border-[2px] border-[#1A1A1A] font-rowdies-light text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#F27A22]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 mt-2 rounded-[5px] border-[2px] border-[#1A1A1A] font-rowdies-regular text-xs uppercase tracking-wider text-[#1A1A1A] transition-all hover:translate-y-[-1px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-y-[0px] active:shadow-none"
                      style={{ backgroundColor: COLORS.orange }}
                    >
                      Request Verification Pin →
                    </button>
                  </form>
                ) : (
                  // Step 2: SMS OTP Entry
                  <form onSubmit={handleVerifyOTP} className="space-y-4">
                    <div className="bg-[#1A1A1A] text-[#FAF6EE] p-2.5 rounded-[5px] flex justify-between items-center">
                      <div>
                        <p className="font-rowdies-light text-[9px] uppercase tracking-wider text-[#FAF6EE]/70">SMS CODE TRANSMITTED TO</p>
                        <p className="font-rowdies-regular text-xs tracking-wide">{phone || '(425) 555-0199'}</p>
                      </div>
                      <button
                        type="button"
                        onClick={resetOTPStep}
                        className="text-[#E5B842] text-[9px] uppercase underline tracking-wider hover:text-white bg-transparent border-none cursor-pointer"
                      >
                        Change Number
                      </button>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label className="font-rowdies-regular text-[10px] uppercase text-[#1A1A1A] tracking-wider text-center">
                        Input 6-Digit Verification Key
                      </label>
                      
                      {/* OTP Fields */}
                      <div className="flex justify-between gap-1.5 max-w-xs mx-auto w-full">
                        {otpCode.map((data, index) => (
                          <input
                            key={index}
                            type="text"
                            maxLength={1}
                            ref={(el) => { otpInputRefs.current[index] = el; }}
                            value={data}
                            onChange={(e) => handleOtpChange(e.target.value, index)}
                            onKeyDown={(e) => handleOtpKeyDown(e, index)}
                            className="w-10 h-10 text-center rounded-[5px] border-[2px] border-[#1A1A1A] bg-white font-rowdies-bold text-lg text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#4ADE80]"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Resend Logic */}
                    <div className="flex justify-between items-center text-[10px] px-1">
                      <span className="font-rowdies-light text-[#1A1A1A]/70">
                        {timerActive ? `Code expires in ${formatTimer(timer)}` : 'Code expired.'}
                      </span>
                      <button
                        type="button"
                        disabled={timerActive}
                        onClick={() => {
                          setTimer(120);
                          setTimerActive(true);
                          setOtpCode(new Array(6).fill(''));
                        }}
                        className={`font-rowdies-regular uppercase tracking-wider bg-transparent border-none cursor-pointer ${timerActive ? 'text-[#1A1A1A]/30' : 'text-[#F27A22] underline hover:text-[#1A1A1A]'}`}
                      >
                        Resend Code
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-[5px] border-[2px] border-[#1A1A1A] font-rowdies-regular text-xs uppercase tracking-wider text-[#1A1A1A] transition-all hover:translate-y-[-1px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-y-[0px] active:shadow-none"
                      style={{ backgroundColor: COLORS.green }}
                    >
                      Verify & Claim Blueprint PDF
                    </button>
                  </form>
                )}
              </>
            ) : (
              // Step 3: Success Granted Screen
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 bg-[#4ADE80] border-[2px] border-[#1A1A1A] rounded-full mx-auto flex items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A]">
                  <svg className="w-6 h-6 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <div>
                  <h2 className="font-rowdies-bold text-2xl text-[#16432D] uppercase">Access Granted</h2>
                  <p className="font-rowdies-light text-xs text-[#1A1A1A] mt-1 max-w-sm mx-auto">
                    Identity confirmed for <span className="font-rowdies-regular">{fullName || 'User'}</span>. Generating custom PDF Blueprint #FF-98045-8912.
                  </p>
                </div>

                <div className="p-3 border-[2px] border-dashed border-[#1A1A1A] rounded-[5px] bg-[#4ADE80]/10 max-w-xs mx-auto">
                  <p className="font-rowdies-light text-[11px] text-[#1A1A1A]/80 uppercase">
                    Redirecting to standalone blueprint workspace...
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setStep(1);
                    setOtpCode(new Array(6).fill(''));
                  }}
                  className="px-4 py-1.5 bg-[#1A1A1A] text-white rounded-[5px] font-rowdies-regular text-[10px] uppercase tracking-wider hover:bg-white hover:text-[#1A1A1A] transition-colors border-[2px] border-[#1A1A1A]"
                >
                  Reset Portal Demo
                </button>
              </div>
            )}
          </div>
        </section>

        {/* RIGHT COLUMN: GUEST DRAFT PRESERVATION COMPONENT */}
        <section className="lg:col-span-5 flex flex-col space-y-4">
          <div className="px-1">
            <h3 className="font-rowdies-bold text-sm text-[#1A1A1A] uppercase tracking-wide flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F27A22] animate-pulse" />
              Locked Guest Draft Detected
            </h3>
            <p className="font-rowdies-light text-[11px] text-[#1A1A1A]/70 mt-0.5 leading-tight">
              Based on IP localization in {zip || '98045'}, these technical parameters are reserved in temporary active cache memory.
            </p>
          </div>

          {/* Cedar Wood Plate Container */}
          <div
            className="relative has-outside-corners rounded-[5px] border-[2.5px] border-[#1A1A1A] shadow-[3.5px_3.5px_0px_0px_#1A1A1A] overflow-visible"
            style={{ backgroundColor: COLORS.ivory }}
          >
            {/* Cedar Green Crop Marks */}
            <CropMarks type="cedar" />

            {/* Black Title Bar */}
            <div className="bg-[#1A1A1A] text-[#E5B842] px-3.5 py-2 flex justify-between items-center rounded-t-[2px] border-b-[2px] border-[#1A1A1A]">
              <span className="font-rowdies-bold text-[10px] uppercase tracking-wider">
                UNSAVED DRAFT #DRAFT-{zip || '98045'}
              </span>
              <span className="font-rowdies-regular text-[9px] bg-[#E5B842]/20 text-[#E5B842] px-1.5 py-0.5 rounded border border-[#E5B842]/40">
                TEMP CACHE
              </span>
            </div>

            {/* Simulated Slat Cedar Background */}
            <div
              className="p-4 flex flex-col space-y-3 relative"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(250, 246, 238, 0.94), rgba(250, 246, 238, 0.94)),
                  repeating-linear-gradient(90deg, #FAF6EE 0px, #FAF6EE 8px, #F0E8D5 8px, #F0E8D5 16px)
                `,
              }}
            >
              {/* Draft Owner Badge */}
              <div className="flex justify-between items-center bg-white/95 px-2.5 py-1.5 rounded-[5px] border-[1.5px] border-[#1A1A1A]">
                <div>
                  <p className="font-rowdies-light text-[8px] uppercase text-[#1A1A1A]/60 leading-none">REGISTRANT</p>
                  <p className="font-rowdies-bold text-xs text-[#1A1A1A] leading-tight truncate max-w-[120px]">
                    {fullName || 'GUEST DESIGNER'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-rowdies-light text-[8px] uppercase text-[#1A1A1A]/60 leading-none">LOCATION ZIP</p>
                  <p className="font-rowdies-bold text-xs text-[#16432D] leading-tight">
                    {zip || '98045'}
                  </p>
                </div>
              </div>

              {/* Technical Drawing Elevation SVG */}
              <div className="bg-white/95 border-[1.5px] border-[#1A1A1A] rounded-[5px] p-2.5 relative flex items-center justify-center min-h-[110px] overflow-hidden">
                <svg className="w-full h-20 text-[#1A1A1A]" viewBox="0 0 300 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Ground line */}
                  <line x1="10" y1="80" x2="290" y2="80" stroke="#1A1A1A" strokeWidth="1.5" strokeDasharray="3 3" />
                  
                  {/* 3 Posts */}
                  <rect x="35" y="15" width="6" height="65" fill="#16432D" stroke="#1A1A1A" strokeWidth="1.2" />
                  <rect x="145" y="15" width="6" height="65" fill="#16432D" stroke="#1A1A1A" strokeWidth="1.2" />
                  <rect x="255" y="15" width="6" height="65" fill="#16432D" stroke="#1A1A1A" strokeWidth="1.2" />

                  {/* Horizontal rails */}
                  <line x1="41" y1="25" x2="145" y2="25" stroke="#1A1A1A" strokeWidth="2" />
                  <line x1="41" y1="48" x2="145" y2="48" stroke="#1A1A1A" strokeWidth="2" />
                  <line x1="41" y1="70" x2="145" y2="70" stroke="#1A1A1A" strokeWidth="2" />

                  <line x1="151" y1="25" x2="255" y2="25" stroke="#1A1A1A" strokeWidth="2" />
                  <line x1="151" y1="48" x2="255" y2="48" stroke="#1A1A1A" strokeWidth="2" />
                  <line x1="151" y1="70" x2="255" y2="70" stroke="#1A1A1A" strokeWidth="2" />

                  {/* Pickets */}
                  {Array.from({ length: 9 }).map((_, i) => (
                    <rect key={i} x={45 + i * 10} y="20" width="5" height="55" fill="#E5B842" stroke="#1A1A1A" strokeWidth="0.5" opacity="0.8" />
                  ))}
                  {Array.from({ length: 9 }).map((_, i) => (
                    <rect key={i + 10} x={155 + i * 10} y="20" width="5" height="55" fill="#E5B842" stroke="#1A1A1A" strokeWidth="0.5" opacity="0.8" />
                  ))}

                  {/* Orange linear dimensions */}
                  <path d="M 41 88 L 255 88" stroke="#F27A22" strokeWidth="1.2" />
                  <path d="M 41 85 L 41 91 M 255 85 L 255 91" stroke="#F27A22" strokeWidth="1.2" />
                  <text x="148" y="86" fill="#F27A22" fontSize="7" textAnchor="middle" className="font-rowdies-regular">156 LF</text>
                </svg>

                {/* Overlaid Blueprint Value Shield Lock */}
                <div className="absolute inset-0 bg-[#1A1A1A]/85 flex flex-col items-center justify-center p-3 text-center z-20">
                  <div className="w-8 h-8 rounded-full bg-[#E5B842] flex items-center justify-center border border-white mb-1.5 shadow-sm">
                    <svg className="w-4 h-4 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <span className="font-rowdies-bold text-[9px] uppercase tracking-wider text-[#E5B842]">
                    ARUP STANDALONE BLUEPRINT LOCKED
                  </span>
                  <span className="font-rowdies-light text-[8px] text-[#FAF6EE]/80 max-w-[180px] mt-0.5">
                    Submit SMS verification gateway to unlock complete technical drafting pack.
                  </span>
                </div>
              </div>

              {/* Itemized spec list */}
              <div className="space-y-1">
                <div className="flex justify-between border-b border-[#1A1A1A]/10 pb-0.5">
                  <span className="font-rowdies-regular text-[10px] text-[#1A1A1A]/60 uppercase">SYSTEM TYPE</span>
                  <span className="font-rowdies-bold text-[10px] text-[#1A1A1A] uppercase">3-Rail Premium Homestead</span>
                </div>
                <div className="flex justify-between border-b border-[#1A1A1A]/10 pb-0.5">
                  <span className="font-rowdies-regular text-[10px] text-[#1A1A1A]/60 uppercase">LINEAR FOOTAGE</span>
                  <span className="font-rowdies-bold text-[10px] text-[#1A1A1A]">156 LF</span>
                </div>
                <div className="flex justify-between border-b border-[#1A1A1A]/10 pb-0.5">
                  <span className="font-rowdies-regular text-[10px] text-[#1A1A1A]/60 uppercase">ARCHITECTURAL HEIGHT</span>
                  <span className="font-rowdies-bold text-[10px] text-[#1A1A1A]">6.0 FT</span>
                </div>
                <div className="flex justify-between border-b border-[#1A1A1A]/10 pb-0.5">
                  <span className="font-rowdies-regular text-[10px] text-[#1A1A1A]/60 uppercase">POST CORES</span>
                  <span className="font-rowdies-bold text-[10px] text-[#16432D]">Concrete Infilled Steel Heavy-Wall</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-rowdies-regular text-[10px] text-[#1A1A1A]/60 uppercase">HOA CODE COMPLIANCE</span>
                  <span className="font-rowdies-bold text-[9px] text-[#4ADE80] bg-[#1A1A1A] px-1 rounded">PASSED ARC-CODE-1</span>
                </div>
              </div>

              {/* Legal Independent Reference Warning */}
              <div className="p-1.5 border border-[#1A1A1A]/20 rounded bg-white/40 text-[8px] font-rowdies-light text-[#1A1A1A]/60 leading-tight uppercase">
                ⚠️ Independent Architectural Reference Disclaimer: Fence Frames is an independent software design framework and does not represent local HOAs or government permitting boards.
              </div>
            </div>
          </div>
        </section>

        {/* Demo role switcher — in-page only, not a footer substitute */}
        <section className="lg:col-span-12 mt-2">
          <div className="has-outside-corners rounded-[5px] border-[2px] border-[#1A1A1A] bg-[#FAF6EE] p-4 shadow-[3px_3px_0px_0px_#1A1A1A]">
            <span className="font-rowdies-regular text-[10px] text-[#1A1A1A]/60 uppercase tracking-wider block mb-2">
              Demo · Switch Account Portal
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => { setActiveRole('HOMEOWNER'); resetOTPStep(); }}
                className="px-2.5 py-1 rounded-[5px] border-[2px] border-[#1A1A1A] font-rowdies-regular text-[10px] uppercase tracking-wider transition-all"
                style={{
                  backgroundColor: activeRole === 'HOMEOWNER' ? COLORS.gold : 'transparent',
                  boxShadow: activeRole === 'HOMEOWNER' ? '1.5px 1.5px 0px 0px #1A1A1A' : 'none',
                }}
              >
                🏠 Homeowner Client
              </button>
              <button
                type="button"
                onClick={() => { setActiveRole('HOA'); resetOTPStep(); }}
                className="px-2.5 py-1 rounded-[5px] border-[2px] border-[#1A1A1A] font-rowdies-regular text-[10px] uppercase tracking-wider transition-all"
                style={{
                  backgroundColor: activeRole === 'HOA' ? COLORS.orange : 'transparent',
                  boxShadow: activeRole === 'HOA' ? '1.5px 1.5px 0px 0px #1A1A1A' : 'none',
                }}
              >
                📋 HOA Review Board
              </button>
              <button
                type="button"
                onClick={() => { setActiveRole('CONTRACTOR'); resetOTPStep(); }}
                className="px-2.5 py-1 rounded-[5px] border-[2px] border-[#1A1A1A] font-rowdies-regular text-[10px] uppercase tracking-wider transition-all"
                style={{
                  backgroundColor: activeRole === 'CONTRACTOR' ? COLORS.green : 'transparent',
                  boxShadow: activeRole === 'CONTRACTOR' ? '1.5px 1.5px 0px 0px #1A1A1A' : 'none',
                }}
              >
                🛠️ Licensed Contractor
              </button>
            </div>
          </div>
        </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
