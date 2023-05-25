'use client';

import { Box } from '@mantine/core';

import { ListItem } from '@types';
import useItemGridStyles from '@common/itemGrid.styles';
import ListItemButton from './ListItemButton';

interface ListItemsGridProps {
  items: ListItem[];
}

const ListItemsGrid: React.FC<ListItemsGridProps> = ({ items }) => {
  const { classes } = useItemGridStyles();

  return (
    <Box className={classes.grid}>
      {items.map((item) => (
        <ListItemButton key={item.id.$oid} item={item} />
      ))}
    </Box>
  );
};

export default ListItemsGrid;
