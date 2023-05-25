'use client';

import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import axios from 'axios';
import { Button, Divider, Stack, Text, TextInput, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';

import { SafeUser } from '@types';
import inputProps from '@common/input.props';
import notificationsContent from '@content/notifications';
import { modals } from '@mantine/modals';
import { userDeleteModalProps } from '@common/modals.props';
import UserDelete from './UserDelete';

interface UserEditProps {
  user: SafeUser;
  setMounted: Dispatch<SetStateAction<boolean>>;
}

interface GeneralValues {
  name: string;
  email: string;
}

interface PasswordValues {
  currentpassword: string;
  newpassword: string;
}

const generalSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Name should have at least 2 characters'),
  email: Yup.string().required('Email is required').email('Invalid email'),
});

const passwordSchema = Yup.object().shape({
  currentpassword: Yup.string().required('Current password is required'),
  newpassword: Yup.string().min(6, 'New password should have at least 6 characters'),
});

const UserEdit: React.FC<UserEditProps> = ({ user, setMounted }) => {
  const {
    setValues: setGeneralValues,
    getInputProps: getGeneralInputprops,
    onSubmit: onSubmitGeneral,
  } = useForm<GeneralValues>({
    validate: yupResolver(generalSchema),
    transformValues: (values) => ({
      name: values.name.trim(),
      email: values.email.trim(),
    }),
  });

  const {
    setValues: setPasswordValues,
    getInputProps: getPasswordInputprops,
    onSubmit: onSubmitPassword,
    setErrors,
  } = useForm<PasswordValues>({
    initialValues: {
      currentpassword: '',
      newpassword: '',
    },
    validate: yupResolver(passwordSchema),
  });

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setGeneralValues({
        name: user.name || '',
        email: user.email || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  const handleGeneralUpdate = useCallback(
    (values: GeneralValues) => {
      if (values.name === user.name && values.email === user.email) {
        setMounted(false);
        return;
      }

      setIsSubmitting(true);
      axios
        .patch(`/api/users/${user.id}`, values)
        .then(() => {
          if (values.email !== user.email) {
            notifications.show(notificationsContent.userUpdateSignin);
            signOut({ callbackUrl: `${window.location.origin}/signin` });
          } else {
            notifications.show(notificationsContent.userUpdate);
            setMounted(false);
          }
          router.refresh();
        })
        .catch(() => {
          notifications.show(notificationsContent.error);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [setMounted, user.email, user.id, user.name, router]
  );

  const handlePasswordUpdate = useCallback(
    (values: PasswordValues) => {
      setIsSubmitting(true);
      axios
        .patch(`/api/users/${user.id}`, values)
        .then((res) => {
          if (res.data.error) {
            setErrors({
              currentpassword: 'The password you entered does not match your current password',
            });
            return;
          }
          notifications.show(notificationsContent.userUpdateSignin);
          signOut({ callbackUrl: `${window.location.origin}/signin` });
          router.refresh();
        })
        .catch(() => {
          notifications.show(notificationsContent.error);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [user.id, router, setErrors]
  );

  const openModal = useCallback(() => {
    modals.open({ ...userDeleteModalProps, children: <UserDelete userId={user.id} /> });
  }, [user.id]);

  return (
    <form>
      <Stack spacing={30}>
        <Stack spacing={10}>
          <Title fz={24} fw={600}>
            General
          </Title>

          <Stack spacing={20}>
            <TextInput
              type="text"
              required
              withAsterisk={false}
              label="Name"
              placeholder="Enter a name"
              disabled={isSubmitting}
              {...inputProps('orange', 4)}
              {...getGeneralInputprops('name')}
            />
            {user.hashedPassword && (
              <TextInput
                type="email"
                required
                withAsterisk={false}
                label="Email"
                placeholder="Enter an email"
                disabled={isSubmitting}
                {...inputProps('orange', 4)}
                {...getGeneralInputprops('email')}
              />
            )}
            <Button
              color="orange.4"
              disabled={isSubmitting}
              onClick={() => onSubmitGeneral(handleGeneralUpdate)()}
            >
              Save changes
            </Button>
          </Stack>
        </Stack>

        {user.hashedPassword && (
          <>
            <Divider color="gray.3" />
            <Stack spacing={10}>
              <Title fz={24} fw={600}>
                Change password
              </Title>
              <Stack spacing={20}>
                <TextInput
                  type="password"
                  required
                  withAsterisk={false}
                  label="Current Password"
                  placeholder="Enter your current password"
                  disabled={isSubmitting}
                  {...inputProps('orange', 4)}
                  {...getPasswordInputprops('currentpassword')}
                />
                <TextInput
                  type="password"
                  required
                  withAsterisk={false}
                  label="New Password"
                  placeholder="Enter a new password"
                  disabled={isSubmitting}
                  {...inputProps('orange', 4)}
                  {...getPasswordInputprops('newpassword')}
                />
                <Button
                  color="orange.4"
                  disabled={isSubmitting}
                  onClick={() => onSubmitPassword(handlePasswordUpdate)()}
                >
                  Update password
                </Button>
              </Stack>
            </Stack>
          </>
        )}

        <Divider color="gray.3" />
        <Stack spacing={10}>
          <Title fz={24} fw={600}>
            Delete account
          </Title>
          <Text fz={14} fw={500} color="gray.7">
            Once you delete your account, all your data will be gone forever. This action cannot be
            undone.
          </Text>
          <Button mt={10} color="red.3" disabled={isSubmitting} onClick={openModal}>
            Delete your account
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default UserEdit;
