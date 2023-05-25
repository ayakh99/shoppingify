'use client';

import { FormEvent, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button, Divider, Stack, Text, TextInput, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';
import { Google } from '@mui/icons-material';

import inputProps from '@/common/input.props';
import notificationsContent from '@content/notifications';

interface FormValues {
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Invalid email'),
  password: Yup.string().min(6, 'Password should have at least 6 characters'),
});

const SigninForm = () => {
  const router = useRouter();
  const { getInputProps, onSubmit } = useForm<FormValues>({
    validate: yupResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onToggle = useCallback(() => {
    router.push('/signup');
  }, [router]);

  const handleSubmit = useCallback(
    (values: FormValues, event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitting(true);

      signIn('credentials', {
        ...values,
        redirect: false,
      }).then((callback) => {
        setIsSubmitting(false);

        if (callback?.error) {
          notifications.show(notificationsContent.error);
          return;
        }

        if (callback?.ok) {
          notifications.show(notificationsContent.signin);
          router.push('/home');
        }
      });
    },
    [router]
  );

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Stack spacing={20}>
        <Stack mb={10} spacing={3}>
          <Title fz={26} fw={600} color="orange.4">
            Welcome back!
          </Title>
          <Text fz={14} fw={500} lh={'18px'} color="gray.6">
            Sign in to your Shoppingify account.
          </Text>
        </Stack>
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
          placeholder="Enter your password"
          disabled={isSubmitting}
          {...inputProps('orange', 4)}
          {...getInputProps('password')}
        />
        <Divider color="gray.2" />
        <Button type="submit" disabled={isSubmitting}>
          Sign in
        </Button>
        <Button
          type="button"
          variant="outline"
          color="gray.7"
          leftIcon={<Google fontSize="small" />}
          onClick={() => signIn('google', { callbackUrl: `${window.location.origin}/home` })}
          disabled={isSubmitting}
        >
          Continue with Google
        </Button>
        <Text span size="sm" align="center">
          First time using Shoppingify?{' '}
          <Text span color="gray.9" fw={700} onClick={onToggle} sx={{ cursor: 'pointer' }}>
            Sign up
          </Text>
        </Text>
      </Stack>
    </form>
  );
};

export default SigninForm;
