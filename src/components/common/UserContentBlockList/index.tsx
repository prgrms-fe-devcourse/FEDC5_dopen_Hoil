import { Divider, Flex } from '@chakra-ui/react';
import UserContentBlock from '@/components/common/UserContentBlock';

interface UserDataListProps {
  userDataList: {
    coverImage: string;
    username: string;
    subContent: string;
    content?: string;
  }[];
  flexDir?: 'row' | 'column';
}

const UserContentBlockList = ({
  userDataList,
  flexDir = 'column',
}: UserDataListProps) => {
  return (
    <Flex flexDir={flexDir || 'row'} gap="5">
      {userDataList.map(({ coverImage, username, subContent, content }) => (
        <>
          <UserContentBlock
            key={username}
            userImage={coverImage}
            username={username}
            subContent={subContent}
            content={content || ''}
          />
          <Divider />
        </>
      ))}
    </Flex>
  );
};

export default UserContentBlockList;
