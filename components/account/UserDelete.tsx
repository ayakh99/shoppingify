'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import axios from 'axios';
import { Button, Flex, Stack } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';

import notificationsContent from '@content/notifications';

interface UserDeleteProps {
  userId: string;
}

const UserDelete: React.FC<UserDeleteProps> = ({ userId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = useCallback(() => {
    setIsSubmitting(true);
    axios
      .delete(`/api/users/${userId}`)
      .then(() => {
        modals.closeAll();
        signOut({ callbackUrl: `${window.location.origin}/signup` });
      })
      .catch(() => {
        notifications.show(notificationsContent.error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, [userId]);

  return (
    <Stack spacing={20}>
      <Flex align="center" gap={8} mt={10} sx={{ alignSelf: 'end' }}>
        <Button
          variant="subtle"
          color="gray.7"
          onClick={() => modals.closeAll()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>

        <Button type="submit" color="red.3" disabled={isSubmitting} onClick={handleDelete}>
          Delete account
        </Button>
      </Flex>
    </Stack>
  );
};

export default UserDelete;
