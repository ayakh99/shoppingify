export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/home', '/history', '/statistics', '/history/:path*', '/account'],
};
