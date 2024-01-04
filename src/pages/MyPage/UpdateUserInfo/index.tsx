import styled from '@emotion/styled';
import { DEFAULT_WIDTH } from '@/constants/style';
import { SubmitButton, Input } from '@/pages/SignUp';
import {
  Box,
  Flex,
  Avatar,
  Text,
  FormControl,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';

const UpdateUserInfo = () => {
  return (
    <FormControl
      maxW={DEFAULT_WIDTH}
      margin="0 auto"
      border="1px solid"
      h="100vh"
      padding="30px 20px"
    >
      <UnorderedList ml="0">
        <ListItem listStyleType="none" mb="30px">
          <Flex alignItems="center">
            <Box w="118px" mr="32px">
              <Avatar
                size="118px"
                name="프로필 이미지 등록하기"
                src="https://via.placeholder.com/118x118"
              ></Avatar>
            </Box>
            <Box w="calc(100% - 150px)">
              <ProfileUploadFileBox>
                <label htmlFor="file">프로필 이미지 업로드</label>
                <input type="file" id="file" />
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
        <ListItem listStyleType="none" mb="15px">
          <Text as="strong" fontSize="14px">
            이메일
          </Text>
          <Input type="text" disabled />
        </ListItem>
        <ListItem listStyleType="none" mb="15px">
          <Text as="strong" fontSize="14px">
            이름
          </Text>
          <Input type="text" />
        </ListItem>
        <ListItem listStyleType="none" mb="15px">
          <Text as="strong" fontSize="14px">
            닉네임
          </Text>
          <Input type="text" />
        </ListItem>
        <ListItem listStyleType="none" mb="15px">
          <Text as="strong" fontSize="14px">
            비밀번호
          </Text>
          <Input type="password" />
        </ListItem>
        <ListItem listStyleType="none" mb="15px">
          <Text as="strong" fontSize="14px">
            비밀번호 확인
          </Text>
          <Input type="password" />
        </ListItem>
      </UnorderedList>
      <SubmitButton>회원정보 수정</SubmitButton>
      <SubmitButton style={{ backgroundColor: '#A09ABD', marginTop: '18px' }}>
        회원탈퇴
      </SubmitButton>
    </FormControl>
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
