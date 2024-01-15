import {
  DEFAULT_HEADER_HEIGHT,
  DEFAULT_PAGE_PADDING,
  DEFAULT_WIDTH,
} from '@/constants/style';
import { IconButton } from '@chakra-ui/button';
import { Icon } from '@chakra-ui/icon';
import { Flex, Text } from '@chakra-ui/layout';
import { FlexProps } from '@chakra-ui/react';
import {
  MdArrowBackIos,
  MdOutlineNotifications,
  MdOutlineSearch,
} from 'react-icons/md';
import Badge from '../common/Badge';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps extends FlexProps {
  pageName: string;
}

const PageHeader = ({ pageName, ...props }: PageHeaderProps) => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <Flex
      w={DEFAULT_WIDTH}
      h={DEFAULT_HEADER_HEIGHT}
      shrink="0"
      align="center"
      pl={DEFAULT_PAGE_PADDING}
      pr={DEFAULT_PAGE_PADDING}
      justify="space-between"
      color="black"
      {...props}
    >
      <Flex w="69px" align="center" cursor="pointer" onClick={goBack}>
        <Icon as={MdArrowBackIos} boxSize="icon" />
        <Text fontSize="sm">뒤로가기</Text>
      </Flex>

      <Text fontSize="lg" fontWeight="medium">
        {pageName}
      </Text>

      <Flex w="69px" justify="space-between">
        <IconButton
          aria-label="search"
          icon={<Icon as={MdOutlineSearch} color="black" boxSize="icon" />}
          bg="transparent"
          onClick={() => navigate('/search')}
        />
        <IconButton
          aria-label="notify"
          icon={
            <Badge count={1}>
              <Icon as={MdOutlineNotifications} color="black" boxSize="icon" />
            </Badge>
          }
          bg="transparent"
          onClick={() => navigate('/notification')}
        />
      </Flex>
    </Flex>
  );
};

export default PageHeader;
