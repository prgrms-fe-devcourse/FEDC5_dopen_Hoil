import styled from '@emotion/styled';
import {
  Avatar,
  FormLabel,
  Textarea,
  Image,
  Text,
  Box,
} from '@chakra-ui/react';
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
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<CommentInput>();

  const { pushComment, isSuccess } = useCreateComment();

  const onCommentValid: SubmitHandler<CommentInput> = ({ comment }) => {
    if (comment.trim().length < 1) {
      setError(
        'comment',
        { message: '댓글을 작성해주세요.' },
        { shouldFocus: true },
      );
      return;
    }
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
    <Box>
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
          {...register('comment', {
            maxLength: {
              value: 100,
              message: '댓글을 100자 이하로 작성해주세요.',
            },
          })}
        />
        <Button>
          <Image src="/assets/send.svg" alt="comment send" />
        </Button>
      </Form>
      <Text m="5px 0 0 55px" fontSize="1.2rem" color="pink.300">
        {errors && errors['comment'] && errors['comment']?.message}
      </Text>
    </Box>
  );
};

const Form = styled.form`
  display: flex;
  align-items: center;
`;

const Button = styled.button``;

export default CommentForm;
