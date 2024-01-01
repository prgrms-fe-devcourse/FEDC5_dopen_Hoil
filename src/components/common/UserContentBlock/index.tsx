import { Avatar, Flex, Text, VStack } from '@chakra-ui/react';

interface UserContentBlock {
  width?: string | number;
  height?: string | number;
  userImage: string;
  username: string;
  content: string | number;
  usernameFontSize?: string | number;
  contentFontSize?: string | number;
}

const UserContentBlock = ({
  width,
  height,
  userImage = '',
  content,
  username = '테스트용',
  usernameFontSize = '1.4rem',
  contentFontSize = '1.2rem',
}: UserContentBlock) => {
  return (
    /* width나 heigth값이 존재할시만 적용. */
    <Flex
      w={width && typeof width === 'string' ? width : `${width}px`}
      h={height && typeof height === 'string' ? height : `${height}px`}
      align="center"
      gap="17px"
    >
      <Avatar src={userImage} boxSize="50px" />
      <VStack align="left">
        <Text
          fontSize={
            typeof usernameFontSize === 'string'
              ? usernameFontSize
              : `${usernameFontSize}px`
          }
        >
          {username}
        </Text>
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
