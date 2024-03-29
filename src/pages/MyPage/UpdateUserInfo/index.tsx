import { useState } from 'react';
import styled from '@emotion/styled';
import {
  Box,
  Flex,
  Avatar,
  Text,
  UnorderedList,
  ListItem,
  FormLabel,
  useColorModeValue,
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { USER_INPUT_LIST } from '@/pages/SignUp/userInputList';
import { Button, Input, Form } from '@/pages/SignUp';
import { validateUserInfo } from '@/pages/SignUp/validateUserInfo';
import { preparing } from '@/pages/Login/preparing';
import { UserInfoInput } from '@/types/user';
import { PROFILE_IMAGE_TYPES } from '@/constants/user';
import { useUpdateInfo } from '@/hooks/useAuth';

interface userInfoTypes {
  image: string;
  email: string;
  fullName: string;
  username: string;
  timerChannelId: string;
}

const UpdateUserInfo = ({
  image,
  email,
  fullName,
  username,
  timerChannelId,
}: userInfoTypes) => {
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string>(image || '');

  const inputBgColor = useColorModeValue('#F0F0F0F0', '#141414');

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<UserInfoInput>({
    defaultValues: {
      email,
      fullName,
      username,
    },
  });

  const onSuccessFn = () => {
    alert('회원정보 수정 완료');
    navigate(-1);
  };

  const { mutate } = useUpdateInfo({
    onSuccessFn,
    profileImageFile,
    newUserInfo: { ...getValues(), timerChannelId },
  });

  // 프로필 이미지 변경
  const onProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file: File = event.target.files[0];
      const fileType = file.type;

      if (PROFILE_IMAGE_TYPES[fileType]) {
        const profileImage = URL.createObjectURL(file);
        setProfilePreview(profileImage);
        setProfileImageFile(file);
      } else {
        alert('파일 형식이 올바르지 않습니다. 이미지 파일을 업로드해 주세요.');
        event.target.value = '';
      }
    }
  };

  const onUpdateUserInfoValid: SubmitHandler<UserInfoInput> = async (data) =>
    await validateUserInfo({ userData: data, setError, onSuccess: mutate });

  return (
    <Form
      style={{
        width: '100%',
        margin: '0 auto',
        height: '100vh',
        padding: '30px 20px',
      }}
      onSubmit={handleSubmit(onUpdateUserInfoValid)}
    >
      <UnorderedList ml="0">
        <ListItem mb="30px" listStyleType="none">
          <Flex alignItems="center">
            <Box w="118px" h="118px" mr="32px">
              <Avatar
                w="118px"
                h="118px"
                src={profilePreview ? profilePreview : ''}
              />
            </Box>
            <Box w="calc(100% - 150px)">
              <ProfileUploadFileBox>
                <label htmlFor="file">프로필 이미지 업로드</label>
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={onProfileImageChange}
                />
              </ProfileUploadFileBox>
              <Text
                fontSize="sm"
                color="gray.600"
                wordBreak="keep-all"
                mt="15px"
              >
                이미지 사이즈는 300x300 JPG, PNG, GIF 파일로 업로드 해주세요.
              </Text>
            </Box>
          </Flex>
        </ListItem>
        {USER_INPUT_LIST.map(({ name, label, type, required, validate }) => (
          <ListItem listStyleType="none" mb="15px" key={name}>
            <FormLabel htmlFor={name} fontSize="14px">
              {label}
            </FormLabel>
            <Input
              bgColor={inputBgColor}
              type={type}
              id={name}
              required={name === 'email' ? false : required}
              disabled={name === 'email' ? true : false}
              {...register(name, {
                ...validate,
              })}
            />
            <Text mt={2} color="pink.300" fontSize="sm">
              {errors?.[name]?.message}
            </Text>
          </ListItem>
        ))}
      </UnorderedList>
      <Button>회원정보 수정</Button>
      <Button
        type="button"
        style={{ backgroundColor: '#A09ABD', marginTop: '18px' }}
        onClick={preparing}
      >
        회원탈퇴
      </Button>
    </Form>
  );
};

const ProfileUploadFileBox = styled.div`
  display: inline-block;
  height: 42px;
  vertical-align: middle;
  width: 100%;
  border-radius: 20px;
  color: #999999;

  & > label {
    display: inline-block;
    padding: 10px 20px;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    vertical-align: middle;
    background-color: #f88585;
    border-radius: 20px;
    width: 100%;
    height: 100%;
    cursor: pointer;
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

export default UpdateUserInfo;
