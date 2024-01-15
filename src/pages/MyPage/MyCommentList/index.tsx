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
      <UnorderedList listStyleType="none" ml="0" p="20px">
        {myCommentList.length === 0 && (
          <Box textAlign="center" fontSize="14px" p="50px 0">
            작성한 댓글이 없습니다.
          </Box>
        )}
        {myCommentList.map(({ _id, comment, createdAt }) => (
          <MyCommentListItem
            key={_id}
            id={_id}
            comment={comment}
            image={image}
            username={username}
            lineClamp={3}
            createdAt={createdAt}
          />
        ))}
      </UnorderedList>
      <Footer />
    </Box>
  );
};

export default MyCommentList;
