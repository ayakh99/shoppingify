'use client';

import { useEffect } from 'react';
import { AppShell, AppShellProps, Navbar, Aside, Box } from '@mantine/core';

import { ListItems, SafeList } from '@types';
import useListDrawer from '@hooks/useListDrawer';

import NavRail from '../navigation/NavRail';
import ListDrawer from './ListDrawer';
import ItemDrawer from './ItemDrawer';
import InfoDrawer from './InfoDrawer';

interface ShellProps {
  activeList: SafeList;
  activeListItems: ListItems;
  multipleActiveLists: boolean;
  pendingListItems: number;
}

const Shell: React.FC<AppShellProps & ShellProps> = ({
  children,
  activeList,
  activeListItems,
  multipleActiveLists,
  pendingListItems,
}) => {
  const { setListId, setListTitle, setListItems, setEmpty, setIsMultipleActive } = useListDrawer();

  useEffect(() => {
    setListId(activeList?.id ?? '');
    setListTitle(activeList?.title ?? '');
    setEmpty(activeListItems.length === 0);
    setListItems(activeListItems);
    setIsMultipleActive(multipleActiveLists);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeList?.id, activeList?.title, activeListItems]);

  return (
    <AppShell
      asideOffsetBreakpoint="md"
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.gray[0],
        },
      })}
      navbar={
        <Navbar
          fixed
          width={{ base: 62, md: 94 }}
          miw={62}
          styles={() => ({
            root: {
              border: 'none',
            },
          })}
        >
          <NavRail pendingListItems={pendingListItems} />
        </Navbar>
      }
      aside={
        <Aside
          p="md"
          display={{ base: 'none', md: 'block' }}
          width={{ md: 380 }}
          bg="gray.0"
          styles={(theme) => ({
            root: {
              border: 'none',
              backgroundColor: theme.colors.gray[0],
            },
          })}
        >
          &nbsp;
        </Aside>
      }
    >
      <ListDrawer />
      <ItemDrawer />
      <InfoDrawer />
      <Box maw={886} py={37.5} px={{ base: 12, md: 40 }} mx="auto">
        {children}
      </Box>
    </AppShell>
  );
};

export default Shell;
