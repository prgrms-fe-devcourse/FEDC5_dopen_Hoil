import { GridItem, GridItemProps } from '@chakra-ui/react';
import React, { ForwardedRef } from 'react';

interface GrassCellProps extends GridItemProps {
  percentage: number; //0, 0.25, 5, 0.75, 1
}

const GrassCell = React.forwardRef(
  (
    { percentage = 0, ...props }: GrassCellProps,
    ref: ForwardedRef<ReturnType<typeof GridItem>>,
  ) => {
    return (
      <GridItem
        ref={ref}
        bg={percentage ? `rgba(255,0,0, ${percentage})` : 'gray.300'}
        boxSize="20px"
        {...props}
      />
    );
  },
);

GrassCell.displayName = 'GrassCell';

export default GrassCell;
