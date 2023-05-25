'use client';

import { Drawer } from '@mantine/core';

import useItemDrawer from '@/hooks/useItemDrawer';
import drawerProps from '@common/drawer.props';

import ItemCreate from '@components/items/ItemCreate';

const ItemDrawer = () => {
  const { isOpen, onClose } = useItemDrawer();

  return (
    <Drawer
      opened={isOpen}
      onClose={onClose}
      keepMounted={true}
      position="right"
      {...drawerProps(300)}
    >
      <ItemCreate />
    </Drawer>
  );
};

export default ItemDrawer;
