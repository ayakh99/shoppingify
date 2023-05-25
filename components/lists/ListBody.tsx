'use client';

import useListDrawer from '@hooks/useListDrawer';
import { Flex, Text } from '@mantine/core';
import ListItem from './ListItem';

const ListBody = () => {
  const { listItems } = useListDrawer();

  return (
    <Flex direction="column" gap={48} pb={{ base: 24, sm: 48 }} px={{ base: 16, sm: 20 }}>
      {listItems.map(({ category, items }, index) => (
        <Flex key={index} direction="column" gap={20}>
          <Text fz={14} fw={500} color="gray.5">
            {category.title}
          </Text>

          <Flex direction="column" gap={16}>
            {items.map((item) => (
              <ListItem key={item.id.$oid} item={item} />
            ))}
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default ListBody;
