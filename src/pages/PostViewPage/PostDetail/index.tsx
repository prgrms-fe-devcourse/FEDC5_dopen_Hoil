import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdArticle, MdFavoriteBorder } from 'react-icons/md';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { usePostDetail } from '@/hooks/usePost';
import { useCheckUserAuth } from '@/hooks/useAuth';
import TextIconButton from '@/components/common/TextIconButton';
import Comments from '@/components/Comment';
import UserContentBlock from '@/components/common/UserContentBlock';
import { calculateTimeDiff } from '@/utils/calculateTimeDiff';
import Post from './Container';
import { useLike } from '@/hooks/useLike';

const PostDetail = () => {
  const { postId } = useParams();
  const [isFold, setIsFold] = useState<boolean>(false);
  const { data: myInfo } = useCheckUserAuth();
  const { countLike, setLike } = useLike(postId!);
  const { _id, title, comments, author, createdAt, content } = usePostDetail({
    id: postId!,
  });
  return (
    <>
      <Post>
        <Flex flexDir="column" pos="relative" gap="10px">
          <Post.Header minH="30px">{title}</Post.Header>
          <UserContentBlock
            username={author.username}
            userImage={author.coverImage}
            content=""
          />
          <Post.Content paddingTop="10px" paddingBottom="10px">
            <Text fontSize="1.5rem">{content}</Text>
          </Post.Content>
          <Post.Footer justifyContent="space-between">
            <Flex>
              <TextIconButton
                TheIcon={MdFavoriteBorder}
                textContent={String(countLike)}
                boxSize="18px"
                iconColor={countLike > 0 ? 'pink' : 'gray.400'}
                fontSize="1.2rem"
                fontWeight="normal"
                textColor="gray.800"
                textLocation="right"
                onClick={() => setLike()}
              />
              <TextIconButton
                TheIcon={MdArticle}
                textContent={String(comments.length)}
                boxSize="18px"
                iconColor="gray.400"
                fontSize="1.2rem"
                fontWeight="normal"
                textColor="gray.800"
                textLocation="right"
              />
            </Flex>
            <Box>{calculateTimeDiff(createdAt)}</Box>
          </Post.Footer>
        </Flex>
      </Post>
      <Button onClick={() => setIsFold(!isFold)}>
        {isFold ? '댓글 펼치기' : '댓글 접기'}
      </Button>
      {!isFold && (
        <Comments comments={comments} myInfo={myInfo!} _id={_id}></Comments>
      )}
    </>
  );
};

export default PostDetail;
