import { DEFAULT_PAGE_PADDING, DEFAULT_WIDTH } from '@/constants/style';
import {
  Avatar,
  Box,
  Flex,
  FlexProps,
  IconButton,
  SystemProps,
  Text,
} from '@chakra-ui/react';
import { MdArrowForwardIos } from 'react-icons/md';

interface UserListProps extends FlexProps {
  username: string;
  userImage?: string;
  userImageSize?: SystemProps['boxSize'];
  content?: string;
}

const UserList = ({
  username,
  userImage,
  userImageSize = '40px',
  content,
  ...props
}: UserListProps) => {
  return (
    <Flex
      w={DEFAULT_WIDTH}
      pl={DEFAULT_PAGE_PADDING}
      pr={DEFAULT_PAGE_PADDING}
      h="40px"
      align="center"
      color="black"
      cursor="pointer"
      {...props}
    >
      <Avatar src={userImage} boxSize={userImageSize} />
      <Box fontWeight="medium" pl="16px" fontSize="1.4rem" flex={1}>
        <Text>{username}</Text>
        <Text>{content && content}</Text>
      </Box>
      <IconButton
        aria-label="userInfo"
        icon={<MdArrowForwardIos />}
        bg="transparent"
      />
    </Flex>
  );
};

export default UserList;
