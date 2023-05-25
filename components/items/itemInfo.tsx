'use client';

import { Dispatch, SetStateAction } from 'react';
import { Image, Flex, Stack, Text, Transition, Box } from '@mantine/core';

import useInfoDrawer from '@hooks/useInfoDrawer';
import useItem from '@hooks/useItem';

import Spinner from '@components/Spinner';
import Error from '@components/Error';

interface ItemInfoProps {
  mounted: boolean;
  setOppositeMount: Dispatch<SetStateAction<boolean>>;
}

const ItemInfo: React.FC<ItemInfoProps> = ({ mounted, setOppositeMount }) => {
  const { itemId } = useInfoDrawer();
  const { data: item, isLoading, error, mutate } = useItem(itemId);

  const labelProps = {
    fz: 12,
    fw: 500,
    color: 'gray.3',
    lh: '15px',
  };

  const valueProps = {
    fz: 18,
    fw: 500,
    color: '#000',
  };

  return (
    <Transition
      mounted={mounted}
      onExited={() => setOppositeMount(true)}
      transition="slide-right"
      duration={400}
      timingFunction="ease"
    >
      {(styles) => (
        <Box style={{ ...styles }}>
          {isLoading && !error ? (
            <Spinner />
          ) : error ? (
            <Error statusCode={error.response?.status} refresh={mutate} />
          ) : (
            <>
              <Image
                src={item.image}
                alt={`${item.name} image`}
                withPlaceholder
                color="gray.0"
                height={220}
                radius={25}
                styles={{
                  image: {
                    '&:before': {
                      display: 'none',
                    },
                  },
                }}
              />

              <Flex
                direction="column"
                gap={{ base: 20, sm: 34 }}
                py={{ base: 20, sm: 30 }}
                pt={{ sm: 54 }}
              >
                <Stack spacing={1}>
                  <Text {...labelProps}>name</Text>
                  <Text {...valueProps} fz={24}>
                    {item.name}
                  </Text>
                </Stack>

                <Stack spacing={3}>
                  <Text {...labelProps}>category</Text>
                  <Text {...valueProps}>{item.category.title}</Text>
                </Stack>

                {item.note !== '' && (
                  <Stack spacing={3}>
                    <Text {...labelProps}>note</Text>
                    <Text {...valueProps}>{item.note}</Text>
                  </Stack>
                )}
              </Flex>
            </>
          )}
        </Box>
      )}
    </Transition>
  );
};

export default ItemInfo;
