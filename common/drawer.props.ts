import { MantineTheme } from '@mantine/core';

const drawerProps = (transitionDuration: number) => ({
  withCloseButton: false,
  withOverlay: false,
  withinPortal: false,
  lockScroll: false,
  size: 'sm',
  transitionProps: { duration: transitionDuration },
  styles: (theme: MantineTheme) => ({
    inner: {
      right: 0,
      maxWidth: 'calc(100% - 62px)',
    },
    content: {
      boxShadow: 'none',
    },
    body: {
      padding: 0,
      height: '100%',
    },
  }),
});

export default drawerProps;
