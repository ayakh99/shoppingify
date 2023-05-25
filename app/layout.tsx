import ThemeProvider from '@components/providers/ThemeProvider';
import ClientOnly from '@/components/ClientOnly';

export const metadata = {
  title: 'Shoppingify',
  description: 'Shoppingify allows you take your shopping list wherever you go.',
  icons: {
    icon: '/images/logo.svg',
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <ClientOnly>
          <ThemeProvider>{children}</ThemeProvider>
        </ClientOnly>
      </body>
    </html>
  );
};

export default RootLayout;
