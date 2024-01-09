import styled from '@emotion/styled';
import { ListItem, Flex, Box, Text, Avatar } from '@chakra-ui/react';
import { useDeleteComment } from '@/hooks/useComment';

interface MyCommentListItemProps {
  id: string;
  image: string;
  username: string;
  comment: string;
  lineClamp: number;
}

const MyCommentListItem = ({
  id,
  image,
  username,
  comment,
  lineClamp = 1,
}: MyCommentListItemProps) => {
  const { mutate } = useDeleteComment();
  const onDeleteComment = (title: string, id: string) => {
    if (confirm(`${title} 댓글을 정말 삭제하시겠습니까?`)) {
      mutate(id);
    }
  };
  return (
    <ListItem key={id} p="10px 0 10px" borderBottom="1px solid #D9D9D9">
      <Flex mb="10px" justifyContent="space-between">
        <Flex alignItems="center">
          <Box mr="10px">
            <Avatar w="40px" h="40px" src={image ?? '기본 이미지'} />
          </Box>
          <Box>
            <Text as="strong" display="block" fontSize="1.4rem">
              {username}
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
            cursor="pointer"
            _hover={{ textDecoration: 'underline' }}
            onClick={() => onDeleteComment(comment, id)}
          >
            삭제
          </Text>
        </Box>
      </Flex>
      <Box>
        <CommentText lineClamp={lineClamp}>{comment}</CommentText>
      </Box>
    </ListItem>
  );
};

interface CommentTextProps {
  lineClamp: number;
}

const CommentText = styled.p<CommentTextProps>`
  display: -webkit-box;
  -webkit-line-clamp: ${({ lineClamp }) => lineClamp};
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 1.2rem;
`;

export default MyCommentListItem;
