'use client';

import { useCallback } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { Box, Stack, Text, useMantineTheme } from '@mantine/core';
import { modals } from '@mantine/modals';
import { PhotoLibraryRounded } from '@mui/icons-material';

interface ImageUploadProps {
  onChange: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange }) => {
  const theme = useMantineTheme();
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url as string);
      modals.closeAll();
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="eyzp0eaq"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => (
        <Box
          onClick={() => open?.()}
          sx={{
            border: `1px dashed ${theme.colors.gray[5]}`,
            borderRadius: 12,
            cursor: 'pointer',
            '&:hover': { background: theme.colors.gray[0] },
          }}
          px={15}
          py={30}
        >
          <Stack align="center" spacing={10} pos="relative">
            <PhotoLibraryRounded sx={{ fontSize: 64 }} />

            <Stack spacing={0} align="center">
              <Text span align="center" fw={600} fz={16} color="gray.7">
                Click to select a file
              </Text>
              <Text span align="center" fw={500} fz={14} color="gray.5">
                Your file should not exceed 3mb
              </Text>
            </Stack>
          </Stack>
        </Box>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;

{
  /* <Stack align="center" spacing={10}>
  <Dropzone.Idle>
    <PhotoLibraryRounded sx={{ fontSize: 64 }} />
  </Dropzone.Idle>

  <Stack spacing={0} align="center">
    <Text align="center" fw={600} fz={16} color="gray.7">
      Drag images here or click to select files
    </Text>
    <Text align="center" fw={500} fz={14} color="gray.5">
      Your file should not exceed 3mb
    </Text>
  </Stack>
</Stack>; */
}
