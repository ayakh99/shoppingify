'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  Title,
  Transition,
  useMantineTheme,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { ArrowRightAlt, CloseRounded, EditRounded, FileUploadRounded } from '@mui/icons-material';

import { SafeUser } from '@types';
import { uploadModalProps } from '@common/modals.props';
import notificationsContent from '@content/notifications';

import Tooltip from '@components/Tooltip';
import UserEdit from '@components/account/UserEdit';
import UserInfo from '@components/account/UserInfo';
import ImageUpload from '@components/ImageUpload';

interface AccountProps {
  user: SafeUser;
}

const Account: React.FC<AccountProps> = ({ user }) => {
  const theme = useMantineTheme();
  const router = useRouter();
  const [isInfoMounted, setIsInfoMounted] = useState(true);
  const [isFormMounted, setIsFormMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onImageChange = useCallback(
    (url: string) => {
      setIsSubmitting(true);
      axios
        .patch(`/api/users/${user.id}`, { image: url })
        .then(() => {
          router.refresh();
        })
        .catch(() => {
          notifications.show(notificationsContent.error);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [router, user.id]
  );

  const openUploadModal = useCallback(() => {
    modals.open({
      ...uploadModalProps,
      children: <ImageUpload onChange={onImageChange} />,
    });
  }, [onImageChange]);

  return (
    <Flex direction="column" gap={35}>
      <Button
        variant="subtle"
        color="orange.4"
        leftIcon={<ArrowRightAlt fontSize="small" sx={{ rotate: '180deg' }} />}
        onClick={() => router.back()}
        py={5}
        px={10}
        h="initial"
        mih="initial"
        sx={{ alignSelf: 'start', fontSize: 14, fontWeight: 700, borderRadius: 4 }}
        disabled={isSubmitting}
      >
        back
      </Button>

      <Flex direction="column" gap={64}>
        <Flex align="center" gap={20}>
          <Menu position="bottom-start" shadow="sm" disabled={isSubmitting}>
            <Menu.Target>
              <Avatar
                w={72}
                h={72}
                src={user.image}
                alt="User image"
                radius="100%"
                sx={{ cursor: isSubmitting ? 'wait' : 'pointer', flexShrink: 0 }}
              />
            </Menu.Target>

            <Menu.Dropdown sx={{ border: 'none', borderRadius: 12, padding: 8 }}>
              <Menu.Item
                sx={{ borderRadius: 12 }}
                fw={600}
                icon={
                  <FileUploadRounded htmlColor={theme.colors.orange[4]} sx={{ fontSize: '18px' }} />
                }
                onClick={openUploadModal}
              >
                Upload image
              </Menu.Item>

              {user.image && (
                <Menu.Item
                  sx={{ borderRadius: 12 }}
                  fw={600}
                  icon={<CloseRounded htmlColor={theme.colors.red[3]} sx={{ fontSize: '18px' }} />}
                  onClick={() => onImageChange('')}
                >
                  Remove image
                </Menu.Item>
              )}
            </Menu.Dropdown>
          </Menu>

          <Title fz={24} fw={700} maw={450} lh={'24px'} color="gray.7">
            {user.name}
          </Title>

          <Box ml="auto">
            {isInfoMounted ? (
              <Tooltip label="Edit" position="top">
                <ActionIcon
                  radius={4}
                  color="orange.4"
                  disabled={isSubmitting}
                  onClick={() => setIsInfoMounted(false)}
                >
                  <EditRounded fontSize="small" />
                </ActionIcon>
              </Tooltip>
            ) : (
              <Tooltip label="Cancel" position="top">
                <ActionIcon
                  radius={4}
                  color="orange.4"
                  disabled={isSubmitting}
                  onClick={() => setIsFormMounted(false)}
                >
                  <CloseRounded fontSize="small" />
                </ActionIcon>
              </Tooltip>
            )}
          </Box>
        </Flex>

        <Transition
          mounted={isInfoMounted}
          onExited={() => setIsFormMounted(true)}
          transition="slide-right"
          duration={400}
        >
          {(styles) => (
            <Box style={{ ...styles }}>
              <UserInfo user={user} />
            </Box>
          )}
        </Transition>

        <Transition
          mounted={isFormMounted}
          onExited={() => setIsInfoMounted(true)}
          transition="slide-right"
          duration={400}
        >
          {(styles) => (
            <Box maw={512} mx="auto" style={{ ...styles }}>
              <UserEdit user={user} setMounted={setIsFormMounted} />
            </Box>
          )}
        </Transition>
      </Flex>
    </Flex>
  );
};

export default Account;
