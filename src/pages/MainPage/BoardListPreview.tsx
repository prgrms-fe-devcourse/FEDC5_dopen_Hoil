import { DEFAULT_WIDTH } from '@/constants/style';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const DUMMY_GALLERY_DATA = [
  {
    name: '자유 게시판',
    posts: ['자유게시판 첫 번째 글', '자유게시판 두 번째 글'],
  },
  {
    name: '목표 달성 & 인증',
    posts: ['목표 달성 & 인증 첫 번째 글', '목표 달성 & 인증 두 번째 글'],
  },
  {
    name: '정보 공유 게시판',
    posts: ['정보 공유 게시판 첫 번째 글', '정보 공유 게시판 두 번째 글'],
  },
];

const BoardListPreview = () => {
  const navigate = useNavigate();

  return (
    <Flex maxW={DEFAULT_WIDTH} marginTop="30px" direction="column">
      <Flex
        borderBottom="1px"
        borderColor="gray.450"
        paddingBottom="23px"
        justifyContent="space-between"
      >
        <Text color="black" fontSize="3xl" fontWeight="medium" cursor="default">
          게시판
        </Text>
        <Button
          fontSize="md"
          color="gray.800"
          bg="white"
          onClick={() => navigate('/board')}
        >
          더 보기 <ChevronRightIcon />
        </Button>
      </Flex>
      <Flex paddingTop="23px" gap="10px" direction="column">
        {/* TODO : 게시판 목록을 불러와서 Map으로 뿌려줘야함. */}
        {DUMMY_GALLERY_DATA.map((item) => (
          <Flex
            color="black"
            alignItems="center"
            key={item.name}
            // TODO : 클릭 시 해당 게시판 목록으로 넘어가게 처리 필요.
            cursor="pointer"
          >
            <Box width="130px" fontSize="md" fontWeight="medium">
              {item.name}
            </Box>
            <Box fontSize="sm" fontWeight="medium">
              {item.posts[0]}
            </Box>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default BoardListPreview;
