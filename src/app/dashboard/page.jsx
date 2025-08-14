export default function DashboardPage() {
  return <div style={{ padding: 24 }}>Dashboard</div>;
}

import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Page one" />;
}
