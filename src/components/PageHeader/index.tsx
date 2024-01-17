import {
  DEFAULT_HEADER_HEIGHT,
  DEFAULT_PAGE_PADDING,
  DEFAULT_WIDTH,
} from '@/constants/style';
import { IconButton } from '@chakra-ui/button';
import { Icon } from '@chakra-ui/icon';
import {
  AbsoluteCenter,
  Flex,
  FlexProps,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  MdArrowBackIos,
  MdOutlineDarkMode,
  MdOutlineLightMode,
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

  const DarkModeIcon = useColorModeValue(MdOutlineDarkMode, MdOutlineLightMode);
  const { toggleColorMode } = useColorMode();

  return (
    <Flex
      w={DEFAULT_WIDTH}
      h={DEFAULT_HEADER_HEIGHT}
      shrink="0"
      align="center"
      pl={DEFAULT_PAGE_PADDING}
      pr={DEFAULT_PAGE_PADDING}
      justify="space-between"
      position="relative"
      {...props}
    >
      <Flex w="69px" align="center" cursor="pointer" onClick={goBack}>
        <Icon as={MdArrowBackIos} boxSize="icon" />
        <Text fontSize="sm">뒤로가기</Text>
      </Flex>

      <AbsoluteCenter fontSize="lg" fontWeight="medium" axis="both">
        {pageName}
      </AbsoluteCenter>

      <Flex w="100px" justify="space-between">
        <IconButton
          color="inherit"
          aria-label="search"
          bg="transparent"
          onClick={toggleColorMode}
          icon={<Icon as={DarkModeIcon} boxSize="icon" />}
        />
        <IconButton
          color="inherit"
          aria-label="search"
          bg="transparent"
          onClick={() => navigate('/search')}
          icon={<Icon as={MdOutlineSearch} boxSize="icon" />}
        />
        <IconButton
          color="inherit"
          aria-label="notify"
          bg="transparent"
          onClick={() => navigate('/notification')}
          icon={
            <Badge count={1}>
              <Icon as={MdOutlineNotifications} boxSize="icon" />
            </Badge>
          }
        />
      </Flex>
    </Flex>
  );
};

export default PageHeader;
