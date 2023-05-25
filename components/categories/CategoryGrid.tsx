'use client';

import { Flex, Stack, Title } from '@mantine/core';

import { UserItems } from '@types';
import Empty from '@components/layout/Empty';
import useItemDrawer from '@hooks/useItemDrawer';

import ItemGrid from '../items/ItemGrid';

interface CategoryGridProps {
  filteredItems: UserItems;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ filteredItems }) => {
  const { onOpen } = useItemDrawer();

  return (
    <Flex direction="column" gap={{ base: 27, md: 45 }} pt={{ base: 10, md: 58 }}>
      {filteredItems.length > 0 ? (
        filteredItems.map(
          (category) =>
            category.items.length > 0 && (
              <Stack key={category.id} spacing={18}>
                <Title fz={18} fw={500}>
                  {category.title}
                </Title>

                <ItemGrid items={category.items} />
              </Stack>
            )
        )
      ) : (
        <Empty
          title="No items"
          description="Looks like you haven't created any items yet."
          buttonText="Create a new item"
          onClick={onOpen}
        ></Empty>
      )}
    </Flex>
  );
};

export default CategoryGrid;
