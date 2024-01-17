import { useNavigate, useParams } from 'react-router-dom';
import { usePostDetail } from '@/hooks/usePost';
import TextCard from './TextCard';
import Post from '@/pages/PostViewPage/PostDetail/Container';
import { Flex, Box, Button } from '@chakra-ui/react';
import UserContentBlock from '@/components/common/UserContentBlock';
import { MdArticle, MdFavoriteBorder } from 'react-icons/md';
import TextIconButton from '@/components/common/TextIconButton';
import { calculateTimeDiff } from '@/utils/calculateTimeDiff';
import { useLike } from '@/hooks/useLike';
import Comments from '@/components/Comment';
import { useCheckUserAuth } from '@/hooks/useAuth';
import { convertDateToString } from '@/utils/convertDateToString';
import { useState } from 'react';
import { usePushNotification } from '@/hooks/useNotificationList';

const ReflectionDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const {
    data: { _id, title, comments, author, createdAt },
  } = usePostDetail({
    id: postId!,
  });
  const { data: myInfo } = useCheckUserAuth();
  const postData = JSON.parse(title);
  const { countLike, mutateAsync: setLike, clicked } = useLike(postId!);
  const { date, time } = convertDateToString(new Date(createdAt));
  const [isFold, setIsFold] = useState(false);
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

  const pushNotificationMutate = usePushNotification();

  const onClickLike = async () => {
    const data = await setLike();
    if (!data) {
      return;
    }
    pushNotificationMutate({
      notificationType: 'LIKE',
      notificationTypeId: data._id,
      userId: author._id,
      postId: _id,
    });
  };

  return (
    <>
      <Post gap="30px">
        <Post.Header>{postData.title}</Post.Header>
        <UserContentBlock
          username={author.username}
          userImage={author.coverImage}
          content={`${date} ${time}`}
          onClick={() => navigate(`/${author.username}`)}
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
              iconColor={clicked ? 'pink' : 'gray400'}
              fontSize="1.2rem"
              fontWeight="normal"
              textColor="gray.800"
              textLocation="right"
              onClick={onClickLike}
            />
            <TextIconButton
              TheIcon={MdArticle}
              textContent={String(comments.length)}
              boxSize="18px"
              iconColor="gray400"
              fontSize="1.2rem"
              fontWeight="normal"
              textColor="gray.800"
              textLocation="right"
            />
          </Flex>
          <Box>{calculateTimeDiff(createdAt)}</Box>
        </Post.Footer>
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

export default ReflectionDetail;
