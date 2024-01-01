import { DEFAULT_HEADER_HEIGHT, DEFAULT_WIDTH } from '@/constants/style';
import { Flex } from '@chakra-ui/layout';

interface PageHeaderProps {
  width?: number | string;
  height?: number | string;
}
const PageHeader = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEADER_HEIGHT,
}: PageHeaderProps) => {
  return (
    <Flex
      w={typeof width === 'string' ? width : `${width}px`}
      h={typeof height === 'string' ? height : `${height}px`}
      justify="space-between"
      align="center"
    ></Flex>
  );
};

export default PageHeader;
