import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import { IMAGE_FILE_TYPES } from '@/constants/image';
import { DEFAULT_PAGE_PADDING } from '@/constants/style';
import { useChannelInfo } from '@/hooks/useChannels';
import { useEditPost, usePostDetail, usePosting } from '@/hooks/usePost';
import { useEffect, useState } from 'react';

interface PostEditInputTypes {
  title: string;
  image?: File | null;
  content: string;
}

const PostEditPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [image, setImage] = useState<File | null>(null);

  const channelInfo = pathname.split('/')[2];
  const { channel } = useChannelInfo({ channelInfo });
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<PostEditInputTypes>({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      image: null,
      content: '',
    },
  });

  const onPostingImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file: File = e.target.files[0];
      const fileType = file.type;

      if (IMAGE_FILE_TYPES[fileType]) {
        setImage(file);
      } else {
        alert('파일 형식이 올바르지 않습니다. 이미지 파일을 업로드해 주세요.');
        e.target.value = '';
      }
    }
  };

  const onSuccessFn = () => {
    alert(`글 ${postId ? '수정' : '등록'} 성공!`);
    navigate(`/board/${channel.name}`);
  };

  const { mutate: onCreatePost } = usePosting({ onSuccessFn });
  const { mutate: onEditPost } = useEditPost({ onSuccessFn });
  const onPosting = () => {
    if (errors.title || errors.content) {
      return;
    }
    if (postId) {
      if (confirm(`[${getValues('title')}] 글을 수정 하시겠습니까?`)) {
        onEditPost({
          postId,
          title: JSON.stringify({
            title: getValues('title'),
            content: getValues('content'),
          }),
          image: image,
          channelId: channel._id,
        });
      } else {
        alert(`[${getValues('title')}] 글 수정이 취소되었습니다.`);
      }
    } else {
      if (confirm(`[${getValues('title')}] 글을 등록 하시겠습니까?`)) {
        onCreatePost({
          title: JSON.stringify({
            title: getValues('title'),
            content: getValues('content'),
          }),
          image: image,
          channelId: channel._id,
        });
      } else {
        alert(`[${getValues('title')}] 글 등록이 취소되었습니다.`);
      }
    }
  };

  const [searchParams] = useSearchParams();
  const postId = searchParams.get('id') || '';

  const { data: postData, isSuccess: isGetPostDetailSuccess } = usePostDetail({
    id: postId,
    enabled: !!postId,
  });

  useEffect(() => {
    if (!isGetPostDetailSuccess) {
      return;
    }
    const { title, content } = JSON.parse(postData.title);
    reset({ title, content });
  }, [postData, isGetPostDetailSuccess, reset]);

  return (
    <>
      <PageHeader pageName={'글 작성하기'} />
      <Flex
        flexDirection="column"
        w="100%"
        h="100vh"
        p={`10px ${DEFAULT_PAGE_PADDING}`}
        bg="gray.100"
      >
        <form onSubmit={handleSubmit(onPosting)}>
          <FormControl isInvalid={!!errors?.title?.message}>
            <Input
              fontSize="1.8rem"
              fontWeight="bold"
              color="black"
              p="15px 5px"
              variant="flushed"
              focusBorderColor="black"
              placeholder="제목을 입력해주세요."
              {...register('title', {
                required: '글의 제목은 필수입니다.',
                minLength: {
                  value: 1,
                  message: '최소 1글자 이상 입력 해주세요.',
                },
                maxLength: {
                  value: 30,
                  message: '최대 30글자까지 입력 가능합니다.',
                },
              })}
            />
            <FormErrorMessage>
              {errors?.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>
          <PostingImageFileBox>
            <label htmlFor="file">
              {image
                ? '이미지가 정상적으로 첨부되었습니다.'
                : '이미지 첨부하기'}
            </label>
            <Input
              type="file"
              id="file"
              accept="image/*"
              onChange={onPostingImage}
            />
          </PostingImageFileBox>
          <FormControl isInvalid={!!errors?.content?.message}>
            <Textarea
              h="388px"
              p="10px"
              fontSize="1.3rem"
              color="black"
              bg="white"
              focusBorderColor="black"
              placeholder="내용을 입력하세요."
              {...register('content', {
                required: '글의 내용은 필수 입니다.',
                minLength: {
                  value: 1,
                  message: '최소 1글자 이상 입력 해주세요.',
                },
                maxLength: {
                  value: 500,
                  message: '최대 500글자까지 입력 가능합니다.',
                },
              })}
            ></Textarea>
            <FormErrorMessage>
              {errors?.content && errors.content.message}
            </FormErrorMessage>
          </FormControl>
        </form>
        <Button
          h="50px"
          mt="20px"
          borderRadius="100px"
          fontSize="1.6rem"
          fontWeight="medium"
          color="white"
          bg="pink.300"
          _hover={{ bg: 'pink.400' }}
          onClick={() => onPosting()}
        >
          {postId ? '글 수정하기' : '글쓰기'}
          <EditIcon ml="5px" />
        </Button>
      </Flex>
    </>
  );
};

const PostingImageFileBox = styled.div`
  display: inline-block;
  height: 30px;
  margin: 20px 0;
  vertical-align: middle;
  width: 100%;
  border-radius: 20px;
  color: #999999;

  & > label {
    display: inline-block;
    padding: 5px;
    color: #000;
    font-size: 14px;
    font-weight: medium;
    text-align: center;
    vertical-align: middle;
    background-color: #ececec;
    border-radius: 20px;
    width: 100%;
    height: 100%;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #c5c3c3;
    }
  }

  input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }
`;

export default PostEditPage;
