'use client';

import { Flex, Progress, Text, Title } from '@mantine/core';
import { TopStats } from '@types';

interface TopStatsProps {
  type: 'items' | 'categories';
  stats: TopStats;
  total: number;
}

const TopStats: React.FC<TopStatsProps> = ({ type, stats, total }) => {
  return (
    <Flex direction="column" gap={{ base: 20, sm: 26 }}>
      <Title fz={{ base: 20, sm: 24 }} fw={500} color="black" mb={{ base: 0, sm: 10 }}>
        Top {type}
      </Title>

      {stats.slice(0, 3).map(({ _id: { name }, totalOccurrences }, index) => (
        <Flex direction="column" gap={8} key={index}>
          <Flex align="center" justify="space-between" pr={{ base: 10, sm: 0 }}>
            <Text fz={14} fw={600}>
              {name}
            </Text>
            <Text fz={18} fw={500}>
              {Math.ceil((totalOccurrences / total) * 100)}%
            </Text>
          </Flex>
          <Progress
            h={6}
            value={(totalOccurrences / total) * 100}
            color={type === 'items' ? 'orange.4' : 'cyan.3'}
          />
        </Flex>
      ))}
    </Flex>
  );
};

export default TopStats;
