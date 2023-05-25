import { MantineTheme, createStyles, em } from '@mantine/core';

const useItemButtonStyles = (alt?: boolean) =>
  createStyles((theme: MantineTheme) => ({
    wrapper: {
      backgroundColor: theme.white,
      borderRadius: 12,
      minWidth: 182,
      maxWidth: 182,
      width: '100%',
      overflow: 'hidden',
      justifyItems: 'space-between',
      boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.05);',

      [theme.fn.smallerThan('xl')]: {
        minWidth: 130,
      },

      [`@media (max-width: ${em(376)})`]: {
        maxWidth: 'none',
      },
    },
    button: {
      backgroundColor: 'transparent',
      borderRadius: '0',
      height: 'initial',
      minWidth: 48,
      minHeight: 50,

      '&:hover': {
        backgroundColor: alt ? 'transparent' : theme.colors.gray[1],
      },
    },
    infoButton: {
      fontSize: 16,
      color: '#000',
      flexGrow: 1,
      padding: '13px 16px',
      maxWidth: alt ? 'calc(100% - 70px)' : 'calc(100% - 48px)',

      '& > *': {
        justifyContent: 'start',
      },

      '& span': {
        whiteSpace: 'unset',
        fontWeight: 500,
        lineHeight: '20px',
      },

      [theme.fn.smallerThan('sm')]: {
        fontSize: 14,
      },
    },
    addButton: {
      padding: '11px 5px',
      width: 48,
      color: theme.colors.gray[3],
      fontSize: 24.5,
    },
    pieces: {
      padding: '13px 16px',
      width: 70,
    },
  }));

export default useItemButtonStyles;
