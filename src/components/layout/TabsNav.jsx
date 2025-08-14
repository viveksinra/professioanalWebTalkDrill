'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';

const tabs = [
  { href: '/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { href: '/schedule', label: 'Schedule', icon: <CalendarMonthIcon /> },
  { href: '/earnings', label: 'Earnings', icon: <AccountBalanceWalletIcon /> },
  { href: '/students', label: 'Students', icon: <PeopleIcon /> },
  { href: '/profile', label: 'Profile', icon: <PersonIcon /> },
];

export default function TabsNav() {
  const pathname = usePathname();
  const value = tabs.findIndex((t) => pathname?.startsWith(t.href));
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation showLabels value={value >= 0 ? value : 0}>
        {tabs.map((t) => (
          <BottomNavigationAction key={t.href} label={t.label} icon={t.icon} component={Link} href={t.href} />
        ))}
      </BottomNavigation>
    </Paper>
  );
}


