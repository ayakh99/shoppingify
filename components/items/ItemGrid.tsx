'use client';

import { Box } from '@mantine/core';

import { UserItem } from '@types';
import ItemButtonGroup from './ItemButtonGroup';
import useItemGridStyles from '@common/itemGrid.styles';

interface ItemGridProps {
  items: UserItem[];
}

const ItemGrid: React.FC<ItemGridProps> = ({ items }) => {
  const { classes } = useItemGridStyles();

  return (
    <Box className={classes.grid}>
      {items.map((item) => (
        <ItemButtonGroup key={item.id} item={item} />
      ))}
    </Box>
  );
};

export default ItemGrid;
