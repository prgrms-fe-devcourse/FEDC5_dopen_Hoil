import { Box, Button, Flex, Image, Portal, Text } from '@chakra-ui/react';
import { ArrowDownIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { MdArticle, MdFavoriteBorder } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useCheckUserAuth } from '@/hooks/useAuth';
import { useLike } from '@/hooks/useLike';
import { useMyPostList, usePostDetail } from '@/hooks/usePost';
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
  const { boardName, postId } = useParams();
  const navigate = useNavigate();
  const [isFold, setIsFold] = useState<boolean>(false);
  const { data: myInfo } = useCheckUserAuth();
  const {
    data: { _id, title, comments, author, createdAt, image },
  } = usePostDetail({
    id: postId!,
    enabled: !!postId,
  })!;
  const postData = JSON.parse(title);
  const { date, time } = convertDateToString(new Date(createdAt));
  const { countLike, mutateAsync: setLike, clicked } = useLike(postId!);

  const { isOpen, open, close, handleConfirm, message } = useConfirmModal();
  const { data: myPosts } = useMyPostList();
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
  const settingsOption = [
    {
      text: '수정하기',
      show: author._id === myInfo?._id,
      confirmText: '수정하시겠습니까?',
      icon: <EditIcon />,
      onClick: () => {
        navigate(`/board/${boardName}/post?id=${postId}`);
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
  const isMyPost = myPosts?.some((post) => post._id === postId);
  return (
    <>
      <Post gap="10px" pos="relative">
        <Flex flexDir="column" gap="10px">
          <Post.Header minH="30px">
            <Flex pos="relative" justifyContent="space-between">
              <Box>{postData.title}</Box>
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
          </Post.Header>
          <UserContentBlock
            username={author.username}
            userImage={author.image}
            content={`${date} ${time}`}
            onImageClick={() => navigate(`/${author.username}`)}
          />
          <Post.Content paddingTop="10px" paddingBottom="10px">
            <Image
              src={image}
              objectFit="cover"
              maxH="100%"
              // fallbackSrc="https://via.placeholder.com/150"
            />
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
        <Button onClick={() => setIsFold(!isFold)} m="0 20px">
          {isFold ? '댓글 펼치기' : '댓글 접기'}
        </Button>
        {!isFold && (
          <Comments
            comments={comments}
            myInfo={myInfo!}
            author={author._id}
            _id={_id}
            bottom="0"
          ></Comments>
        )}
      </Post>
      <div ref={pageEndRef} />
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

export default PostDetail;
