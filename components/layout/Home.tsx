'use client';

import { useEffect, useState } from 'react';
import { Flex, Text, Title } from '@mantine/core';

import { UserItems } from '@types';

import CategoryGrid from '@components/categories/CategoryGrid';
import Search from '@components/search/Search';
import Empty from './Empty';

interface HomeProps {
  userItems: UserItems;
}

const Home: React.FC<HomeProps> = ({ userItems }) => {
  const [filter, setFilter] = useState('');
  const [filteredItems, setFilteredItems] = useState(userItems || []);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    if (userItems.length > 0) {
      const filteredCategories = userItems.map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          item.name.toLowerCase().includes(filter.toLowerCase().trim())
        ),
      }));
      setFilteredItems(filteredCategories);

      const isEmpty = filteredCategories
        .map(({ items }) => items.length === 0)
        .reduce((acc, val) => acc && val);
      setNoResults(isEmpty);
    }
  }, [filter, userItems]);

  return (
    <Flex direction="column" gap={{ base: 38, md: 0 }}>
      <Flex
        direction="row"
        gap={{ sm: 38, md: 48, lg: 57 }}
        align="flex-start"
        justify="space-between"
      >
        <Title
          fz={26}
          fw={500}
          maw={450}
          color="gray.7"
          lh={'32px'}
          display={{ base: 'none', md: 'block' }}
        >
          <Text span color="orange.4" fw={700} lh={'32px'}>
            Shoppingify
          </Text>{' '}
          allows you take your shopping list wherever you go
        </Title>

        <Search filter={filter} setFilter={setFilter} />
      </Flex>

      {noResults ? (
        <Empty title="No results found" />
      ) : (
        <CategoryGrid filteredItems={filteredItems} />
      )}
    </Flex>
  );
};

export default Home;
