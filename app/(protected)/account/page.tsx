import { SafeUser } from '@types';
import getCurrentUser from '@actions/getCurrentUser';

import Account from '@components/layout/Account';

const AccountPage = async () => {
  const currentUser = (await getCurrentUser()) as SafeUser;

  return <Account user={currentUser} />;
};

export default AccountPage;
