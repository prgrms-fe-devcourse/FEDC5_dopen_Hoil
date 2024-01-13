import { GridItem, GridItemProps } from '@chakra-ui/react';

interface GrassCellProps extends GridItemProps {
  percentage: number; //0, 0.25, 5, 0.75, 1
}

const GrassCell = ({ percentage = 0, ...props }: GrassCellProps) => {
  return (
    <GridItem
      bg={percentage ? `rgba(255,0,0, ${percentage})` : 'gray.300'}
      boxSize="20px"
      {...props}
    />
  );
};

export default GrassCell;
