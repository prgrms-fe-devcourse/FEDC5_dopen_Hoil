import {
  DEFAULT_HEADER_HEIGHT,
  DEFAULT_PAGE_PADDING,
  DEFAULT_WIDTH,
} from '@/constants/style';
import { IconButton } from '@chakra-ui/button';
import { Icon } from '@chakra-ui/icon';
import { BellIcon, SearchIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/layout';
import { MdArrowBackIos } from 'react-icons/md';
import Badge from '../common/Badge';

interface PageHeaderProps {
  width?: number | string;
  height?: number | string;
  pageName: string;
}
const PageHeader = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEADER_HEIGHT,
  pageName = '알림',
}: PageHeaderProps) => {
  return (
    <Flex
      w={typeof width === 'string' ? width : `${width}px`}
      h={typeof height === 'string' ? height : `${height}px`}
      align="center"
      pl={DEFAULT_PAGE_PADDING}
      pr={DEFAULT_PAGE_PADDING}
      justify="space-between"
      color="black"
    >
      {/* 여기에 뒤로가기 기능 달아주면 됩니다 */}
      <Flex w="69px" align="center" cursor="pointer">
        <Icon as={MdArrowBackIos} boxSize="icon" />
        <Text fontSize="sm">뒤로가기</Text>
      </Flex>

      <Text fontSize="lg" fontWeight="medium">
        {pageName}
      </Text>

      <Flex justify="space-between" w="69px">
        <IconButton
          aria-label="search"
          icon={<SearchIcon color="black" boxSize="icon" />}
          bgColor="white"
        />
        <IconButton
          aria-label="notify"
          icon={
            <Badge count={1}>
              <BellIcon color="black" boxSize="icon" />
            </Badge>
          }
          bgColor="white"
        />
      </Flex>
    </Flex>
  );
};

export default PageHeader;
