import Grass from '@/components/Grass';
import { GRASS_DUMMY } from '@/constants/GrassDummy';
import { Text } from '@chakra-ui/react';

const GuestGrassBox = () => {
  return (
    <>
      <Text fontSize="1.5rem" fontWeight="bold" color="black" mb="17px">
        여러분의 열정을 기록해 보세요.
      </Text>
      <Grass timerPosts={GRASS_DUMMY} />
    </>
  );
};

export default GuestGrassBox;
