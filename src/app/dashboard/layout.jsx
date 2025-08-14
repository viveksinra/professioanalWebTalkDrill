export const metadata = { title: 'Dashboard' };

export default function DashboardLayout({ children }) {
  return children;
}

export function generateStaticParams() {
  return [];
}

export const revalidate = 0;

export const dynamic = 'force-dynamic';

import { CONFIG } from 'src/global-config';
import { DashboardLayout } from 'src/layouts/dashboard';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  if (CONFIG.auth.skip) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
