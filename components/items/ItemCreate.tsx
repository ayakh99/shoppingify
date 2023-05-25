'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Box, Button, Flex, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { createFormContext, yupResolver } from '@mantine/form';
import * as Yup from 'yup';

import useItemDrawer from '@hooks/useItemDrawer';

import { ItemFormValues } from '@types';
import notificationsContent from '@content/notifications';
import ItemForm from './ItemForm';

const schema = Yup.object().shape({
  name: Yup.string().min(2, 'Item name should have at least 2 characters'),
  category: Yup.string().required('Item must have a category'),
});

export const [ItemCreateProvider, useItemCreateContext, useItemCreate] =
  createFormContext<ItemFormValues>();

const ItemCreate = () => {
  const router = useRouter();
  const { onClose } = useItemDrawer();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useItemCreate({
    validate: yupResolver(schema),
    initialValues: {
      name: '',
      note: '',
      image: '',
      category: '',
      categoryId: '',
    },
    transformValues: (values) => ({
      ...values,
      name: values.name.trim(),
    }),
  });

  const handleCreate = useCallback(
    (values: ItemFormValues) => {
      setIsSubmitting(true);

      axios
        .post('/api/items', values)
        .then(() => {
          notifications.show({ ...notificationsContent.itemCreate });
          form.reset();
          onClose();
          router.refresh();
        })
        .catch(() => {
          notifications.show(notificationsContent.error);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [form, onClose, router]
  );

  return (
    <Flex
      direction="column"
      justify="space-between"
      w="100%"
      h="100%"
      bg="gray.0"
      p={{ base: '24px 8px', sm: '35px 20px' }}
    >
      <Box h="100%" mah="100%" px={{ base: 16, sm: 20 }} sx={{ overflowY: 'scroll' }}>
        <Title fz={24} fw={500} mb={32}>
          Add a new Item
        </Title>

        <ItemCreateProvider form={form}>
          <ItemForm disabled={isSubmitting} formContext={useItemCreateContext} />
        </ItemCreateProvider>
      </Box>

      <Flex pt={{ base: 18, sm: 35 }} align="center" gap={10} sx={{ alignSelf: 'center' }}>
        <Button variant="subtle" color="gray.7" onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>

        <Button
          type="submit"
          color="orange.4"
          onClick={() => form.onSubmit(handleCreate)()}
          disabled={isSubmitting}
        >
          Save
        </Button>
      </Flex>
    </Flex>
  );
};

export default ItemCreate;
