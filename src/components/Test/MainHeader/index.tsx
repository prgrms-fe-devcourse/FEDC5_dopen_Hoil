import { BellIcon, ChatIcon, MoonIcon, SearchIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Image } from '@chakra-ui/react';

interface MainHeaderProps {
  width?: number | string;
  height?: number | string;
}

const MainHeader = ({ width = 428, height = 80 }: MainHeaderProps) => {
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
        height="78px"
        src="https://via.placeholder.com/80"
      />
      <Flex gap="10px">
        <IconButton
          aria-label="toggleDarkMode"
          icon={<MoonIcon />}
          bgColor="white"
          size="xs"
        />
        <IconButton
          aria-label="message"
          icon={<ChatIcon />}
          bgColor="white"
          size="xs"
        />
        <IconButton
          aria-label="search"
          icon={<SearchIcon />}
          bgColor="white"
          size="xs"
        />
        <IconButton
          aria-label="notify"
          icon={<BellIcon boxSize="5" />}
          bgColor="white"
          size="xs"
        />
      </Flex>
    </Flex>
  );
};

export default MainHeader;
