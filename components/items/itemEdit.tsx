'use client';

import { Box, Transition } from '@mantine/core';
import ItemForm from './ItemForm';
import { useItemEditContext } from './ItemView';
import { Dispatch, SetStateAction } from 'react';

interface ItemEditProps {
  mounted: boolean;
  disabled: boolean;
  setOppositeMount: Dispatch<SetStateAction<boolean>>;
}

const itemEdit: React.FC<ItemEditProps> = ({ mounted, disabled, setOppositeMount }) => {
  return (
    <Transition
      mounted={mounted}
      onExited={() => setOppositeMount(true)}
      transition="slide-right"
      duration={400}
    >
      {(styles) => (
        <Box style={{ ...styles }} w="100%">
          <ItemForm disabled={disabled} formContext={useItemEditContext} />
        </Box>
      )}
    </Transition>
  );
};

export default itemEdit;
