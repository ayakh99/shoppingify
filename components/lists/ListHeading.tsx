'use client';

import { EditRounded } from '@mui/icons-material';
import { ActionIcon, Flex, Title } from '@mantine/core';

import useListDrawer from '@hooks/useListDrawer';

import Tooltip from '../Tooltip';

const ListHeading = () => {
  const { listTitle, isEmpty, isEditing, setIsEditing } = useListDrawer();

  return (
    <Flex
      mt={{ base: 32, sm: 44 }}
      mb={isEmpty ? 0 : 50}
      px={{ base: 16, sm: 20 }}
      align="center"
      justify="space-between"
      gap={5}
    >
      <Title fz={24} fw={700} color="gray.7">
        {listTitle}
      </Title>

      {!isEditing && (
        <Tooltip label="Edit" position="top">
          <ActionIcon
            radius={4}
            color="gray.7"
            sx={{
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
            onClick={() => setIsEditing(true)}
          >
            <EditRounded fontSize="small" />
          </ActionIcon>
        </Tooltip>
      )}
    </Flex>
  );
};

export default ListHeading;
