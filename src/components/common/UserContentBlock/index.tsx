import { DEFAULT_PAGE_PADDING, DEFAULT_WIDTH } from '@/constants/style';
import {
  Avatar,
  AvatarBadge,
  Flex,
  FlexProps,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface UserContentBlockProps extends FlexProps {
  userImage?: string;
  userImageSize?: string | number;
  isOnline?: boolean;
  username: string;
  content: string;
  subContent?: string;
  usernameFontSize?: string | number;
  contentFontSize?: string | number;
  href?: string;
  onSubContentClick?: () => void;
}

const UserContentBlock = ({
  userImage = '',
  userImageSize = '50px',
  href,
  content,
  isOnline,
  subContent,
  onSubContentClick,
  username = '테스트용',
  usernameFontSize = '1.4rem',
  contentFontSize = '1.2rem',
  ...props
}: UserContentBlockProps) => {
  const navigate = useNavigate();
  const onNavigate = () => navigate(`${href}`);
  return (
    <Flex
      w={DEFAULT_WIDTH}
      align="center"
      gap="17px"
      onClick={() => href && onNavigate()}
      cursor="pointer"
      pl={DEFAULT_PAGE_PADDING}
      pr={DEFAULT_PAGE_PADDING}
      {...props}
    >
      <Avatar
        src={userImage}
        boxSize={
          userImageSize && typeof userImageSize === 'string'
            ? userImageSize
            : `${userImageSize}px`
        }
        boxShadow="0px 5px 15px -5px gray"
      >
        {isOnline && (
          <AvatarBadge
            boxSize="14px"
            border="2px solid white"
            bg="green.100"
            right="5%"
            bottom="5%"
          />
        )}
      </Avatar>
      <VStack flex="1" align="left" color="black">
        <Flex w="100%" position="relative">
          <Text
            fontWeight="semibold"
            fontSize={
              typeof usernameFontSize === 'string'
                ? usernameFontSize
                : `${usernameFontSize}px`
            }
          >
            {username}
          </Text>
          <Text
            fontSize="1.2rem"
            position="absolute"
            right="0"
            zIndex="normal"
            cursor={onSubContentClick && 'pointer'}
            onClick={() => onSubContentClick && onSubContentClick()}
          >
            {subContent}
          </Text>
        </Flex>
        <Text
          fontSize={
            typeof contentFontSize === 'string'
              ? contentFontSize
              : `${contentFontSize}px`
          }
        >
          {content}
        </Text>
      </VStack>
    </Flex>
  );
};

export default UserContentBlock;
