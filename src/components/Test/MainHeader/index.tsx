import { Box, Image } from '@chakra-ui/react';

interface MainHeaderProps {
  width: number;
  height: number;
}

const MainHeader = ({ width = 480, height = 80 }: MainHeaderProps) => {
  return (
    <Box bg="white" w={`${width}px`} h={`${height}px`} border="1px solid black">
      <Image
        src="https://via.placeholder.com/80"
        fallbackSrc="https://via.placeholder.com/80"
      />
    </Box>
  );
};

export default MainHeader;
