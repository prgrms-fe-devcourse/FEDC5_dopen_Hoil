import Badge from '@/components/common/Badge';
import {
  DEFAULT_HEADER_HEIGHT,
  DEFAULT_PAGE_PADDING,
  DEFAULT_WIDTH,
} from '@/constants/style';
import {
  Flex,
  FlexProps,
  Icon,
  IconButton,
  Image,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  MdMailOutline,
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlineNotifications,
  MdOutlineSearch,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const MainHeader = ({ ...props }: FlexProps) => {
  const { toggleColorMode } = useColorMode();
  const DarkModeIcon = useColorModeValue(MdOutlineDarkMode, MdOutlineLightMode);

  const navigate = useNavigate();

  const BadgedIcon = () => {
    return (
      <Badge count={1}>
        <Icon as={MdOutlineNotifications} boxSize="icon" />
      </Badge>
    );
  };

  const mainHeaderIconPath = [
    {
      icon: DarkModeIcon,
      description: 'toggleDarkMode',
      onClick: () => toggleColorMode(),
    },
    {
      icon: MdMailOutline,
      description: 'message',
      onClick: () => navigate('/message'),
    },
    {
      icon: MdOutlineSearch,
      description: 'search',
      onClick: () => navigate('/search'),
    },
    {
      icon: BadgedIcon,
      description: 'notification',
      onClick: () => navigate('/notification'),
    },
  ];

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
        {mainHeaderIconPath.map(({ icon, onClick, description }) => (
          <IconButton
            key={description}
            bg="transparent"
            size="md"
            aria-label={description}
            onClick={onClick}
            color="inherit"
            icon={<Icon as={icon} boxSize="icon" />}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default MainHeader;
