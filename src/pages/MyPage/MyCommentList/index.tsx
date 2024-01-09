import { Box, UnorderedList } from '@chakra-ui/react';
import { useMyComment } from '@/hooks/useComment';
import { useMyInfo } from '@/hooks/useAuth';

import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import MyCommentListItem from './MyCommentListItem';

const MyCommentList = () => {
  const { data: myInfo } = useMyInfo();
  const { data: myCommentList, isLoading, isError } = useMyComment();

  if (isLoading) {
    return <Box>로딩중입니다...</Box>;
  }

  if (isError || !myCommentList) {
    return <Box>예상치 못한 오류가 발생했습니다.</Box>;
  }

  if (!myInfo) {
    return <Box>예상치 못한 오류가 발생했습니다.</Box>;
  }
  const { username, image } = myInfo;

  return (
    <Box>
      <PageHeader pageName="내가 작성한 댓글" />
      <UnorderedList listStyleType="none" p="0 20px">
        {myCommentList.map(({ _id, comment }) => (
          <MyCommentListItem
            key={_id}
            id={_id}
            comment={comment}
            image={image}
            username={username}
            lineClamp={3}
          />
        ))}
      </UnorderedList>
      <Footer />
    </Box>
  );
};

export default MyCommentList;
