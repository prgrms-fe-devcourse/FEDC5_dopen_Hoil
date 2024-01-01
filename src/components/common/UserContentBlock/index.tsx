import { Avatar, Flex, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface UserContentBlock {
  width?: string | number;
  height?: string | number;
  userImage: string;
  username: string;
  content: string | number;
  usernameFontSize?: string | number;
  contentFontSize?: string | number;
  href?: string;
  onImageClick?: () => void;
}

const UserContentBlock = ({
  width,
  height,
  userImage = '',
  content,
  username = '테스트용',
  usernameFontSize = '1.4rem',
  contentFontSize = '1.2rem',
  href,
  onImageClick,
}: UserContentBlock) => {
  const navigate = useNavigate();
  const onNavigate = () => navigate(`${href}`);
  return (
    /* 
    1. width나 heigth값이 존재할시만 적용. 
    2. href가 있을시만 네비게이팅. 만약 이미지 클릭이 있다면...고려해봐야할 사항
    */
    <Flex
      w={width && typeof width === 'string' ? width : `${width}px`}
      h={height && typeof height === 'string' ? height : `${height}px`}
      align="center"
      gap="17px"
      onClick={() => href && onNavigate()}
      cursor="pointer"
    >
      <Avatar
        src={userImage}
        boxSize="50px"
        onClick={() => onImageClick && onImageClick()}
      />
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
