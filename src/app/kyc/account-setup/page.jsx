'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AccountSetupPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    // Placeholder: submit profile basics, then proceed to KYC verification
    router.replace('/kyc/kyc-verification');
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Account Setup</h1>
      <form onSubmit={onSubmit}>
        <label>
          Full name
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </label>
        <br />
        <label>
          Username
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}


