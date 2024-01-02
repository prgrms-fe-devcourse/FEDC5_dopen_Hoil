import { DEFAULT_PAGE_PADDING, DEFAULT_WIDTH } from '@/constants/style';
import { Flex, Text, VStack } from '@chakra-ui/react';
import TextIconButton from '../TextIconButton';
import { MdFavorite } from 'react-icons/md';

interface PostListItemProps {
  title: string;
  username: string;
  timeAgo: string;
  likeCount: number;
  commentCount: number;
}

const PostListItem = ({
  title,
  username,
  timeAgo,
  likeCount,
  commentCount,
}: PostListItemProps) => {
  return (
    <Flex
      w={DEFAULT_WIDTH}
      h="67px"
      pl={DEFAULT_PAGE_PADDING}
      pr={DEFAULT_PAGE_PADDING}
      border="1px solid black"
      align="center"
      justify="space-between"
    >
      <VStack spacing="0" align="left">
        <Text color="black" fontSize="1.4rem" fontWeight="semibold">
          {title}
        </Text>
        <Text color="gray.800" fontSize="1.2rem" fontWeight="medium">
          {username}
        </Text>
        <Text color="gray.600" fontSize="1.2rem">
          {timeAgo}
        </Text>
      </VStack>
      <VStack spacing="0">
        <TextIconButton
          TheIcon={MdFavorite}
          textContent={likeCount.toString()}
        />
        {commentCount}
      </VStack>
    </Flex>
  );
};

export default PostListItem;
