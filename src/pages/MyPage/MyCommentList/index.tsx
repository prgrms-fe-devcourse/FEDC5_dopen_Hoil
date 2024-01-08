import { /*useMyComment,*/ useDeleteComment } from '@/hooks/useComment';
// import { useMyInfo } from '@/hooks/useAuth';
import styled from '@emotion/styled';
import {
  Box,
  Text,
  Flex,
  Avatar,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import { comments } from './data';

import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';

const MyCommentList = () => {
  // const { data: myInfo} = useMyInfo();
  // const { username, image } = myInfo;

  // const { data: myCommentList, isLoading } = useMyComment();

  // if (isLoading) {
  //   return <div>로딩중입니다...</div>;
  // }
  const { mutate } = useDeleteComment();
  const onDeleteComment = (title: string, id: string) => {
    if (confirm(`${title}을 정말 삭제하시겠습니까?`)) {
      // 제거
      mutate(id);
    }
  };

  return (
    <Box>
      <PageHeader pageName="내가 작성한 댓글" />
      <UnorderedList listStyleType="none">
        {comments.map((_id, comment) => (
          <ListItem key={_id} p="10px 0 10px" borderBottom="1px solid #D9D9D9">
            <Flex mb="10px" justifyContent="space-between">
              <Flex alignItems="center">
                <Box mr="10px">
                  <Avatar w="40px" h="40px" /*src={image ?? '기본 이미지'}*/ />
                </Box>
                <Box>
                  <Text as="strong" display="block" fontSize="1.4rem">
                    {/* {username} */} 테스트
                  </Text>
                  <Text as="span" fontSize="sm">
                    2일전
                  </Text>
                </Box>
              </Flex>
              <Box>
                <Text
                  as="a"
                  fontSize="sm"
                  color="gray.600"
                  onClick={() => onDeleteComment(String(comment), _id)}
                >
                  삭제
                </Text>
              </Box>
            </Flex>
            <Box>
              <CommentText>{comment}</CommentText>
            </Box>
          </ListItem>
        ))}
      </UnorderedList>
      <Footer />
    </Box>
  );
};

const CommentText = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 1.2rem;
`;

export default MyCommentList;
