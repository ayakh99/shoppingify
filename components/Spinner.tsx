'use client';

import { Flex, Loader } from '@mantine/core';

const Spinner = () => {
  return (
    <Flex w="100%" h={450} align="center" justify="center">
      <Loader color="orange.4" />
    </Flex>
  );
};

export default Spinner;
