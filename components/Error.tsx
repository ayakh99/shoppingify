'use client';

import Link from 'next/link';
import { KeyedMutator } from 'swr';
import { Button, Flex, Text, useMantineTheme } from '@mantine/core';
import { ErrorRounded, ReplayRounded } from '@mui/icons-material';

interface ErrorProps {
  statusCode?: number;
  message?: string;
  refresh?: KeyedMutator<any>;
  homeButton?: boolean;
}

const Error: React.FC<ErrorProps> = ({ statusCode, message, refresh, homeButton }) => {
  const theme = useMantineTheme();

  return (
    <Flex w="100%" mih={450} direction="column" align="center" justify="center" gap={16}>
      <ErrorRounded fontSize="large" sx={{ color: theme.colors.red[3] }} />

      <Flex direction="column" align="center">
        <Text color="gray.9" fw={700} fz={20}>
          {statusCode}
        </Text>
        <Text span fw={500}>
          {message ?? statusCode === 404
            ? 'The resource you requested was not found.'
            : statusCode === 500
            ? 'Internal server error'
            : 'Something went wrong'}
        </Text>
      </Flex>

      {refresh && (
        <Button
          mt={5}
          color="red.3"
          rightIcon={<ReplayRounded fontSize="small" />}
          onClick={refresh}
        >
          Retry
        </Button>
      )}

      {homeButton && (
        <Link href="/home" style={{ color: theme.colors.cyan[4], fontWeight: 600 }}>
          Return Home
        </Link>
      )}
    </Flex>
  );
};

export default Error;
