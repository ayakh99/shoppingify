'use client';

import { FormEvent, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import { Button, Divider, Stack, Text, TextInput, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';
import { Google } from '@mui/icons-material';

import inputProps from '@/common/input.props';
import notificationsContent from '@content/notifications';

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  name: Yup.string().min(2, 'Name should have at least 2 characters'),
  email: Yup.string().required('Email is required').email('Invalid email'),
  password: Yup.string().min(6, 'Password should have at least 6 characters'),
});

const SignupForm = () => {
  const router = useRouter();
  const { getInputProps, onSubmit } = useForm<FormValues>({
    validate: yupResolver(schema),
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onToggle = useCallback(() => {
    router.push('/signin');
  }, [router]);

  const handleSubmit = useCallback(
    (values: FormValues, event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitting(true);

      axios
        .post('/api/users', values)
        .then(() => {
          notifications.show(notificationsContent.signup);
          router.push('/signin');
        })
        .catch(() => {
          notifications.show(notificationsContent.error);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [router]
  );

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Stack spacing={20}>
        <Stack mb={10} spacing={3}>
          <Title fz={26} fw={600} color="gray.7">
            <Text span color="orange.4">
              Welcome
            </Text>{' '}
            to Shoppingify!
          </Title>
          <Text fz={14} fw={500} lh={'18px'} color="gray.6">
            Shoppingify allows you take your shopping list wherever you go.
          </Text>
        </Stack>

        <TextInput
          type="text"
          label="Name"
          placeholder="Enter your name"
          disabled={isSubmitting}
          {...inputProps('orange', 4)}
          {...getInputProps('name')}
        />
        <TextInput
          type="email"
          label="Email"
          placeholder="Enter your email"
          disabled={isSubmitting}
          {...inputProps('orange', 4)}
          {...getInputProps('email')}
        />
        <TextInput
          type="password"
          label="Password"
          placeholder="Enter a password"
          disabled={isSubmitting}
          {...inputProps('orange', 4)}
          {...getInputProps('password')}
        />
        <Divider color="gray.2" />
        <Button type="submit">Sign up</Button>
        <Button
          type="button"
          variant="outline"
          color="gray.7"
          leftIcon={<Google fontSize="small" />}
          onClick={() => signIn('google', { callbackUrl: `${window.location.origin}/home` })}
        >
          Continue with Google
        </Button>
        <Text size="sm" span align="center">
          Already have an account?{' '}
          <Text span color="gray.9" fw={700} onClick={onToggle} sx={{ cursor: 'pointer' }}>
            Sign in
          </Text>
        </Text>
      </Stack>
    </form>
  );
};

export default SignupForm;
