import { DEFAULT_WIDTH } from '@/constants/style';
import {
  Avatar,
  Box,
  Flex,
  FlexProps,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { MdArrowForwardIos } from 'react-icons/md';

interface UserListProps extends FlexProps {
  username: string;
  userImage?: string;
  content?: string;
}

const UserList = ({
  username = '올챙이',
  userImage,
  content,
  ...props
}: UserListProps) => {
  return (
    <Flex w={DEFAULT_WIDTH} h="40px" align="center" {...props}>
      <Avatar src={userImage} />
      <Box flex={1}>
        <Text>{username}</Text>
        <Text>{content && content}</Text>
      </Box>
      <IconButton aria-label="userInfo" icon={MdArrowForwardIos} />
    </Flex>
  );
};

export default UserList;
