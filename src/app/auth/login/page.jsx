'use client';

import Link from 'next/link';

export default function LoginPage() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Login</h1>
      <p>Please continue to login via mobile.</p>
      <Link href="/auth/login-via-mobile">Login via Mobile</Link>
      <p style={{ marginTop: 16 }}>
        <Link href="/terms">Terms</Link> · <Link href="/privacy">Privacy</Link>
      </p>
    </div>
  );
}


