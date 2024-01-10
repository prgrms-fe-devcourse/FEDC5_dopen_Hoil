import { DEFAULT_HEADER_HEIGHT, DEFAULT_WIDTH } from '@/constants/style';
import { Flex, FlexProps } from '@chakra-ui/react';
import {
  MdHome,
  MdEmojiEvents,
  MdOutlineTimer,
  MdOutlineMessage,
  MdPersonOutline,
} from 'react-icons/md';
import TextIconButton from '../common/TextIconButton';

const elementsData = [
  {
    icon: MdHome,
    text: '홈',
  },
  {
    icon: MdEmojiEvents,
    text: '랭킹',
  },
  {
    icon: MdOutlineTimer,
    text: '타이머',
  },
  {
    icon: MdOutlineMessage,
    text: '게시판',
  },
  {
    icon: MdPersonOutline,
    text: '내정보',
  },
];

const Footer = ({ ...props }: FlexProps) => {
  return (
    <Flex
      pl="31px"
      pr="31px"
      justify="space-between"
      borderTop="1px solid"
      borderColor="gray.450"
      align="center"
      bg="gray.50"
      w={DEFAULT_WIDTH}
      h={DEFAULT_HEADER_HEIGHT}
      {...props}
    >
      {elementsData.map(({ icon, text }) => (
        <TextIconButton key={text} TheIcon={icon} textContent={text} />
      ))}
    </Flex>
  );
};

export default Footer;
