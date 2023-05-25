'use client';

import { FormEvent, useCallback, useState } from 'react';
import { KeyedMutator } from 'swr';
import axios from 'axios';
import { Button, Flex, Stack, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';

import inputProps from '@common/input.props';
import notificationsContent from '@content/notifications';

interface CategoryFormProps {
  refreshCategories: KeyedMutator<any>;
}

interface FormValues {
  title: string;
}

const schema = Yup.object().shape({
  title: Yup.string().min(2, 'Title should have at least 2 characters'),
});

const CategoryForm: React.FC<CategoryFormProps> = ({ refreshCategories }) => {
  const { getInputProps, onSubmit } = useForm<FormValues>({
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
    (values: FormValues, event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitting(true);

      axios
        .post('/api/categories', values)
        .then(() => {
          notifications.show(notificationsContent.categoryCreate);
          modals.closeAll();
          refreshCategories();
        })
        .catch(() => {
          notifications.show(notificationsContent.error);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [refreshCategories]
  );

  return (
    <form onSubmit={onSubmit(handleCreate)}>
      <Stack spacing={20}>
        <TextInput
          type="text"
          label="Title"
          placeholder="Enter a category title"
          disabled={isSubmitting}
          {...inputProps('gray', 4)}
          {...getInputProps('title')}
        />

        <Flex align="center" gap={8} mt={10} sx={{ alignSelf: 'end' }}>
          <Button
            variant="subtle"
            color="gray.7"
            onClick={() => modals.closeAll()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>

          <Button type="submit" color="orange.4" disabled={isSubmitting}>
            Save
          </Button>
        </Flex>
      </Stack>
    </form>
  );
};

export default CategoryForm;
