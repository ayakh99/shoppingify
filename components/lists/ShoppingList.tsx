'use client';

import { Box, Flex } from '@mantine/core';

import useListDrawer from '@hooks/useListDrawer';

import ListPrompt from './Prompt';
import EmptyState from './EmptyState';
import ListCreate from './ListCreate';
import ListEdit from './ListEdit';
import ListBody from './ListBody';
import ListHeading from './ListHeading';
import ListActions from './ListActions';

const ShoppingList = () => {
  const { listId, isEmpty, isEditing } = useListDrawer();

  return (
    <Flex w="100%" h="100%" direction="column" justify="space-between" bg="orange.0">
      <Flex
        direction="column"
        w="100%"
        h="100%"
        mah="100%"
        sx={{ overflowY: !listId || isEmpty ? 'visible' : 'scroll' }}
        p={{ base: '24px 8px 0', sm: '48px 20px 0' }}
      >
        <ListPrompt />

        <Box h="100%" mah="100%" sx={{ overflowY: !listId || isEmpty ? 'visible' : 'scroll' }}>
          {!listId ? (
            <EmptyState title="No lists" />
          ) : (
            <>
              <ListHeading />
              {isEmpty ? <EmptyState title="No items" /> : <ListBody />}
            </>
          )}
        </Box>
      </Flex>

      {!listId ? (
        <ListCreate />
      ) : isEmpty || isEditing ? (
        <ListEdit disabled={!isEditing} />
      ) : (
        <ListActions />
      )}
    </Flex>
  );
};

export default ShoppingList;
