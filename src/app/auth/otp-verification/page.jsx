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
    await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    router.replace('/dashboard');
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


