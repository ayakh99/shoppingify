'use client';

import Error from './Error';
import { Flex } from '@mantine/core';

const NotFound = () => {
  return (
    <Flex direction="column" align="center" justify="center" bg="gray.0" w="100%" mih="100vh">
      <Error statusCode={404} homeButton />
    </Flex>
  );
};

export default NotFound;
