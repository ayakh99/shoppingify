'use client';

import { Tooltip as MantineTooltip } from '@mantine/core';
import { FloatingPosition } from '@mantine/core/lib/Floating';

interface TooltipProps {
  label: string;
  position: FloatingPosition;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ label, position, children }) => {
  return (
    <MantineTooltip
      label={label}
      position={position}
      radius="sm"
      withArrow
      arrowPosition={position === 'right' ? 'side' : 'center'}
      arrowSize={6}
      arrowRadius={1.5}
      color="gray.6"
      styles={() => ({
        tooltip: {
          padding: '3px 17px',
          fontSize: '12px',
          fontWeight: 500,
        },
      })}
      transitionProps={{
        duration: 350,
        transition: position === 'right' ? 'slide-right' : 'slide-up',
      }}
    >
      {children}
    </MantineTooltip>
  );
};

export default Tooltip;
