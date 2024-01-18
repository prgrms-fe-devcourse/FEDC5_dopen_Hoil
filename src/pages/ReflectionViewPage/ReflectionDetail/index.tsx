import { useNavigate, useParams } from 'react-router-dom';
import { usePostDetail } from '@/hooks/usePost';
import TextCard from './TextCard';
import Post from '@/pages/PostViewPage/PostDetail/Container';
import { Flex, Box, Button, Text, Portal } from '@chakra-ui/react';
import UserContentBlock from '@/components/common/UserContentBlock';
import { MdArticle, MdFavoriteBorder } from 'react-icons/md';
import TextIconButton from '@/components/common/TextIconButton';
import { calculateTimeDiff } from '@/utils/calculateTimeDiff';
import { useLike } from '@/hooks/useLike';
import Comments from '@/components/Comment';
import { useCheckUserAuth } from '@/hooks/useAuth';
import { convertDateToString } from '@/utils/convertDateToString';
import { useRef, useState } from 'react';
import { usePushNotification } from '@/hooks/useNotificationList';
import { ArrowDownIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { deletePost } from '@/apis/post';
import Settings from '@/pages/PostViewPage/PostDetail/Settings';
import { useConfirmModal } from '@/hooks/useConfirmModal';
import Confirm from '@/components/common/Confirm';

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
  const { isOpen, open, close, handleConfirm, message } = useConfirmModal();

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

  const settingsOption = [
    {
      text: '수정하기',
      show: author._id === myInfo?._id,
      confirmText: '수정하시겠습니까?',
      icon: <EditIcon />,
      onClick: () => {
        navigate(`/board/reflection/post?id=${postId}`);
      },
    },
    {
      text: '삭제하기',
      show: author._id === myInfo?._id,
      confirmText: '삭제하시겠습니까?',
      icon: <DeleteIcon />,
      onClick: async () => {
        await deletePost(postId!);
        navigate(-1);
      },
    },
  ];

  const pageEndRef = useRef<HTMLDivElement | null>(null);
  const isMyPost = myInfo?.posts?.some((post) => post._id === postId);

  return (
    <>
      <Post gap="30px">
        <Post.Header>{postData.title}</Post.Header>
        <Flex>
          <UserContentBlock
            username={author.username}
            userImage={author.coverImage}
            content={`${date} ${time}`}
            onClick={() => navigate(`/${author.username}`)}
          />
          {isMyPost && (
            <Settings>
              {settingsOption.map(
                ({ text, icon, onClick, confirmText, show }) => {
                  if (!show) {
                    return null;
                  }
                  return (
                    <Button
                      w="100%"
                      fontSize="1.3rem"
                      key={text}
                      onClick={() => open(onClick, confirmText || '')}
                    >
                      {icon}
                      <Text as="span" pl="5px">
                        {text}
                      </Text>
                    </Button>
                  );
                },
              )}
            </Settings>
          )}
        </Flex>
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
        <Button onClick={() => setIsFold(!isFold)}>
          {isFold ? '댓글 펼치기' : '댓글 접기'}
        </Button>
        {!isFold && (
          <Comments comments={comments} myInfo={myInfo!} _id={_id}></Comments>
        )}
      </Post>
      {isOpen && (
        <Confirm
          onConfirm={handleConfirm}
          onCancel={close}
          comment={message || '진행하시겠습니까?'}
        />
      )}
      <Portal>
        <Box pos="absolute" top="5" left="5">
          <ArrowDownIcon
            color="gray.500"
            w="30"
            h="30"
            onClick={() => {
              pageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
          ></ArrowDownIcon>
        </Box>
      </Portal>
    </>
  );
};

export default ReflectionDetail;
