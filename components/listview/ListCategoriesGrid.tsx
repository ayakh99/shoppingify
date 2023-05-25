'use client';

import { Flex, Stack, Text, Title } from '@mantine/core';
import { ListItems } from '@types';

import ListItemsGrid from './ListItemsGrid';

interface ListCategoriesGridProps {
  listItems: ListItems;
}

const ListCategoriesGrid: React.FC<ListCategoriesGridProps> = ({ listItems }) => {
  return (
    <Flex direction="column" gap={{ base: 27, md: 45 }} pt={{ base: 10, md: 19 }}>
      {listItems.length > 0 ? (
        listItems.map(({ category, items }, index) => (
          <Stack key={index} spacing={18}>
            <Title fz={18} fw={500}>
              {category.title}
            </Title>

            <ListItemsGrid items={items} />
          </Stack>
        ))
      ) : (
        <Flex direction="column" justify="center" align="center">
          <Text fz={16} fw={600}>
            This list has no items.
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default ListCategoriesGrid;
