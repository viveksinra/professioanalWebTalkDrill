'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/earnings', label: 'Earnings' },
  { href: '/students', label: 'Students' },
  { href: '/profile', label: 'Profile' },
];

export default function TabsNav() {
  const pathname = usePathname();
  return (
    <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, borderTop: '1px solid #eee', background: '#fff' }}>
      <ul style={{ display: 'flex', margin: 0, padding: 8, listStyle: 'none', justifyContent: 'space-around' }}>
        {tabs.map((t) => {
          const active = pathname === t.href;
          return (
            <li key={t.href}>
              <Link href={t.href} style={{ color: active ? '#1976d2' : '#333', textDecoration: 'none' }}>
                {t.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}


