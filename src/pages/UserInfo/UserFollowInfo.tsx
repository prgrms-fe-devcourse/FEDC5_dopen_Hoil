import { User } from '@/apis/type';
import { Flex, Box, Text } from '@chakra-ui/react';

interface UserFollowInfoProps {
  followInfo: User;
}

const UserFollowInfo = ({ followInfo }: UserFollowInfoProps) => {
  const { followers, following } = followInfo;
  return (
    <Flex
      justifyContent="space-around"
      borderBottom="1px solid #D9D9D9"
      borderTop="1px solid #D9D9D9"
      padding="8px 0"
    >
      <Box fontSize="1.4rem" textAlign="center">
        <Text>팔로워</Text>
        <Text as="strong">{followers.length}</Text>
      </Box>
      <Box fontSize="1.4rem" textAlign="center">
        <Text>팔로우</Text>
        <Text as="strong">{following.length}</Text>
      </Box>
      <Box fontSize="1.4rem" textAlign="center">
        <Text>공부시간</Text>
        <Text as="strong">50</Text>
      </Box>
    </Flex>
  );
};

export default UserFollowInfo;
