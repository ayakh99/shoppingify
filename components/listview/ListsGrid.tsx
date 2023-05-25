'use client';

import { Flex, Text } from '@mantine/core';
import { ListsByDate } from '@types';

import ListCard from './ListCard';
import { format } from 'date-fns';

interface ListsGridProps {
  listsByDate: ListsByDate;
}

const ListsGrid: React.FC<ListsGridProps> = ({ listsByDate }) => {
  return (
    <Flex direction="column" gap={{ base: 35, sm: 45, md: 54 }}>
      {listsByDate.map(({ lists }, index) => (
        <Flex direction="column" gap={18} key={index}>
          <Text fz={12} fw={500} color="black">
            {format(new Date(lists[0].createdAt.$date), 'MMMM yyyy')}
          </Text>

          <Flex direction="column" gap={28}>
            {lists.map((list) => (
              <ListCard key={list._id.$oid} list={list} />
            ))}
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default ListsGrid;
