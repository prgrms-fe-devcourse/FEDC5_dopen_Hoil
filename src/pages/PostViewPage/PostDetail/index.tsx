import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { MdArticle, MdFavoriteBorder } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useCheckUserAuth } from '@/hooks/useAuth';
import { useLike } from '@/hooks/useLike';
import { usePostDetail } from '@/hooks/usePost';
import { useConfirmModal } from '@/hooks/useConfirmModal';
import { calculateTimeDiff } from '@/utils/calculateTimeDiff';
import { deletePost } from '@/apis/post';

import Confirm from '@/components/common/Confirm';
import Comments from '@/components/Comment';
import TextIconButton from '@/components/common/TextIconButton';
import UserContentBlock from '@/components/common/UserContentBlock';
import Post from './Container';
import Settings from './Settings';
import { convertDateToString } from '@/utils/convertDateToString';
import { usePushNotification } from '@/hooks/useNotificationList';

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [isFold, setIsFold] = useState<boolean>(false);
  const { data: myInfo } = useCheckUserAuth();
  const {
    data: { _id, title, comments, author, createdAt },
  } = usePostDetail({
    id: postId!,
    enabled: !!postId,
  })!;
  const postData = JSON.parse(title);
  const { date, time } = convertDateToString(new Date(createdAt));
  const { countLike, mutateAsync: setLIke, clicked } = useLike(postId!);

  const { isOpen, open, close, handleConfirm, message } = useConfirmModal();

  const pushNotificationMutate = usePushNotification();

  const onClickLike = async () => {
    const data = await setLIke();
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
      show: true,
      confirmText: '수정하시겠습니까?',
      icon: <EditIcon />,
      onClick: () => {
        navigate('/board');
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

  return (
    <>
      <Post gap="10px">
        <Flex flexDir="column" pos="relative" gap="10px">
          <Post.Header minH="30px">
            <Flex justifyContent="space-between">
              <Box>{postData.title}</Box>
              <Settings>
                {settingsOption.map(
                  ({ text, icon, onClick, confirmText, show }) => {
                    if (!show) {
                      return null;
                    }
                    return (
                      <Button
                        key={text}
                        onClick={() => open(onClick, confirmText || '')}
                      >
                        {icon}
                        {text}
                      </Button>
                    );
                  },
                )}
              </Settings>
            </Flex>
          </Post.Header>
          <UserContentBlock
            username={author.username}
            userImage={author.coverImage}
            content={`${date} ${time}`}
            onClick={() => navigate(`/${author.username}`)}
          />
          <Post.Content paddingTop="10px" paddingBottom="10px">
            <Text fontSize="1.5rem">{postData.content}</Text>
          </Post.Content>
          <Post.Footer justifyContent="space-between">
            <Flex>
              <TextIconButton
                TheIcon={MdFavoriteBorder}
                textContent={String(countLike)}
                boxSize="18px"
                iconColor={clicked ? 'pink' : 'gray.400'}
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
      <Box>
        {!isFold && (
          <Comments comments={comments} myInfo={myInfo!} _id={_id}></Comments>
        )}
      </Box>
      {isOpen && (
        <Confirm
          onConfirm={handleConfirm}
          onCancel={close}
          comment={message || '진행하시겠습니까?'}
        />
      )}
    </>
  );
};

export default PostDetail;
