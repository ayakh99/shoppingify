'use client';

import { Button, Flex, Text, Title } from '@mantine/core';

interface EmptyProps {
  title: string;
  description?: string;
  buttonText?: string;
  onClick?: () => void;
}

const Empty: React.FC<EmptyProps> = ({ title, description, buttonText, onClick }) => {
  return (
    <Flex direction="column" gap={5} align="center" justify="center" h={500}>
      <Title fz={18} fw={700} color="gray.7">
        {title}
      </Title>
      {description && (
        <Text fz={14} color="gray.5" align="center">
          {description}
        </Text>
      )}
      {onClick && (
        <Button mih="initial" mt={14} py={10} px={14} color="cyan.3" onClick={onClick}>
          {buttonText}
        </Button>
      )}
    </Flex>
  );
};

export default Empty;
