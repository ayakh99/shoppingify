'use client';

import React, { Dispatch, SetStateAction } from 'react';
import { Flex, TextInput } from '@mantine/core';
import { SearchRounded } from '@mui/icons-material';

interface SearchProps {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = ({ filter, setFilter }) => {
  return (
    <Flex
      align="center"
      bg="white"
      w={{ base: '100%', lg: 'auto' }}
      py={7.5}
      px={20}
      sx={{ borderRadius: 12, boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.04)' }}
    >
      <SearchRounded />
      <TextInput
        type="text"
        placeholder="search items"
        styles={() => ({
          root: {
            flexGrow: 1,
          },
          input: {
            border: 'none',
          },
        })}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    </Flex>
  );
};

export default Search;
