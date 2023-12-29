import { defaultHeaderHeight, defaultWidth } from '@/constants/style';
import { Flex, Icon, IconButton, Text, VStack } from '@chakra-ui/react';
import {
  MdHome,
  MdEmojiEvents,
  MdOutlineTimer,
  MdOutlineMessage,
  MdPersonOutline,
} from 'react-icons/md';

interface FooterProps {
  width?: number | string;
  height?: number | string;
}

const Footer = ({
  width = defaultWidth,
  height = defaultHeaderHeight,
}: FooterProps) => {
  return (
    <Flex
      pl="31px"
      pr="31px"
      gap="62px"
      border="1px solid black"
      align="center"
      w={width}
      h={height}
    >
      <VStack>
        <IconButton
          aria-label="home"
          icon={<Icon as={MdHome} boxSize="icon" />}
          bg="white"
        />
        <Text>홈</Text>
      </VStack>
      <IconButton
        aria-label="ranking"
        icon={<Icon as={MdEmojiEvents} boxSize="icon" />}
        bg="white"
      />
      <IconButton
        aria-label="timer"
        icon={<Icon as={MdOutlineTimer} boxSize="icon" />}
        bg="white"
      />
      <IconButton
        aria-label="boardChannel"
        icon={<Icon as={MdOutlineMessage} boxSize="icon" />}
        bg="white"
      />
      <IconButton
        aria-label="myInfo"
        icon={<Icon as={MdPersonOutline} boxSize="icon" />}
        bg="white"
      />
    </Flex>
  );
};

export default Footer;
