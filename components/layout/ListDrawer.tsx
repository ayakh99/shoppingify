'use client';

import { useState } from 'react';
import { useIsomorphicEffect, useMediaQuery } from '@mantine/hooks';
import { Drawer } from '@mantine/core';

import useListDrawer from '@/hooks/useListDrawer';

import ShoppingList from '../lists/ShoppingList';
import drawerProps from '@common/drawer.props';

const ListDrawer = () => {
  const { isOpen, onOpen, onClose } = useListDrawer();
  const matches = useMediaQuery('(min-width: 62em)');
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useIsomorphicEffect(() => {
    if (matches && isFirstLoad) {
      onOpen();
    }
    if (matches !== undefined) {
      setIsFirstLoad(false);
    }
  });

  return (
    <Drawer
      opened={isOpen}
      onClose={onClose}
      trapFocus={false}
      keepMounted={true}
      position="right"
      {...drawerProps(400)}
    >
      <ShoppingList />
    </Drawer>
  );
};

export default ListDrawer;
