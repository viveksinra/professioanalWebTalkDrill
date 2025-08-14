import 'src/global.css';

import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import { CONFIG } from 'src/global-config';
import { primary } from 'src/theme/core/palette';
import { themeConfig, ThemeProvider } from 'src/theme';
import { talkdrillTheme } from 'src/theme/overrides/talkdrillTheme';

import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import TabsBoundary from 'src/components/layout/TabsBoundary';
import { detectSettings } from 'src/components/settings/server';
import { SettingsDrawer, defaultSettings, SettingsProvider } from 'src/components/settings';

import { AuthProvider } from 'src/auth/context/jwt';
import { SocketProvider } from 'src/contexts/socket/SocketProvider';
import { NotificationProvider } from 'src/contexts/notification/NotificationProvider';

// ----------------------------------------------------------------------

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: primary.main,
};

export const metadata = {
  icons: [
    {
      rel: 'icon',
      url: `${CONFIG.assetsDir}/favicon.ico`,
    },
  ],
};

// ----------------------------------------------------------------------

async function getAppConfig() {
  if (CONFIG.isStaticExport) {
    return {
      cookieSettings: undefined,
      dir: defaultSettings.direction,
    };
  } else {
    const [settings] = await Promise.all([detectSettings()]);

    return {
      cookieSettings: settings,
      dir: settings.direction,
    };
  }
}

export default async function RootLayout({ children }) {
  const appConfig = await getAppConfig();

  return (
    <html lang="en" dir={appConfig.dir} suppressHydrationWarning>
      <body>
        <InitColorSchemeScript
          modeStorageKey={themeConfig.modeStorageKey}
          attribute={themeConfig.cssVariables.colorSchemeSelector}
          defaultMode={themeConfig.defaultMode}
        />

        <AuthProvider>
          <SocketProvider>
            <NotificationProvider>
              <SettingsProvider
                cookieSettings={appConfig.cookieSettings}
                defaultSettings={defaultSettings}
              >
                <AppRouterCacheProvider options={{ key: 'css' }}>
              <ThemeProvider
                modeStorageKey={themeConfig.modeStorageKey}
                defaultMode={themeConfig.defaultMode}
                themeOverrides={talkdrillTheme}
              >
                    <MotionLazy>
                      <ProgressBar />
                      <SettingsDrawer defaultSettings={defaultSettings} />
                      <TabsBoundary>{children}</TabsBoundary>
                    </MotionLazy>
                  </ThemeProvider>
                </AppRouterCacheProvider>
              </SettingsProvider>
            </NotificationProvider>
          </SocketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
