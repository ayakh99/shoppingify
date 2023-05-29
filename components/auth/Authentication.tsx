'use client';

import Image from 'next/image';
import { Box, createStyles } from '@mantine/core';

interface AuthenticationProps {
  children: React.ReactNode;
}

const Authentication: React.FC<AuthenticationProps> = ({ children }) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.grid}>
      <Box className={classes.formWrapper}>{children}</Box>
      <Box className={classes.imageOuter}>
        <Box className={classes.imageInner}>
          <Image src="/images/shopping.svg" alt="Shopping" fill className={classes.image} />
          <Image src="/images/logo.svg" alt="Logo" width={40} height={40} />
        </Box>
      </Box>
    </Box>
  );
};

export default Authentication;

const useStyles = createStyles((theme) => ({
  grid: {
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    margin: 0,
    backgroundColor: theme.colors.gray[0],

    [theme.fn.smallerThan('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
  formWrapper: {
    width: '100%',
    maxWidth: 512,
    padding: 20,
    paddingBottom: 60,
    placeSelf: 'center',
    order: 1,

    [theme.fn.largerThan('md')]: {
      padding: 40,
    },
  },
  imageOuter: {
    background: theme.colors.orange[0],
    padding: 20,
    order: 0,

    [theme.fn.largerThan('md')]: {
      padding: 40,
      order: 1,
    },
  },
  imageInner: {
    position: 'relative',
    minHeight: '200px',
    height: '100%',
  },
  image: {
    maxWidth: 384,
    marginInline: 'auto',

    [theme.fn.largerThan('md')]: {
      maxWidth: 512,
    },
  },
}));
