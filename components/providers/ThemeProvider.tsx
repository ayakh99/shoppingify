'use client';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import theme from '@/theme';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <ModalsProvider>
        <Notifications />
        {children}
      </ModalsProvider>
    </MantineProvider>
  );
};

export default ThemeProvider;
