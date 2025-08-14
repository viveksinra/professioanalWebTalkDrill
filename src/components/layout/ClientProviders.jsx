'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import { themeConfig, ThemeProvider } from 'src/theme';
import { talkdrillTheme } from 'src/theme/overrides/talkdrillTheme';
import { SettingsProvider, defaultSettings } from 'src/components/settings';
import { SocketProvider } from 'src/contexts/socket/SocketProvider';
import { NotificationProvider } from 'src/contexts/notification/NotificationProvider';
import { AuthProvider } from 'src/auth/context/jwt';

export default function ClientProviders({ children }) {
  return (
    <AuthProvider>
      <SocketProvider>
        <NotificationProvider>
          <SettingsProvider defaultSettings={defaultSettings}>
            <AppRouterCacheProvider options={{ key: 'css' }}>
              <ThemeProvider
                modeStorageKey={themeConfig.modeStorageKey}
                defaultMode={themeConfig.defaultMode}
                themeOverrides={talkdrillTheme}
              >
                {children}
              </ThemeProvider>
            </AppRouterCacheProvider>
          </SettingsProvider>
        </NotificationProvider>
      </SocketProvider>
    </AuthProvider>
  );
}


