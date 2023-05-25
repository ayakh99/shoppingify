'use client';

import { Drawer } from '@mantine/core';

import useInfoDrawer from '@/hooks/useInfoDrawer';
import drawerProps from '@common/drawer.props';

import ItemView from '@components/items/ItemView';

const InfoDrawer = () => {
  const { isOpen, onClose } = useInfoDrawer();

  return (
    <Drawer
      opened={isOpen}
      onClose={onClose}
      keepMounted={false}
      trapFocus={false}
      position="right"
      {...drawerProps(300)}
    >
      <ItemView />
    </Drawer>
  );
};

export default InfoDrawer;
