'use client';

export default function Error({ error, reset }) {
  return (
    <div style={{ padding: 24 }}>
      <p>Something went wrong.</p>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{String(error)}</pre>
      <button onClick={() => reset()}>Retry</button>
    </div>
  );
}


