'use client';

import { useRouter } from 'next/navigation';

export default function KycVerificationPage() {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    // Placeholder: simulate KYC submitted, set cookie flag
    await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: 'mock-token' }),
    });
    document.cookie = 'kycStatus=submitted; path=/';
    router.replace('/kyc/kyc-submitted');
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>KYC Verification</h1>
      <p>Upload your documents (placeholder UI).</p>
      <form onSubmit={onSubmit}>
        <button type="submit">Submit KYC</button>
      </form>
    </div>
  );
}


