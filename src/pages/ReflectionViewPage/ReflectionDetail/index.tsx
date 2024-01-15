import { useParams } from 'react-router-dom';
import { usePostDetail } from '@/hooks/usePost';
import TextCard from './TextCard';
import Post from '@/pages/PostViewPage/PostDetail/Container';
import { Flex, Box } from '@chakra-ui/react';
import UserContentBlock from '@/components/common/UserContentBlock';
import { MdArticle, MdFavoriteBorder } from 'react-icons/md';
import TextIconButton from '@/components/common/TextIconButton';
import { calculateTimeDiff } from '@/utils/calculateTimeDiff';
import { useLike } from '@/hooks/useLike';
import Comments from '@/components/Comment';
import { useCheckUserAuth } from '@/hooks/useAuth';

const ReflectionDetail = () => {
  const { postId } = useParams();
  const {
    data: { _id, title, comments, author, createdAt },
  } = usePostDetail({
    id: postId!,
  });
  const { data: myInfo } = useCheckUserAuth();
  const postData = JSON.parse(title);
  const { countLike, setLike } = useLike(postId!);

  const reflectionLists = [
    {
      title: '좋았던 일',
      content: postData.content.favorite,
    },
    {
      title: '아쉬운 일',
      content: postData.content.shame,
    },
    {
      title: '나에게 한마디',
      content: postData.content.sayToMe,
    },
  ];
  return (
    <>
      <Post gap="30px">
        <Post.Header>{postData.title}</Post.Header>
        <UserContentBlock
          username={author.username}
          userImage={author.coverImage}
          content=""
        />
        <Post.Content>
          <Flex flexDir="column" gap="10px">
            {reflectionLists.map(({ title, content }) => {
              return <TextCard key={title} header={title} body={content} />;
            })}
          </Flex>
        </Post.Content>
        <Post.Footer justifyContent="space-between">
          <Flex>
            <TextIconButton
              TheIcon={MdFavoriteBorder}
              textContent={String(countLike)}
              boxSize="18px"
              iconColor="gray.400"
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
        <Comments comments={comments} myInfo={myInfo!} _id={_id}></Comments>
      </Post>
    </>
  );
};

export default ReflectionDetail;
