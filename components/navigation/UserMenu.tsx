'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Menu, useMantineTheme } from '@mantine/core';
import { AccountCircleRounded, LogoutRounded } from '@mui/icons-material';

import Tooltip from '../Tooltip';

const UserMenu = () => {
  const router = useRouter();
  const theme = useMantineTheme();

  return (
    <Menu position="right-start" shadow="sm">
      <Tooltip label="menu" position="right">
        <Menu.Target>
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={42}
            height={42}
            style={{ borderRadius: '100%', cursor: 'pointer' }}
          />
        </Menu.Target>
      </Tooltip>

      <Menu.Dropdown sx={{ border: 'none', borderRadius: 12, padding: 8 }}>
        <Menu.Item
          sx={{ borderRadius: 12 }}
          fw={600}
          icon={
            <AccountCircleRounded htmlColor={theme.colors.orange[4]} sx={{ fontSize: '18px' }} />
          }
          onClick={() => router.push('/account')}
        >
          Account
        </Menu.Item>

        <Menu.Item
          sx={{ borderRadius: 12 }}
          fw={600}
          icon={<LogoutRounded htmlColor={theme.colors.orange[4]} sx={{ fontSize: '18px' }} />}
          onClick={() => signOut({ callbackUrl: `${window.location.origin}/signin` })}
        >
          Sign out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserMenu;
