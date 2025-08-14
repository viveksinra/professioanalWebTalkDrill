'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginViaMobilePage() {
  const [phone, setPhone] = useState('');
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    // Placeholder: call backend to send OTP
    // Ensure CSRF cookie is present
    try {
      await fetch('/api/csrf');
    } catch {}
    router.push('/auth/otp-verification');
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Login via Mobile</h1>
      <form onSubmit={onSubmit}>
        <label>
          Mobile Number
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" />
        </label>
        <button type="submit">Send OTP</button>
      </form>
    </div>
  );
}


