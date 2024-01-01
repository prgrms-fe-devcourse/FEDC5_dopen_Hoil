import {
  DEFAULT_HEADER_HEIGHT,
  DEFAULT_PAGE_PADDING,
  DEFAULT_WIDTH,
} from '@/constants/style';
import { Icon } from '@chakra-ui/icon';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { MdArrowBackIos } from 'react-icons/md';

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
      justify="space-between"
      align="center"
      border="1px solid black"
      pl={DEFAULT_PAGE_PADDING}
      pr={DEFAULT_PAGE_PADDING}
    >
      <Box>
        <Icon as={MdArrowBackIos} boxSize="icon" color="black" />
      </Box>
      <Text color="black">{pageName}</Text>
    </Flex>
  );
};

export default PageHeader;
