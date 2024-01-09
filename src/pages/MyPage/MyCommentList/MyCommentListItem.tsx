import styled from '@emotion/styled';
import { ListItem, Box } from '@chakra-ui/react';
import { useDeleteComment } from '@/hooks/useMyComment';

import UserContentBlock from '@/components/common/UserContentBlock';

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
      <UserContentBlock
        userImage={image}
        userImageSize="40px"
        username={username}
        isOnline={false}
        content="2일전"
        subContent="취소"
        onSubContentClick={() => onDeleteComment(comment, id)}
      />
      <Box mt="10px">
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
  font-size: 1.3rem;
`;

export default MyCommentListItem;
