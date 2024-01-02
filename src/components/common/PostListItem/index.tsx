import { Box, Flex } from '@chakra-ui/react';

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
    <Flex>
      <Box>
        {title} {username} {timeAgo}
      </Box>
      <Box>
        {likeCount} {commentCount}
      </Box>
    </Flex>
  );
};

export default PostListItem;
