'use client';

import { useCallback } from 'react';
import { Box, Button, Flex, Text, clsx } from '@mantine/core';

import { ListItem } from '@types';
import useItemButtonStyles from '@common/itemButton.styles';

import useInfoDrawer from '@hooks/useInfoDrawer';

interface ListItemButtonProps {
  item: ListItem;
}

const ListItemButton: React.FC<ListItemButtonProps> = ({ item }) => {
  const { classes } = useItemButtonStyles(true)();
  const { onOpen, setItemId } = useInfoDrawer();

  const onView = useCallback(() => {
    onOpen();
    setItemId(item.id.$oid);
  }, [onOpen, setItemId, item.id.$oid]);

  return (
    <Flex className={classes.wrapper}>
      <Button className={clsx(classes.button, classes.infoButton)} onClick={onView}>
        {item.name}
      </Button>
      <Box className={clsx(classes.button, classes.pieces)}>
        <Flex w="100%" justify="center" px={2}>
          <Text fz={12} fw={700} color="orange.4">
            {item.amount} pcs
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ListItemButton;
