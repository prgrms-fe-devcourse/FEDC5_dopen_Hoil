import PageHeader from '@/components/PageHeader';
import { POST_IMAGE_TYPES } from '@/constants/post';
import { DEFAULT_PAGE_PADDING } from '@/constants/style';
import { useChannelInfo } from '@/hooks/useChannels';
import { Button, Flex, Input, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { EditIcon } from '@chakra-ui/icons';
import { CreatePostPayload } from '@/apis/post';
import { usePosting } from '@/hooks/usePost';

const PostEditPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [contents, setContents] = useState({
    title: '',
    content: '',
  });
  const [image, setImage] = useState<File | null>(null);

  const channelInfo = pathname.split('/')[2];
  const { channel } = useChannelInfo({ channelInfo });
  const { handleSubmit } = useForm<CreatePostPayload>();

  const onPostingImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file: File = e.target.files[0];
      const fileType = file.type;

      if (POST_IMAGE_TYPES[fileType]) {
        setImage(file);
      } else {
        alert('파일 형식이 올바르지 않습니다. 이미지 파일을 업로드해 주세요.');
        e.target.value = '';
      }
    }
  };

  const onSuccessFn = () => {
    alert('글 등록 성공!');
    navigate(`/board/${channel.name}`);
  };

  const { mutate } = usePosting({ onSuccessFn });
  const onPosting = () => {
    if (confirm(`[${contents.title}] 글을 등록 하시겠습니까?`)) {
      mutate({
        title: JSON.stringify(contents),
        image: image,
        channelId: channel._id,
      });
    } else {
      alert(`[${contents.title}] 글 등록이 취소되었습니다.`);
    }
  };

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
          <Input
            fontSize="1.8rem"
            fontWeight="bold"
            color="black"
            p="15px 5px"
            variant="flushed"
            focusBorderColor="black"
            placeholder="제목을 입력해주세요."
            value={contents.title}
            onChange={(e) =>
              setContents({ ...contents, title: e.target.value })
            }
          />
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
          <Textarea
            h="388px"
            p="10px"
            fontSize="1.3rem"
            color="black"
            bg="white"
            focusBorderColor="black"
            value={contents.content}
            onChange={(e) =>
              setContents({ ...contents, content: e.target.value })
            }
            placeholder="내용을 입력하세요."
          ></Textarea>
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
          글쓰기
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
