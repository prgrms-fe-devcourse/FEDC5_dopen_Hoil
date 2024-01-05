import Badge from '@/components/common/Badge';
import {
  DEFAULT_HEADER_HEIGHT,
  DEFAULT_PAGE_PADDING,
  DEFAULT_WIDTH,
} from '@/constants/style';
import {
  BellIcon,
  ChatIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
} from '@chakra-ui/icons';
import {
  Flex,
  FlexProps,
  IconButton,
  Image,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

const MainHeader = ({ ...props }: FlexProps) => {
  const { toggleColorMode } = useColorMode();
  const DarkModeIcon = useColorModeValue(MoonIcon, SunIcon);

  return (
    <Flex
      w={DEFAULT_WIDTH}
      h={DEFAULT_HEADER_HEIGHT}
      justify="space-between"
      align="center"
      pr={DEFAULT_PAGE_PADDING}
      pl={DEFAULT_PAGE_PADDING}
      {...props}
    >
      {/* 로고 들어갈 자리입니다. 로고 사이즈에 맞춰서 사용해주세요*/}
      <Image
        alt="dopen logo"
        w="130px"
        h={DEFAULT_HEADER_HEIGHT}
        src="/assets/dopenLogo.svg"
      />
      <Flex gap="20px">
        <IconButton
          aria-label="toggleDarkMode"
          icon={<DarkModeIcon color="black" boxSize="icon" />}
          bg="transparent"
          size="md"
          onClick={toggleColorMode}
        />
        <IconButton
          aria-label="message"
          icon={<ChatIcon color="black" boxSize="icon" />}
          bg="transparent"
          size="md"
        />
        <IconButton
          aria-label="search"
          icon={<SearchIcon color="black" boxSize="icon" />}
          bg="transparent"
          size="md"
        />
        <IconButton
          aria-label="notify"
          icon={
            <Badge count={1}>
              <BellIcon color="black" boxSize="icon" />
            </Badge>
          }
          bg="transparent"
          size="md"
        />
      </Flex>
    </Flex>
  );
};

export default MainHeader;
