'use client';

import { usePathname } from 'next/navigation';

import TabsNav from 'src/components/layout/TabsNav';

const tabPaths = ['/dashboard', '/schedule', '/earnings', '/students', '/profile'];

export default function TabsBoundary({ children }) {
  const pathname = usePathname();
  const showTabs = tabPaths.some((p) => pathname === p || pathname?.startsWith(`${p}/`));

  return (
    <div style={{ paddingBottom: showTabs ? 56 : 0 }}>
      {children}
      {showTabs ? <TabsNav /> : null}
    </div>
  );
}


