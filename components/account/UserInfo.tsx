'use client';

import { Flex, Stack, Text } from '@mantine/core';
import { format } from 'date-fns';

import { SafeUser } from '@types';

interface UserInfoProps {
  user: SafeUser;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const labelProps = {
    fz: 12,
    fw: 500,
    color: 'gray.3',
    lh: '15px',
  };

  const valueProps = {
    fz: 18,
    fw: 500,
    color: '#000',
  };

  return (
    <Flex direction="column" gap={{ base: 20, sm: 34 }}>
      <Stack spacing={3}>
        <Text {...labelProps}>email</Text>
        <Text {...valueProps}>{user.email}</Text>
      </Stack>

      <Stack spacing={3}>
        <Text {...labelProps}>joined</Text>
        <Text {...valueProps}>{format(new Date(user.createdAt), 'E d.M.yyyy')}</Text>
      </Stack>
    </Flex>
  );
};

export default UserInfo;
