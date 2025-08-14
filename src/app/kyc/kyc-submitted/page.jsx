'use client';

import { useRouter } from 'next/navigation';

export default function KycSubmittedPage() {
  const router = useRouter();

  const onGoHome = () => router.replace('/dashboard');

  return (
    <div style={{ padding: 24 }}>
      <h1>KYC Submitted</h1>
      <p>Your KYC is submitted and pending approval.</p>
      <button onClick={onGoHome}>Go to Dashboard</button>
    </div>
  );
}


