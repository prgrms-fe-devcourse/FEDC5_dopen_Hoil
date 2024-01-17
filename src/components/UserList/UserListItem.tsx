import { DEFAULT_PAGE_PADDING } from '@/constants/style';
import {
  Avatar,
  Flex,
  FlexProps,
  IconButton,
  SystemProps,
  Text,
} from '@chakra-ui/react';
import { MdArrowForwardIos } from 'react-icons/md';

interface UserListItemProps extends FlexProps {
  username: string;
  userImage?: string;
  userImageSize?: SystemProps['boxSize'];
  content?: string;
}

const UserListItem = ({
  username,
  userImage,
  userImageSize = '40px',
  content,
  ...props
}: UserListItemProps) => {
  return (
    <Flex
      w="100%"
      p={`5px ${DEFAULT_PAGE_PADDING}`}
      h="50px"
      align="center"
      cursor="pointer"
      {...props}
    >
      <Avatar src={userImage} boxSize={userImageSize} />
      <Flex
        fontWeight="medium"
        pl="16px"
        fontSize="1.4rem"
        flex={1}
        justify="space-between"
        pr="16px"
      >
        <Text>{username}</Text>
        <Text>{content && content}</Text>
      </Flex>
      <IconButton
        aria-label="userInfo"
        icon={<MdArrowForwardIos />}
        bg="transparent"
        color="gray.700"
      />
    </Flex>
  );
};

export default UserListItem;
