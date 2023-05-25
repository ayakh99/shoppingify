import { MantineTheme } from '@mantine/core';

const inputProps = (color: string, index: number, wider?: boolean) => ({
  size: 'md',
  radius: 12,
  styles: (theme: MantineTheme) => ({
    label: {
      fontWeight: 500,
      fontSize: 14,
      marginBottom: 3,
    },
    input: {
      fontSize: 14,
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: theme.colors[color][index],
      fontWeight: 500,
      padding: '20px 18px !important',
      paddingRight: wider ? '30px' : '18px',
      height: 'auto',
      lineHeight: '1',

      '&:focus': {
        borderColor: color !== 'gray' ? theme.colors[color][index] : theme.colors.orange[4],
      },

      '&[data-invalid]': {
        borderColor: theme.colors.red[3],
        color: theme.colors.red[3],
      },

      '&:disabled': {
        backgroundColor: theme.white,
        borderColor: theme.colors.gray[3],
        opacity: 1,
        color: theme.colors.gray[4],
      },
    },
    dropdown: {
      borderRadius: 12,
      borderColor: theme.colors.gray[2],
      padding: 8,
    },
    item: {
      fontSize: 16,
      fontWeight: 500,
      color: theme.colors.gray[5],
      borderRadius: 12,

      '&:hover': {
        color: theme.colors.gray[7],
        backgroundColor: theme.colors.gray[1],
      },
    },
  }),
});

export default inputProps;
