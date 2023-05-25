'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button, Flex, Stack } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';

import notificationsContent from '@content/notifications';

interface ListConfirmProps {
  status: 'cancelled' | 'complete' | 'active';
  listId: string;
}

const ListConfirm: React.FC<ListConfirmProps> = ({ status, listId }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdate = useCallback(() => {
    setIsSubmitting(true);

    axios
      .patch(`/api/lists/${listId}`, { status })
      .then(() => {
        notifications.show(notificationsContent[status]);
        modals.closeAll();
        router.refresh();
      })
      .catch(() => {
        notifications.show(notificationsContent.error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, [listId, status, router]);

  return (
    <Stack>
      <Flex align="center" gap={8} mt={10} sx={{ alignSelf: 'end' }}>
        <Button
          variant="subtle"
          color="gray.7"
          onClick={() => modals.closeAll()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>

        <Button
          color={status === 'cancelled' ? 'red.3' : status === 'active' ? 'green.4' : 'cyan.3'}
          disabled={isSubmitting}
          onClick={handleUpdate}
        >
          Yes
        </Button>
      </Flex>
    </Stack>
  );
};

export default ListConfirm;
