'use client';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ActionIcon, Button, Flex, Menu, Text, Title, useMantineTheme } from '@mantine/core';
import { ArrowRightAlt, EventNoteRounded, TuneRounded } from '@mui/icons-material';
import { modals } from '@mantine/modals';
import { format } from 'date-fns';

import { ListItems, SafeList } from '@types';
import { listConfirmModalProps } from '@common/modals.props';
import useListDrawer from '@hooks/useListDrawer';

import Tooltip from '@components/Tooltip';
import ListConfirm from '@components/lists/ListConfirm';
import ListCategoriesGrid from '@components/listview/ListCategoriesGrid';

interface ListProps {
  list: SafeList;
  listItems: ListItems;
}

const List: React.FC<ListProps> = ({ list, listItems }) => {
  const theme = useMantineTheme();
  const router = useRouter();
  const { isMultipleActive } = useListDrawer();

  const actions = useMemo(() => {
    let options: Array<any> = [];

    if (isMultipleActive) {
      options = [
        {
          label: 'Edit',
          status: 'active',
          color: 'green.4',
          title: 'Are you sure you want to edit this list instead?',
        },
      ];
    }
    if (list.status === 'active') {
      options = [
        ...options,
        {
          label: 'Complete',
          status: 'complete',
          color: 'cyan.3',
          title: 'Are you sure you want to mark this list as complete?',
        },
        {
          label: 'Cancel',
          status: 'cancelled',
          color: 'red.3',
          title: 'Are you sure you want to cancel this list?',
        },
      ];
    }
    if (list.status === 'complete' || list.status === 'cancelled') {
      options = [
        {
          label: 'Reactivate',
          status: 'active',
          color: 'green.4',
          title: 'Are you sure you want to reactivate this list?',
        },
      ];
    }

    return options;
  }, [list.status, isMultipleActive]);

  const openModal = useCallback(
    (title: string, status: 'cancelled' | 'complete' | 'active', id: string) => {
      modals.open({
        ...listConfirmModalProps(title),
        children: <ListConfirm status={status} listId={id} />,
      });
    },
    []
  );

  return (
    <Flex direction="column" gap={35}>
      <Button
        variant="subtle"
        color="orange.4"
        leftIcon={<ArrowRightAlt fontSize="small" sx={{ rotate: '180deg' }} />}
        onClick={() => router.push('/history')}
        py={5}
        px={10}
        h="initial"
        mih="initial"
        sx={{ alignSelf: 'start', fontSize: 14, fontWeight: 700, borderRadius: 4 }}
      >
        back
      </Button>

      <Flex direction="column" gap={20}>
        <Flex align="center" justify="space-between">
          <Title fz={26} fw={700} maw={450} lh={'24px'} color="gray.7">
            {list.title}
          </Title>

          <Menu position="bottom-end" shadow="sm">
            <Tooltip label="options" position="top">
              <Menu.Target>
                <ActionIcon color="orange.4">
                  <TuneRounded />
                </ActionIcon>
              </Menu.Target>
            </Tooltip>

            <Menu.Dropdown sx={{ border: 'none', borderRadius: 12, padding: 8 }}>
              <Menu.Label>List actions</Menu.Label>
              {actions?.map((action: any, index) => (
                <Menu.Item
                  sx={{ borderRadius: 12 }}
                  color={action.color}
                  fw={600}
                  key={index}
                  onClick={() => openModal(action.title, action.status, list.id)}
                >
                  {action.label} list
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </Flex>

        <Flex align="center" gap={8}>
          <EventNoteRounded sx={{ color: theme.colors.gray[3] }} />

          <Text fz={12} fw={500} color="gray.3">
            {format(new Date(list.createdAt), 'E d.M.yyyy')}
          </Text>
        </Flex>
      </Flex>

      <ListCategoriesGrid listItems={listItems} />
    </Flex>
  );
};

export default List;
