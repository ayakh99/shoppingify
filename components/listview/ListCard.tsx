'use client';

import { ActionIcon, Badge, Flex, Text, ThemeIcon, useMantineTheme } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { ChevronRightRounded, EventNoteRounded } from '@mui/icons-material';
import { format } from 'date-fns';

import { ListByDate } from '@types';

interface ListCardProps {
  list: ListByDate;
}

const ListCard: React.FC<ListCardProps> = ({ list }) => {
  const theme = useMantineTheme();
  const router = useRouter();

  return (
    <Flex
      p={20}
      align="center"
      justify="space-between"
      gap={10}
      bg="white"
      sx={{ borderRadius: 12, boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.05)', cursor: 'pointer' }}
      onClick={() => router.push(`/history/${list._id.$oid}`)}
    >
      <Text fz={16} fw={500} color="black">
        {list.title}
      </Text>

      <Flex align="center" justify="space-between" gap={10}>
        <Flex align="center" gap={8} miw={{ base: 0, sm: 122 }}>
          <ThemeIcon color="transparent" display={{ base: 'none', sm: 'inline-block' }}>
            <EventNoteRounded sx={{ color: theme.colors.gray[3] }} />
          </ThemeIcon>
          <Text fz={12} fw={500} color="gray.3">
            {format(new Date(list.createdAt.$date), 'E d.M.yyyy')}
          </Text>
        </Flex>

        <Flex align="center" justify="center" miw={{ base: 0, sm: 80 }}>
          <Badge
            variant="outline"
            radius={8}
            sx={{ textTransform: 'lowercase' }}
            color={
              list.status === 'active' ? 'green.4' : list.status === 'complete' ? 'cyan.3' : 'red.3'
            }
          >
            {list.status}
          </Badge>
        </Flex>

        <ActionIcon color="orange.4">
          <ChevronRightRounded />
        </ActionIcon>
      </Flex>
    </Flex>
  );
};

export default ListCard;
