import { MantineTheme, createStyles, em } from '@mantine/core';

const useItemGridStyles = createStyles((theme: MantineTheme) => ({
  grid: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '28px 19px',
    alignItems: 'start',

    [`@media (max-width: ${em(1320)})`]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },

    [theme.fn.smallerThan('md')]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '24px 9px',
    },

    [`@media (max-width: ${em(690)})`]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },

    [theme.fn.smallerThan('xs')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },

    [`@media (max-width: ${em(376)})`]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  },
}));

export default useItemGridStyles;
