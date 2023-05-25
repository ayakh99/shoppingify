'use client';

import { Box, Text } from '@mantine/core';
import Image from 'next/image';

interface EmptyStateProps {
  title: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title }) => {
  return (
    <Box
      display="grid"
      sx={(theme) => ({
        gridTemplateRows: 'repeat(2, 1fr)',
        justifyItems: 'center',
        alignItems: 'end',
        height: title.includes('items') ? 'calc(100% - 62px)' : '100%',

        [theme.fn.smallerThan('sm')]: {
          height: title.includes('items') ? 'calc(100% - 58px)' : '100%',
        },
      })}
    >
      <Text fz={20} fw={700}>
        {title}
      </Text>

      <Box
        pos="relative"
        maw={245}
        w="100%"
        h={208}
        mb={title.includes('items') ? { base: -5, sm: 0 } : { base: -10, sm: -14 }}
        sx={{ zIndex: 10 }}
      >
        <Image src="images/shopping.svg" alt="shopping" fill />
      </Box>
    </Box>
  );
};

export default EmptyState;
