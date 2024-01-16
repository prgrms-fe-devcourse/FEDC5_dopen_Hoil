import styled from '@emotion/styled';
import { Avatar, FormLabel, Textarea, Image } from '@chakra-ui/react';
import { useCreateComment } from '@/hooks/useComment';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';

interface CommentFormProps {
  id: string;
  image: string;
}

export interface CommentInput {
  comment: string;
}

const CommentForm = ({ id, image }: CommentFormProps) => {
  const { register, handleSubmit, reset } = useForm<CommentInput>();

  const { pushComment, isSuccess } = useCreateComment();

  const onCommentValid: SubmitHandler<CommentInput> = ({ comment }) => {
    pushComment({ comment, postId: id });
    reset();
  };

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    const scrollPosition = document.body.scrollHeight + 70;
    setTimeout(() => window.scrollTo(0, scrollPosition), 100);
  }, [isSuccess]);

  return (
    <Form onSubmit={handleSubmit(onCommentValid)}>
      <FormLabel htmlFor="comment" m="0">
        <Avatar w="40px" h="40px" src={image} />
      </FormLabel>
      <Textarea
        resize="none"
        bgColor="gray.200"
        w="calc(100% - 84px)"
        h="40px"
        borderRadius="5px"
        margin="0 10px"
        placeholder="댓글을 입력해주세요."
        id="comment"
        {...register('comment', {})}
      />
      <Button>
        <Image src="/src/assets/send.svg" alt="comment send" />
      </Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  align-items: center;
`;

const Button = styled.button``;

export default CommentForm;
