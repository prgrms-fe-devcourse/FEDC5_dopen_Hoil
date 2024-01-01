import Badge from '@/components/common/Badge';
import { DEFAULT_HEADER_HEIGHT, DEFAULT_WIDTH } from '@/constants/style';
import {
  BellIcon,
  ChatIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
} from '@chakra-ui/icons';
import {
  Flex,
  IconButton,
  Image,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

interface MainHeaderProps {
  width?: number | string;
  height?: number | string;
}

const MainHeader = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEADER_HEIGHT,
}: MainHeaderProps) => {
  const { toggleColorMode } = useColorMode();
  const DarkModeIcon = useColorModeValue(MoonIcon, SunIcon);

  return (
    <Flex
      w={typeof width === 'string' ? width : `${width}px`}
      h={typeof height === 'string' ? height : `${height}px`}
      justify="space-between"
      align="center"
    >
      {/* 로고 들어갈 자리입니다. 로고 사이즈에 맞춰서 사용해주세요*/}
      <Image
        alt="dopen logo"
        w="130px"
        h={typeof height === 'string' ? height : `${height}px`}
        src="https://via.placeholder.com/80"
      />
      <Flex gap="20px">
        <IconButton
          aria-label="toggleDarkMode"
          icon={<DarkModeIcon color="black" boxSize="icon" />}
          bgColor="white"
          size="md"
          onClick={toggleColorMode}
        />
        <IconButton
          aria-label="message"
          icon={<ChatIcon color="black" boxSize="icon" />}
          bgColor="white"
          size="md"
        />
        <IconButton
          aria-label="search"
          icon={<SearchIcon color="black" boxSize="icon" />}
          bgColor="white"
          size="md"
        />
        <IconButton
          aria-label="notify"
          icon={
            <Badge count={1}>
              <BellIcon color="black" boxSize="icon" />
            </Badge>
          }
          bgColor="white"
          size="md"
        />
      </Flex>
    </Flex>
  );
};

export default MainHeader;
