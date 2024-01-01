import { DEFAULT_PAGE_PADDING, DEFAULT_WIDTH } from '@/constants/style';
import { Avatar, Flex, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface UserContentBlock {
  width?: string | number;
  height?: string | number;
  userImage?: string;
  userImageSize?: string | number;
  username: string;
  content: string | number;
  subContent?: string;
  usernameFontSize?: string | number;
  contentFontSize?: string | number;
  href?: string;
}

const UserContentBlock = ({
  width = DEFAULT_WIDTH,
  height,
  userImage = '',
  userImageSize = '50px',
  content,
  subContent = '7일전',
  username = '테스트용',
  usernameFontSize = '1.4rem',
  contentFontSize = '1.2rem',
  href,
}: UserContentBlock) => {
  const navigate = useNavigate();
  const onNavigate = () => navigate(`${href}`);
  return (
    <Flex
      w={typeof width === 'string' ? width : `${width}px`}
      h={height && typeof height === 'string' ? height : `${height}px`}
      align="center"
      gap="17px"
      onClick={() => href && onNavigate()}
      cursor="pointer"
      pl={DEFAULT_PAGE_PADDING}
      pr={DEFAULT_PAGE_PADDING}
    >
      <Avatar
        src={userImage}
        boxSize={
          userImageSize && typeof userImageSize === 'string'
            ? userImageSize
            : `${userImageSize}px`
        }
      />
      <VStack flex="1" align="left" color="black">
        <Flex w="100%" justify="space-between">
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
          <Text fontSize="1.2rem">{subContent}</Text>
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
