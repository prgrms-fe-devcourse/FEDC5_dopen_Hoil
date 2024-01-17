import styled from '@emotion/styled';
import { Box, UnorderedList } from '@chakra-ui/react';
import { useMyComment } from '@/hooks/useMyComment';
import { useMyInfo } from '@/hooks/useAuth';

import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import MyCommentListItem from './MyCommentListItem';

const MyCommentList = () => {
  const { data: myInfo } = useMyInfo();
  const { data: myCommentList } = useMyComment();

  if (!myInfo || !myCommentList) {
    return;
  }
  const { username, image } = myInfo;

  return (
    <Box>
      <PageHeader pageName="내가 작성한 댓글" />
      <CommentListContainer>
        <UnorderedList listStyleType="none" ml="0" p="20px">
          {myCommentList.length === 0 && (
            <Box textAlign="center" fontSize="14px" p="50px 0">
              작성한 댓글이 없습니다.
            </Box>
          )}
          {myCommentList.map(({ _id, comment, createdAt, post }) => (
            <MyCommentListItem
              key={_id}
              id={_id}
              postId={post}
              comment={comment}
              image={image}
              username={username}
              lineClamp={3}
              createdAt={createdAt}
            />
          ))}
        </UnorderedList>
      </CommentListContainer>
      <Footer />
    </Box>
  );
};

const CommentListContainer = styled.div`
  overflow-y: auto;
  height: calc(100vh - 160px);

  &::-webkit-scrollbar {
    width: 8px; /* 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: #e2e2e2; /* 스크롤바의 색상 */

    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #fcfcfc; /*스크롤바 뒷 배경 색상*/
  }
`;

export default MyCommentList;
