'use client';

import { useCallback, useEffect, useState } from 'react';
import useListDrawer from '@hooks/useListDrawer';
import { ActionIcon, Button, Checkbox, Flex, Text, clsx, createStyles } from '@mantine/core';
import { ListItem } from '@types';
import { useRouter } from 'next/navigation';
import { AddRounded, DeleteOutlineRounded, RemoveRounded } from '@mui/icons-material';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import notificationsContent from '@content/notifications';

interface ListItemProps {
  item: ListItem;
}

const ListItem: React.FC<ListItemProps> = ({ item }) => {
  const { classes } = useStyles();
  const router = useRouter();
  const { listId, isEditing, addTouched, removeTouched } = useListDrawer();
  const [checked, setChecked] = useState(item.status === 'done');
  const [amount, setAmount] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setAmount(item.amount);
  }, [item.amount]);

  useEffect(() => {
    if (!isEditing) {
      setIsUpdating(false);
    }
  }, [isEditing]);

  const onAdd = () => {
    addTouched(item.id.$oid, amount + 1);
    setAmount((prev) => prev + 1);
  };

  const onRemove = () => {
    if (amount > 1) {
      addTouched(item.id.$oid, amount - 1);
      setAmount((prev) => prev - 1);
    }
  };

  const handleUpdate = useCallback(() => {
    setIsSubmitting(true);
    const query = { status: checked ? 'pending' : 'done' };
    setChecked((prev) => !prev);

    axios
      .patch(`/api/listitems/${listId}/${item.id.$oid}`, query)
      .then(() => {
        router.refresh();
      })
      .catch(() => {
        notifications.show(notificationsContent.error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, [item.id.$oid, listId, router, checked]);

  const handleRemove = useCallback(() => {
    setIsSubmitting(true);
    removeTouched(item.id.$oid);

    axios
      .delete(`/api/listitems/${listId}/${item.id.$oid}`)
      .then(() => {
        router.refresh();
      })
      .catch(() => {
        notifications.show(notificationsContent.error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, [item.id.$oid, listId, router, removeTouched]);

  const toggleUpdate = useCallback(() => {
    if (isEditing) {
      setIsUpdating((prev) => !prev);
    }
  }, [isEditing]);

  return (
    <Flex gap={16} align="center">
      {!isEditing && (
        <Checkbox
          color="orange.4"
          styles={(theme) => ({
            input: {
              borderWidth: 2,
              borderRadius: 4,
              borderColor: theme.colors.orange[4],
              backgroundColor: 'transparent',
              cursor: 'pointer',
            },
          })}
          checked={checked}
          onChange={handleUpdate}
        />
      )}
      <Text fz={{ base: 16, sm: 18 }} fw={500} color="black" strikethrough={checked}>
        {item.name}
      </Text>

      <Flex
        ml="auto"
        gap={5}
        className={clsx(isUpdating ? classes.active : undefined, classes.outerWrapper)}
        sx={{ pointerEvents: isSubmitting ? 'none' : 'auto' }}
      >
        {isUpdating && (
          <ActionIcon className={classes.deleteButton} onClick={handleRemove}>
            <DeleteOutlineRounded fontSize="small" />
          </ActionIcon>
        )}
        <Flex className={classes.innerWrapper} align="center" gap={2}>
          {isUpdating && (
            <ActionIcon color="orange.4" onClick={onRemove}>
              <RemoveRounded />
            </ActionIcon>
          )}
          <Button className={classes.chip} onClick={toggleUpdate}>
            {amount} pcs
          </Button>
          {isUpdating && (
            <ActionIcon color="orange.4" onClick={onAdd}>
              <AddRounded />
            </ActionIcon>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ListItem;

const useStyles = createStyles((theme) => ({
  outerWrapper: {
    borderRadius: 12,
    transition: 'width 0.3s',
  },
  active: {
    background: theme.white,
    paddingInline: '0 9px',
  },
  innerWrapper: {
    paddingBlock: '6.45px',
  },
  chip: {
    padding: '0 15px',
    minWidth: 68,
    height: 32,
    minHeight: 'initial',
    borderWidth: 2,
    borderRadius: 24,
    borderColor: theme.colors.orange[4],
    backgroundColor: 'transparent',
    color: theme.colors.orange[4],
    fontSize: 12,
    fontWeight: 700,

    '&:hover': {
      backgroundColor: theme.colors.orange[4],
      color: theme.white,
    },
  },
  deleteButton: {
    borderRadius: 12,
    width: 37,
    height: 44.9,
    backgroundColor: theme.colors.orange[4],
    color: theme.white,

    '&:hover': {
      backgroundColor: theme.colors.orange[4],
      color: theme.white,
    },
  },
}));
