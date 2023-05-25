'use client';

import { useCallback, useMemo } from 'react';
import Image from 'next/image';
import {
  ActionIcon,
  Autocomplete,
  Box,
  Button,
  Flex,
  Loader,
  Stack,
  Text,
  TextInput,
  Textarea,
  useMantineTheme,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { UseFormReturnType } from '@mantine/form';
import { CloseRounded, FileUploadRounded } from '@mui/icons-material';

import { Category } from '@prisma/client';
import { ItemFormValues } from '@types';

import { categoryModalProps, uploadModalProps } from '@/common/modals.props';
import inputProps from '@/common/input.props';
import useCategories from '@hooks/useCategories';

import CategoryForm from '../categories/CategoryForm';
import ImageUpload from '@components/ImageUpload';
import Tooltip from '@components/Tooltip';

interface ItemFormProps {
  disabled: boolean;
  formContext: () => UseFormReturnType<ItemFormValues, (values: ItemFormValues) => ItemFormValues>;
}

const ItemForm: React.FC<ItemFormProps> = ({ disabled, formContext }) => {
  const theme = useMantineTheme();
  const { getInputProps, setFieldValue, values } = formContext();
  const { data, isLoading, error, mutate } = useCategories();

  const openCategoryModal = useCallback(() => {
    modals.open({
      ...categoryModalProps,
      children: <CategoryForm refreshCategories={mutate} />,
    });
  }, [mutate]);

  const onImageChange = useCallback(
    (url: string) => {
      setFieldValue('image', url);
    },
    [setFieldValue]
  );

  const onImageClear = useCallback(() => {
    setFieldValue('image', '');
  }, [setFieldValue]);

  const openUploadModal = useCallback(() => {
    modals.open({
      ...uploadModalProps,
      children: <ImageUpload onChange={onImageChange} />,
    });
  }, [onImageChange]);

  const categoryData = useMemo(() => {
    if (isLoading || error) {
      return [];
    }
    if (data) {
      return data.map((category: Category) => ({ value: category.title, id: category.id }));
    }
  }, [data, error, isLoading]);

  const onCategoryClear = useCallback(() => {
    setFieldValue('category', '');
    setFieldValue('categoryId', '');
  }, [setFieldValue]);

  const nothingFoundContent = (
    <Text span size="sm" fw={500}>
      No categories found.{' '}
      <Text span color="gray.9" sx={{ cursor: 'pointer' }} onClick={openCategoryModal}>
        Add new category?
      </Text>
    </Text>
  );

  const rightSectionContent = isLoading ? (
    <Loader size="sm" color="orange.4" />
  ) : (
    <CloseRounded
      onClick={onCategoryClear}
      sx={{ cursor: 'pointer', fontSize: 20, color: theme.colors.gray[5] }}
    />
  );

  return (
    <form>
      <Stack spacing={20}>
        <TextInput
          type="text"
          withAsterisk={false}
          label="Name"
          placeholder="Enter a name"
          disabled={disabled}
          {...inputProps('gray', 4)}
          {...getInputProps('name')}
        />

        <Textarea
          minRows={5}
          maxRows={5}
          label="Note (optional)"
          placeholder="Enter a note"
          disabled={disabled}
          {...inputProps('gray', 4)}
          {...getInputProps('note')}
        />

        <Stack spacing={3}>
          <Flex align="center" justify="space-between">
            <label style={{ color: '#0b0b15', fontSize: 14, fontWeight: 500 }}>
              Image (optional)
            </label>
            {values.image && (
              <Tooltip position="top-end" label="Clear image">
                <ActionIcon onClick={onImageClear}>
                  <CloseRounded
                    sx={{
                      position: 'absolute',
                      cursor: 'pointer',
                      fontSize: 20,
                      color: theme.colors.red[3],
                    }}
                  />
                </ActionIcon>
              </Tooltip>
            )}
          </Flex>
          {values.image ? (
            <Box
              h={220}
              pos="relative"
              sx={{
                borderRadius: 12,
                overflow: 'hidden',
              }}
            >
              <Image src={values.image} alt="Uploaded image" fill style={{ objectFit: 'cover' }} />
            </Box>
          ) : (
            <Button
              color="cyan.3"
              leftIcon={<FileUploadRounded fontSize="small" />}
              onClick={openUploadModal}
            >
              Upload an image
            </Button>
          )}
        </Stack>

        <Autocomplete
          withAsterisk={false}
          data={categoryData}
          maxDropdownHeight={168}
          rightSectionProps={{ style: { right: 4 } }}
          rightSection={rightSectionContent}
          nothingFound={nothingFoundContent}
          onItemSubmit={(item) => setFieldValue('categoryId', item.id)}
          label="Category"
          placeholder="Enter a category"
          disabled={disabled || isLoading}
          {...inputProps('gray', 4)}
          {...getInputProps('category')}
        />
      </Stack>
    </form>
  );
};

export default ItemForm;
