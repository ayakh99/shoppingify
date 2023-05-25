'use client';

import { KeyedMutator } from 'swr';
import { Button, Flex, Text, useMantineTheme } from '@mantine/core';
import { ErrorRounded, ReplayRounded } from '@mui/icons-material';

interface ErrorProps {
  statusCode?: number;
  message?: string;
  refresh?: KeyedMutator<any>;
}

const Error: React.FC<ErrorProps> = ({ statusCode, message, refresh }) => {
  const theme = useMantineTheme();

  return (
    <Flex w="100%" h={450} direction="column" align="center" justify="center" gap={16}>
      <ErrorRounded fontSize="large" sx={{ color: theme.colors.red[3] }} />

      <Flex direction="column" align="center">
        <Text color="gray.9" fw={700} fz={20}>
          {statusCode}
        </Text>
        <Text span>
          {message ?? statusCode === 400
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
    </Flex>
  );
};

export default Error;
