'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button, clsx } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { AddRounded } from '@mui/icons-material';

import { UserItem } from '@types';
import useItemButtonStyles from '@common/itemButton.styles';
import notificationsContent from '@content/notifications';
import useInfoDrawer from '@hooks/useInfoDrawer';
import useListDrawer from '@hooks/useListDrawer';

interface ItemButtonProps {
  item: UserItem;
}

const ItemButtonGroup: React.FC<ItemButtonProps> = ({ item }) => {
  const { classes } = useItemButtonStyles()();
  const { onOpen, onClose, setItemId } = useInfoDrawer();
  const { listId, onOpen: openListDrawer, listItems } = useListDrawer();

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onView = useCallback(() => {
    onOpen();
    setItemId(item.id);
  }, [onOpen, setItemId, item.id]);

  const toggleList = useCallback(() => {
    onClose();
    openListDrawer();
  }, [onClose, openListDrawer]);

  const handleAdd = useCallback(() => {
    if (!listId) {
      notifications.show(notificationsContent.noActiveListsError);
      toggleList();
      return;
    }

    const itemAlreadyExists = listItems.map((category) =>
      category.items.filter((listItem) => listItem.id.$oid === item.id)
    );

    if (itemAlreadyExists.flat().length > 0) {
      notifications.show(notificationsContent.itemAlreadyExistsError);
      toggleList();
      return;
    }

    setIsSubmitting(true);
    axios
      .post(`/api/listitems/${listId}/${item.id}`)
      .then(() => {
        toggleList();
        router.refresh();
      })
      .catch(() => {
        notifications.show(notificationsContent.error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, [item.id, listId, listItems, toggleList, router]);

  return (
    <Button.Group className={classes.wrapper}>
      <Button
        className={clsx(classes.button, classes.infoButton)}
        onClick={onView}
        disabled={isSubmitting}
      >
        {item.name}
      </Button>
      <Button
        className={clsx(classes.button, classes.addButton)}
        onClick={handleAdd}
        disabled={isSubmitting}
      >
        <AddRounded fontSize="medium" />
      </Button>
    </Button.Group>
  );
};

export default ItemButtonGroup;
