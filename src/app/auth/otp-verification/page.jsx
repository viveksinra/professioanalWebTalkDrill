'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OtpVerificationPage() {
  const [otp, setOtp] = useState('');
  const router = useRouter();

  const onVerify = async (e) => {
    e.preventDefault();
    // Placeholder: exchange OTP for token from backend; here simulate token
    const token = 'mock-token';
    try {
      sessionStorage.setItem('jwt_access_token', token);
    } catch {}
    await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    // Set gating cookies for demo flow
    document.cookie = 'haveAccountDetails=false; path=/';
    document.cookie = 'kycStatus=submitted; path=/';
    router.replace('/kyc/account-setup');
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>OTP Verification</h1>
      <form onSubmit={onVerify}>
        <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}


