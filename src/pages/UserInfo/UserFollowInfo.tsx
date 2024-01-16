import { Flex, Box, Text } from '@chakra-ui/react';
import { useStudyPost } from '@/hooks/useStudy';
import { User } from '@/apis/type';

interface UserFollowInfoProps {
  followInfo: User;
}

const UserFollowInfo = ({ followInfo }: UserFollowInfoProps) => {
  const { followers, following, fullName } = followInfo;

  const { timerChannelId } = JSON.parse(fullName);
  const { studyPost: studyDay = [] } = useStudyPost({
    channelId: timerChannelId,
  });

  return (
    <Flex
      justifyContent="space-around"
      borderBottom="1px solid #D9D9D9"
      borderTop="1px solid #D9D9D9"
      padding="8px 0"
    >
      <Box fontSize="1.4rem" textAlign="center" flex="1">
        <Text>팔로워</Text>
        <Text as="strong">{followers.length}</Text>
      </Box>
      <Box fontSize="1.4rem" textAlign="center" flex="1">
        <Text>팔로우</Text>
        <Text as="strong">{following.length}</Text>
      </Box>
      <Box fontSize="1.4rem" textAlign="center" flex="1">
        <Text>공부기간</Text>
        <Text as="strong">{studyDay.length}일</Text>
      </Box>
    </Flex>
  );
};

export default UserFollowInfo;
