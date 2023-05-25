'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button, Flex, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';

import { ListFormValues } from '@types';
import notificationsContent from '@content/notifications';
import inputProps from '@common/input.props';

const schema = Yup.object().shape({
  title: Yup.string().min(2, 'List name should have at least 2 characters'),
});

const ListCreate = () => {
  const router = useRouter();

  const { getInputProps, reset, onSubmit } = useForm<ListFormValues>({
    validate: yupResolver(schema),
    initialValues: {
      title: '',
    },
    transformValues: (values) => ({
      title: values.title.trim(),
    }),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = useCallback(
    (values: ListFormValues) => {
      setIsSubmitting(true);
      axios
        .post('/api/lists', values)
        .then(() => {
          notifications.show(notificationsContent.listCreate);
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
    [reset, router]
  );

  return (
    <Flex w="100%" bg="white" justify="center">
      <Flex p={{ base: 18, sm: 35 }} align="start" w="100%">
        <TextInput
          required
          disabled={isSubmitting}
          placeholder="Enter a name"
          {...getInputProps('title')}
          {...inputProps('cyan', 3, true)}
          sx={{ flexGrow: 1 }}
        />
        <Button
          type="submit"
          color="cyan.3"
          sx={{ marginLeft: -20 }}
          onClick={() => onSubmit(handleCreate)()}
          disabled={isSubmitting}
        >
          Create List
        </Button>
      </Flex>
    </Flex>
  );
};

export default ListCreate;
