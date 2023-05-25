import Authentication from '@/components/auth/Authentication';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <Authentication>{children}</Authentication>;
};

export default AuthLayout;
