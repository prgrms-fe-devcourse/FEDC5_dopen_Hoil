import Badge from '@/common/Badge';
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

const MainHeader = ({ width = 428, height = 80 }: MainHeaderProps) => {
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
          icon={<DarkModeIcon color="black" boxSize="24px" />}
          bgColor="white"
          size="xs"
          onClick={toggleColorMode}
        />
        <IconButton
          aria-label="message"
          icon={<ChatIcon color="black" boxSize="24px" />}
          bgColor="white"
          size="xs"
        />
        <IconButton
          aria-label="search"
          icon={<SearchIcon color="black" boxSize="24px" />}
          bgColor="white"
          size="xs"
        />
        <IconButton
          aria-label="notify"
          icon={
            <Badge count={1}>
              <BellIcon color="black" boxSize="24px" />
            </Badge>
          }
          bgColor="white"
          size="xs"
        />
      </Flex>
    </Flex>
  );
};

export default MainHeader;
