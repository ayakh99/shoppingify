'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button, Flex, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';

import { ListFormValues } from '@types';
import notificationsContent from '@content/notifications';
import inputProps from '@common/input.props';
import useListDrawer from '@hooks/useListDrawer';

const schema = Yup.object().shape({
  title: Yup.string().min(2, 'List name should have at least 2 characters'),
});

interface ListEditProps {
  disabled?: boolean;
}

const ListEdit: React.FC<ListEditProps> = ({ disabled }) => {
  const router = useRouter();
  const { listId, listTitle, setIsEditing, touchedValues, clearTouched } = useListDrawer();
  const { getInputProps, setValues, reset, onSubmit } = useForm<ListFormValues>({
    validate: yupResolver(schema),
    initialValues: {
      title: listTitle,
    },
    transformValues: (values) => ({
      title: values.title.trim(),
    }),
  });

  useEffect(() => {
    setValues({
      title: disabled ? '' : listTitle,
    });
  }, [disabled, listTitle, setValues]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdate = useCallback(
    (values: ListFormValues) => {
      if (values.title === listTitle && Object.keys(touchedValues).length === 0) {
        notifications.show(notificationsContent.listUpdate);
        setIsEditing(false);
        return;
      }

      setIsSubmitting(true);

      axios
        .patch(`/api/lists/${listId}`, { title: values.title, itemsToUpdate: touchedValues })
        .then(() => {
          notifications.show(notificationsContent.listUpdate);
          setIsEditing(false);
          clearTouched();
          reset();
          router.refresh();
        })
        .catch(() => {
          notifications.show(notificationsContent.error);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [reset, router, listId, setIsEditing, listTitle, touchedValues, clearTouched]
  );

  return (
    <Flex w="100%" bg="white" justify="center">
      <Flex p={{ base: 18, sm: 35 }} align="start" w="100%">
        <TextInput
          required
          disabled={isSubmitting || disabled}
          placeholder="Enter a name"
          {...getInputProps('title')}
          {...inputProps('orange', 4, true)}
          sx={{ flexGrow: 1 }}
        />
        <Button
          type="submit"
          disabled={isSubmitting || disabled}
          color="orange.4"
          sx={{ marginLeft: -20 }}
          onClick={() => onSubmit(handleUpdate)()}
        >
          Save
        </Button>
      </Flex>
    </Flex>
  );
};

export default ListEdit;
