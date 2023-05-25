'use client';

import { useEffect } from 'react';

import ErrorState from '@/components/Error';
import { Box } from '@mantine/core';

interface ErrorStateProps {
  error: Error;
}

const Error: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Box py={20} px={5}>
      <ErrorState />
    </Box>
  );
};

export default Error;
