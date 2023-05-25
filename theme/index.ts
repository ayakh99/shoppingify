import { MantineThemeOverride } from '@mantine/core';
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({ subsets: ['latin'] });

const theme: MantineThemeOverride = {
  fontFamily: quicksand.style.fontFamily,
  headings: {
    fontFamily: quicksand.style.fontFamily,
  },
  colors: {
    red: [
      '#ffe5e5',
      '#fbb9ba',
      '#f28c8d',
      '#eb5757',
      '#e63333',
      '#cc1a19',
      '#a01313',
      '#730c0d',
      '#460506',
      '#1e0000',
    ],
    pink: [
      '#ffecee',
      '#e7cdd1',
      '#d2adb5',
      '#bf8d99',
      '#ab6d7e',
      '#925466',
      '#80485b',
      '#532d38',
      '#341b20',
      '#17050a',
    ],
    cyan: [
      '#dbfaff',
      '#b2ebfd',
      '#86dbf7',
      '#56ccf2',
      '#31bfee',
      '#1ca5d4',
      '#0d80a6',
      '#005c77',
      '#00384a',
      '#00141d',
    ],
    orange: [
      '#fff0de',
      '#ffe2ae',
      '#fdcf80',
      '#fbbc4f',
      '#f9a109',
      '#e09005',
      '#ae7001',
      '#7d5000',
      '#4c2f00',
      '#1e0f00',
    ],
    gray: [
      '#fafafe',
      '#f2f2f2',
      '#e0e0e0',
      '#c1c1c4',
      '#bdbdbd',
      '#828282',
      '#454545',
      '#34333a',
      '#24242b',
      '#0b0b15',
    ],
  },
  components: {
    Button: {
      defaultProps: (theme) => ({
        color: 'orange.4',
        size: 'md',
        loaderPosition: 'center',
        loaderProps: {
          color: theme.colors.orange[4],
        },
        styles: {
          root: {
            padding: '19px 24px',
            minHeight: 61.25,
            borderRadius: 12,
            borderWidth: 2,
            fontWeight: 700,
            transition: 'background .3s',

            '&:disabled': {
              color: theme.white,
              backgroundColor: theme.colors.gray[3],
            },

            '&[data-loading]': {
              '&:before': {
                display: 'none',
              },
            },
          },
        },
      }),
    },
  },
};

export default theme;
