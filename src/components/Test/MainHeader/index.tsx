import {
  BellIcon,
  ChatIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
} from '@chakra-ui/icons';
import { Flex, IconButton, Image, useColorMode } from '@chakra-ui/react';

interface MainHeaderProps {
  width?: number;
  height?: number;
}

const MainHeader = ({ width = 428, height = 80 }: MainHeaderProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      bg="white"
      w={`${width}px`}
      h={`${height}px`}
      justify="space-between"
      align="center"
    >
      <Image
        alt="dopen logo"
        w="130px"
        h={`${height}px`}
        src="https://via.placeholder.com/80"
      />
      <Flex gap="10px">
        <IconButton
          aria-label="toggleDarkMode"
          icon={
            colorMode === 'dark' ? (
              <SunIcon color="black" />
            ) : (
              <MoonIcon color="black" />
            )
          }
          bgColor="white"
          size="xs"
          onClick={toggleColorMode}
        />
        <IconButton
          aria-label="message"
          icon={<ChatIcon color="black" />}
          bgColor="white"
          size="xs"
        />
        <IconButton
          aria-label="search"
          icon={<SearchIcon color="black" />}
          bgColor="white"
          size="xs"
        />
        <IconButton
          aria-label="notify"
          icon={<BellIcon color="black" boxSize="5" />}
          bgColor="white"
          size="xs"
        />
      </Flex>
    </Flex>
  );
};

export default MainHeader;
