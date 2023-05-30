import { ModalProps } from '@mantine/core';

const props: Omit<ModalProps, 'title' | 'opened' | 'onClose'> = {
  keepMounted: false,
  closeOnClickOutside: false,
  centered: true,
  overlayProps: {
    opacity: 0.1,
    zIndex: 202,
  },
  styles: () => ({
    content: {
      padding: '14px 20px',
      borderRadius: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: 500,
      lineHeight: '30px',
    },
  }),
};

export const uploadModalProps = {
  title: 'Upload an image',
  ...props,
};

export const categoryModalProps = {
  title: 'Add a new category',
  ...props,
};

export const itemDeleteModalProps = {
  title: 'Are you sure you want to delete this item?',
  ...props,
};

export const userDeleteModalProps = {
  title: 'Are you sure you want to delete your account?',
  ...props,
};

export const listConfirmModalProps = (title: string) => ({
  title,
  ...props,
});
