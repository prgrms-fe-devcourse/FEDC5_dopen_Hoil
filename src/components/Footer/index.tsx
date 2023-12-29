import { defaultHeaderHeight, defaultWidth } from '@/constants/style';
import { Flex, Icon, IconButton, Text } from '@chakra-ui/react';
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
      justify="space-between"
      borderTop="1px solid"
      borderColor="gray.450"
      align="center"
      bg="gray.50"
      w={typeof width === 'string' ? width : `${width}px`}
      h={typeof height === 'string' ? height : `${height}px`}
    >
      <Flex flexDir="column" align="center" w="28px">
        <IconButton
          aria-label="home"
          icon={<Icon as={MdHome} boxSize="icon" color="black" />}
          bg="white"
        />
        <Text textAlign="center" w="28px" color="black">
          홈
        </Text>
      </Flex>
      <Flex flexDir="column" align="center" w="28px">
        <IconButton
          aria-label="ranking"
          icon={<Icon as={MdEmojiEvents} boxSize="icon" color="black" />}
          bg="white"
        />
        <Text textAlign="center" w="28px" color="black">
          랭킹
        </Text>
      </Flex>
      <Flex flexDir="column" align="center" w="28px">
        <IconButton
          aria-label="timer"
          icon={<Icon as={MdOutlineTimer} boxSize="icon" color="black" />}
          bg="white"
        />
        <Text textAlign="center" w="28px" color="black" fontSize="xs">
          타이머
        </Text>
      </Flex>
      <Flex flexDir="column" align="center" w="28px">
        <IconButton
          aria-label="boardChannel"
          icon={<Icon as={MdOutlineMessage} boxSize="icon" color="black" />}
          bg="white"
        />
        <Text textAlign="center" w="28px" color="black">
          게시판
        </Text>
      </Flex>
      <Flex flexDir="column" align="center" w="28px">
        <IconButton
          aria-label="myInfo"
          icon={<Icon as={MdPersonOutline} boxSize="icon" color="black" />}
          bg="white"
        />
        <Text textAlign="center" w="28px" color="black">
          내정보
        </Text>
      </Flex>
    </Flex>
  );
};

export default Footer;
