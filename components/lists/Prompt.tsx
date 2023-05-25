'use client';

import useItemDrawer from '@hooks/useItemDrawer';
import { Box, Button, Card, Flex, Text, createStyles, em } from '@mantine/core';
import Image from 'next/image';

const ListPrompt = () => {
  const { classes } = useStyles();
  const { onOpen } = useItemDrawer();

  return (
    <Card radius={24} bg="pink" className={classes.card}>
      <Box w={96} h={96} className={classes.placeholder}></Box>
      <Box pos="absolute" w={128} h={128} left={-8} top={-16} className={classes.bottle}>
        <Image src="/images/bottle.svg" alt="Bottle decoration" fill />
      </Box>
      <Flex direction="column" align="flex-start" gap={8} m={0}>
        <Text color="white" weight={700} size={16}>
          {"Didn't find what you need?"}
        </Text>
        <Button className={classes.button} onClick={onOpen}>
          Add item
        </Button>
      </Flex>
    </Card>
  );
};

export default ListPrompt;

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    display: 'flex',
    gap: 32,
    width: '100%',
    maxWidth: 300,
    padding: '16px 25px ',
    marginInline: 'auto',
    overflow: 'visible',

    [theme.fn.smallerThan('sm')]: {
      paddingInline: '28px',
    },
  },
  bottle: {
    [`@media (max-width: ${em(330)})`]: {
      display: 'none',
    },
  },
  placeholder: {
    [`@media (max-width: ${em(330)})`]: {
      display: 'none',
    },
  },
  button: {
    background: theme.white,
    padding: '11px 29px',
    minHeight: 'initial',
    color: theme.colors.gray[7],
    fontSize: 14,

    '&:hover': {
      background: theme.white,
      color: theme.colors.gray[7],
    },

    '&:focus': {
      outline: 'none',
    },
  },
}));
