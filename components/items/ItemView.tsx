'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ActionIcon, Box, Button, Flex } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { createFormContext, yupResolver } from '@mantine/form';
import * as Yup from 'yup';
import { ArrowRightAlt, EditRounded } from '@mui/icons-material';

import useListDrawer from '@hooks/useListDrawer';
import useInfoDrawer from '@hooks/useInfoDrawer';
import useItem from '@hooks/useItem';
import { itemDeleteModalProps } from '@common/modals.props';
import notificationsContent from '@content/notifications';

import Tooltip from '../Tooltip';
import ItemInfo from './itemInfo';
import ItemEdit from './itemEdit';
import ItemDelete from './ItemDelete';

export interface FormValues {
  name: string;
  note?: string;
  image?: string;
  category: string;
  categoryId: string;
}

const schema = Yup.object().shape({
  name: Yup.string().min(2, 'Item name should have at least 2 characters'),
  category: Yup.string().required('Category is required'),
});

export const [ItemEditProvider, useItemEditContext, useItemEdit] = createFormContext<FormValues>();

const ItemView = () => {
  const { onClose, itemId } = useInfoDrawer();
  const { listId, onOpen: openListDrawer, listItems } = useListDrawer();
  const { data: item, isLoading, error, mutate } = useItem(itemId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInfoMounted, setIsInfoMounted] = useState(true);
  const [isFormMounted, setIsFormMounted] = useState(false);

  const router = useRouter();

  const form = useItemEdit({
    validate: yupResolver(schema),
    transformValues: (values) => ({
      ...values,
      name: values.name.trim(),
    }),
  });

  useEffect(() => {
    if (item) {
      form.setValues({
        name: item.name,
        note: item.note,
        image: item.image,
        category: item.category?.title,
        categoryId: item.categoryId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  useEffect(() => {
    setIsFormMounted(false);
  }, [itemId]);

  const onBack = useCallback(() => {
    if (isFormMounted) {
      setIsFormMounted(false);
      return;
    }
    onClose();
  }, [isFormMounted, onClose]);

  const openModal = useCallback(() => {
    modals.open({
      ...itemDeleteModalProps,
      children: <ItemDelete />,
    });
  }, []);

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
      category.items.filter((listItem) => listItem.id.$oid === itemId)
    );

    if (itemAlreadyExists.flat().length > 0) {
      notifications.show(notificationsContent.itemAlreadyExistsError);
      toggleList();
      return;
    }

    setIsSubmitting(true);
    axios
      .post(`/api/listitems/${listId}/${itemId}`)
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
  }, [itemId, listId, listItems, toggleList, router]);

  const handleUpdate = useCallback(
    (values: FormValues) => {
      setIsSubmitting(true);

      axios
        .patch(`/api/items/${itemId}`, values)
        .then(() => {
          notifications.show(notificationsContent.itemUpdate);
          setIsFormMounted(false);
          mutate();
          router.refresh();
        })
        .catch(() => {
          notifications.show(notificationsContent.error);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [router, itemId, mutate]
  );

  return (
    <Flex direction="column" w="100%" h="100%" bg="white" p={{ base: '24px 8px', sm: '35px 20px' }}>
      <Flex align="center" justify="space-between">
        <Button
          variant="subtle"
          color="orange.4"
          leftIcon={<ArrowRightAlt fontSize="small" sx={{ rotate: '180deg' }} />}
          onClick={onBack}
          py={5}
          px={10}
          h="initial"
          mih="initial"
          sx={{ alignSelf: 'start', fontSize: 14, fontWeight: 700, borderRadius: 4 }}
          disabled={isSubmitting || isLoading}
        >
          back
        </Button>

        {isInfoMounted && (
          <Tooltip label="Edit" position="top">
            <ActionIcon
              radius={4}
              color="orange.4"
              disabled={isSubmitting || isLoading || error}
              sx={(theme) => ({
                '&:disabled': {
                  backgroundColor: theme.colors.gray[3],
                  color: theme.white,
                },
              })}
              onClick={() => setIsInfoMounted(false)}
            >
              <EditRounded fontSize="small" />
            </ActionIcon>
          </Tooltip>
        )}
      </Flex>

      <Box h="100%" mah="100%" sx={{ overflowY: 'scroll' }} p={{ base: 16, sm: 20 }}>
        <ItemInfo mounted={isInfoMounted} setOppositeMount={setIsFormMounted} />

        <ItemEditProvider form={form}>
          <ItemEdit
            mounted={isFormMounted}
            setOppositeMount={setIsInfoMounted}
            disabled={isSubmitting}
          />
        </ItemEditProvider>
      </Box>

      <Flex pt={{ base: 18, sm: 35 }} align="center" gap={10} sx={{ alignSelf: 'center' }}>
        {isInfoMounted ? (
          <>
            <Button
              variant="subtle"
              color="gray.7"
              onClick={openModal}
              disabled={isSubmitting || isLoading || error}
            >
              delete
            </Button>

            <Button
              color="orange.4"
              onClick={handleAdd}
              disabled={isSubmitting || isLoading || error}
            >
              Add to list
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="subtle"
              color="gray.7"
              onClick={() => setIsFormMounted(false)}
              disabled={isSubmitting || isLoading || error}
            >
              cancel
            </Button>

            <Button
              color="orange.4"
              onClick={() => form.onSubmit(handleUpdate)()}
              disabled={isSubmitting || isLoading || error}
            >
              Save
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default ItemView;
