import { useNavigate } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';

import { useMyInfo } from '@/hooks/useAuth';
import { useMyPostList } from '@/hooks/usePost';

import PostListItem from '@/components/PostList/PostListItem';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import { calculateTimeDiff } from '@/utils/calculateTimeDiff';
import { FREE, INFOSHARE, REFLECTION } from './boardChannelId';

type Channel = typeof FREE | typeof REFLECTION | typeof INFOSHARE;

const MyBoardList = () => {
  const navigate = useNavigate();
  const { data: myInfo } = useMyInfo();
  const { data: postList = [] } = useMyPostList();

  if (!myInfo) {
    return;
  }

  const { timerChannelId } = JSON.parse(myInfo.fullName);
  const myPostList = postList.filter((post) => post.channel !== timerChannelId);

  const onPostDetail = (id: string, channel: Channel) => {
    switch (channel) {
      case FREE:
        navigate(`/board/free/${id}`);
        break;
      case REFLECTION:
        navigate(`/board/reflection/${id}`);
        break;
      case INFOSHARE:
        navigate(`/board/infoshare/${id}`);
        break;
    }
  };

  return (
    <Flex flex="1" flexDir="column">
      <PageHeader pageName="내가 작성한 게시글" />
      <Box flex="1" padding="0 0 20px">
        {myPostList.length === 0 && (
          <Box textAlign="center" fontSize="14px" p="50px 0">
            작성한 게시글이 없습니다.
          </Box>
        )}
        {myPostList.map(
          ({ _id: id, title, createdAt, likes, comments, channel }) => (
            <PostListItem
              key={id}
              title={JSON.parse(title).title}
              timeAgo={calculateTimeDiff(createdAt) || ''}
              username=""
              likeCount={likes.length}
              commentCount={comments.length}
              style={{ borderBottom: '1px solid' }}
              onClick={() => onPostDetail(id, channel as unknown as Channel)}
            />
          ),
        )}
      </Box>
      <Footer />
    </Flex>
  );
};

export default MyBoardList;
