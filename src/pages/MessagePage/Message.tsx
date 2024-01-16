import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useMessage } from '@/hooks/useMessage';
import { Box, Flex, BoxProps } from '@chakra-ui/react';
import TextDivider from '@/pages/MessagePage/TextDivider';
import MessageBox from '@/pages/MessagePage/MessageBox';
import MessageForm from './MessageForm';

const Message = ({ ...props }: BoxProps) => {
  const { userId } = useParams();
  const { messageLogs, sendMessageMutate } = useMessage(userId!);

  const onSendMessage = async (message: string) => {
    if (!userId) {
      return;
    }
    sendMessageMutate({ message, receiver: userId });
  };

  return (
    <Flex flexDir="column" gap="5" {...props}>
      {messageLogs?.map(([date, messages]) => {
        return (
          <Fragment key={date}>
            <TextDivider
              key={date}
              p="10px"
              dividerColor="gray.400"
              text={
                <Box p="2px" bgColor="gray.300">
                  {date}
                </Box>
              }
            />
            {messages.map(({ _id, type, message, time }) => {
              const { bgColor, mainTextColor, subTextColor, align } =
                styleByType(type);
              return (
                <MessageBox
                  key={_id}
                  bgColor={bgColor}
                  alignSelf={align}
                  borderRadius="10px"
                  p="4px"
                  maxW="200px"
                >
                  <MessageBox.Main fontSize="1.25rem" textColor={mainTextColor}>
                    {message}
                  </MessageBox.Main>
                  <MessageBox.Sub
                    fontSize="0.75rem"
                    alignSelf={align}
                    textColor={subTextColor}
                  >
                    {time}
                  </MessageBox.Sub>
                </MessageBox>
              );
            })}
          </Fragment>
        );
      })}
      <MessageForm
        onSuccess={onSendMessage}
        bgColor="white"
        pos="absolute"
        bottom="0"
        left="0"
        width="100%"
      />
    </Flex>
  );
};

interface StyleByTypes {
  bgColor: string;
  mainTextColor: string;
  subTextColor: string;
  align: string;
}

const styleByType = (type: 'received' | 'sent'): StyleByTypes => {
  if (type === 'received') {
    return {
      bgColor: 'white',
      mainTextColor: 'black',
      subTextColor: 'gray.600',
      align: 'flex-start',
    };
  } else {
    return {
      bgColor: 'pink.300',
      mainTextColor: 'white',
      subTextColor: 'white',
      align: 'flex-end',
    };
  }
};
export default Message;
