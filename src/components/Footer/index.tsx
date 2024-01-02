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
      {/* [{icon:MdHome, textContent:"홈"}, ...]  이렇게 받아와서 map을 돌려도 좋아보입니다*/}
      <TextIconButton TheIcon={MdHome} textContent="홈" />
      <TextIconButton TheIcon={MdEmojiEvents} textContent="랭킹" />
      <TextIconButton TheIcon={MdOutlineTimer} textContent="타이머" />
      <TextIconButton TheIcon={MdOutlineMessage} textContent="게시판" />
      <TextIconButton TheIcon={MdPersonOutline} textContent="내정보" />
    </Flex>
  );
};

export default Footer;
