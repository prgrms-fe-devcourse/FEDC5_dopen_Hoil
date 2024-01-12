import { Box, BoxProps } from '@chakra-ui/react';

interface GrassCellProps extends BoxProps {
  percentage: number; //0, 0.25, 5, 0.75, 1
}

const GrassCell = ({ percentage = 0, ...props }: GrassCellProps) => {
  return (
    <Box
      bg={`rgba(255,0,0, ${percentage})`}
      border="1px solid black"
      size="5px"
      {...props}
    />
  );
};

export default GrassCell;
