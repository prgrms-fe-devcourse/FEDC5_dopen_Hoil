import { defaultHeaderHeight, defaultWidth } from '@/constants/style';
import { Flex } from '@chakra-ui/react';
import {
  MdHome,
  MdEmojiEvents,
  MdOutlineTimer,
  MdOutlineMessage,
  MdPersonOutline,
} from 'react-icons/md';
import TextIconButton from '../common/TextIconButton';

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
      <TextIconButton TheIcon={MdHome} textContent="홈" />
      <TextIconButton TheIcon={MdEmojiEvents} textContent="랭킹" />
      <TextIconButton TheIcon={MdOutlineTimer} textContent="타이머" />
      <TextIconButton TheIcon={MdOutlineMessage} textContent="게시판" />
      <TextIconButton TheIcon={MdPersonOutline} textContent="내정보" />
    </Flex>
  );
};

export default Footer;
