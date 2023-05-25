'use client';

import { useCallback } from 'react';
import { Button, Flex } from '@mantine/core';
import { modals } from '@mantine/modals';

import { listConfirmModalProps } from '@common/modals.props';

import ListConfirm from './ListConfirm';
import useListDrawer from '@hooks/useListDrawer';

const ListActions = () => {
  const { listId } = useListDrawer();

  const openModal = useCallback(
    (title: string, status: 'cancelled' | 'complete' | 'active') => {
      modals.open({
        ...listConfirmModalProps(title),
        children: <ListConfirm status={status} listId={listId} />,
      });
    },
    [listId]
  );

  return (
    <Flex p={{ base: 18, sm: 35 }} bg="white" align="center" justify="center" gap={10} w="100%">
      <Button
        color="gray.7"
        variant="subtle"
        onClick={() => openModal('Are you sure you want to cancel this list?', 'cancelled')}
      >
        cancel
      </Button>
      <Button
        color="cyan.3"
        onClick={() =>
          openModal('Are you sure you want to mark this list as complete?', 'complete')
        }
      >
        Complete
      </Button>
    </Flex>
  );
};

export default ListActions;
