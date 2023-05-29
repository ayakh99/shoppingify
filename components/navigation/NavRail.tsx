'use client';

import { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ActionIcon, Flex, Indicator, NavLink, Stack } from '@mantine/core';
import {
  FormatListBulletedRounded,
  InsertChartOutlinedRounded,
  ReplayRounded,
  ShoppingCartOutlined,
} from '@mui/icons-material';

import useListDrawer from '@/hooks/useListDrawer';
import useItemDrawer from '@hooks/useItemDrawer';

import Tooltip from '../Tooltip';
import UserMenu from './UserMenu';

interface NavRailProps {
  pendingListItems: number;
}

const NavRail: React.FC<NavRailProps> = ({ pendingListItems }) => {
  const { isOpen, onOpen, onClose } = useListDrawer();
  const { onClose: closeItemDrawer } = useItemDrawer();
  const router = useRouter();
  const path = usePathname();

  const onToggle = useCallback(() => {
    if (isOpen) {
      closeItemDrawer();
      return onClose();
    }
    return onOpen();
  }, [isOpen, onOpen, onClose, closeItemDrawer]);

  const navigate = useCallback(
    (href: string) => {
      router.push(href);
    },
    [router]
  );

  const navLinks = [
    {
      label: 'items',
      icon: FormatListBulletedRounded,
      href: '/home',
    },
    {
      label: 'history',
      icon: ReplayRounded,
      href: '/history',
    },
    {
      label: 'statistics',
      icon: InsertChartOutlinedRounded,
      href: '/statistics',
    },
  ];

  return (
    <Stack justify="space-between" align="center" py={{ base: 26, md: 34 }} mih="100%" spacing={50}>
      <UserMenu />

      <Flex direction="column" gap={45}>
        {navLinks.map(({ label, icon: Icon, href }, index) => (
          <Tooltip key={index} label={label} position="right">
            <NavLink
              active={href === path || path.includes(href)}
              onClick={() => navigate(href)}
              icon={<Icon fontSize="medium" />}
              styles={(theme) => ({
                root: {
                  justifyContent: 'center',
                  height: 46,
                  borderRadius: 12,
                  color: theme.colors.gray[6],

                  '&[data-active]': {
                    position: 'relative',
                    backgroundColor: 'transparent',
                    color: theme.colors.gray[6],

                    '&:hover': {
                      backgroundColor: theme.colors.gray[0],
                    },

                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      width: 6,
                      height: '100%',
                      backgroundColor: theme.colors.orange[4],
                      borderStartEndRadius: 4,
                      borderEndEndRadius: 4,
                      left: -23,

                      [theme.fn.smallerThan('md')]: {
                        left: -7,
                      },
                    },
                  },
                },
                icon: {
                  marginRight: 0,
                },
                body: {
                  display: 'none',
                },
              })}
            />
          </Tooltip>
        ))}
      </Flex>

      <Tooltip label="shopping list" position="right">
        <Indicator
          label={pendingListItems}
          color="red.3"
          size={20}
          fw={500}
          radius="sm"
          position="top-end"
          styles={() => ({
            common: {
              top: 6,
              right: 6,
              display: pendingListItems ? 'flex' : 'none',
            },
          })}
        >
          <ActionIcon onClick={onToggle} variant="filled" color="orange.4" size={42} radius="xl">
            <ShoppingCartOutlined sx={{ color: 'white', width: 21 }} />
          </ActionIcon>
        </Indicator>
      </Tooltip>
    </Stack>
  );
};

export default NavRail;
