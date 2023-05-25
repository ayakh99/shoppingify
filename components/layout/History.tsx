'use client';

import { Flex, Title } from '@mantine/core';

import { ListsByDate } from '@types';
import useListDrawer from '@hooks/useListDrawer';
import useItemDrawer from '@hooks/useItemDrawer';
import useInfoDrawer from '@hooks/useInfoDrawer';

import ListsGrid from '@components/listview/ListsGrid';
import Empty from './Empty';

interface HistoryProps {
  listsByDate: ListsByDate;
}

const History: React.FC<HistoryProps> = ({ listsByDate }) => {
  const { onOpen } = useListDrawer();
  const { onClose: closeItemForm } = useItemDrawer();
  const { onClose: closeItemInfo } = useInfoDrawer();

  return (
    <Flex direction="column" gap={42}>
      <Title color="gray.7" fz={26} fw={700} maw={450} lh={'24px'}>
        Shopping History
      </Title>
      {listsByDate.length > 0 ? (
        <ListsGrid listsByDate={listsByDate} />
      ) : (
        <Empty
          title="No history"
          description="Looks like you haven't created any lists yet."
          buttonText="Create a new list"
          onClick={() => {
            closeItemForm();
            closeItemInfo();
            onOpen();
          }}
        />
      )}
    </Flex>
  );
};

export default History;
