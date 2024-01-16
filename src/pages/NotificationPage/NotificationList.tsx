import { AbsoluteCenter, Flex, FlexProps, Text } from '@chakra-ui/react';
import {
  useNotificationList,
  messageByTypes,
} from '@/hooks/useNotificationList';
import UserContentBlock from '@/components/common/UserContentBlock';
import { calculateTimeDiff } from '@/utils/calculateTimeDiff';

interface NotificationListProps extends FlexProps {}

const NotificationList = ({ ...props }: NotificationListProps) => {
  const { myNotificationList } = useNotificationList();

  return (
    <Flex flexDir="column" overflowY="auto" {...props}>
      {myNotificationList.length ? (
        myNotificationList.map(({ _id, type, author, date }) => {
          return (
            <UserContentBlock
              key={_id}
              username={author.username}
              content={messageByTypes[type]}
              subContent={calculateTimeDiff(date)}
            ></UserContentBlock>
          );
        })
      ) : (
        <AbsoluteCenter>
          <Text fontSize="1.5rem" as="b">
            표시할 알림이 없습니다
          </Text>
        </AbsoluteCenter>
      )}
    </Flex>
  );
};

export default NotificationList;
