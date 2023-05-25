'use client';

import { useRouter } from 'next/navigation';
import { Box, Flex, Title, createStyles } from '@mantine/core';

import { ChartData, TopStats } from '@types';

import Stats from '@components/statistics/TopStats';
import MonthlySummary from '@components/statistics/MonthlySummary';
import Empty from './Empty';

interface StatisticsProps {
  items: TopStats;
  categories: TopStats;
  total: number;
  chartData: ChartData;
}

const Statistics: React.FC<StatisticsProps> = ({ items, categories, total, chartData }) => {
  const router = useRouter();
  const { classes } = useStyles();

  return (
    <Flex direction="column" gap={{ base: 34, md: 65 }}>
      {items.length > 0 ? (
        <Box className={classes.grid}>
          <Stats type="items" stats={items} total={total} />
          <Stats type="categories" stats={categories} total={total} />
        </Box>
      ) : (
        <Empty
          title="No stats to show"
          description="You haven't used Shoppingify long enough to view your statistics."
          buttonText="Get started"
          onClick={() => router.push('/home')}
        />
      )}
      {items.length > 0 && (
        <Flex direction="column" gap={{ base: 27, sm: 47 }}>
          <Title color="black" fz={{ base: 20, sm: 24 }} fw={500}>
            Monthly Summary
          </Title>

          <MonthlySummary chartData={chartData} />
        </Flex>
      )}
    </Flex>
  );
};

export default Statistics;

const useStyles = createStyles((theme) => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 65,

    [theme.fn.smallerThan('xs')]: {
      gridTemplateColumns: '1fr',
      gap: 34,
    },
  },
}));
