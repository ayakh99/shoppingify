'use client';

import { useCallback, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button, Flex, Stack } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';

import notificationsContent from '@content/notifications';
import useInfoDrawer from '@hooks/useInfoDrawer';

const ItemDelete = () => {
  const router = useRouter();
  const { itemId, onClose } = useInfoDrawer();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = useCallback(() => {
    setIsSubmitting(true);

    axios
      .delete(`/api/items/${itemId}`)
      .then(() => {
        notifications.show(notificationsContent.itemDelete);
        modals.closeAll();
        onClose();
        router.refresh();
      })
      .catch(() => {
        notifications.show(notificationsContent.error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, [router, itemId, onClose]);

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

        <Button color="red.3" disabled={isSubmitting} onClick={handleDelete}>
          Yes
        </Button>
      </Flex>
    </Stack>
  );
};

export default ItemDelete;
