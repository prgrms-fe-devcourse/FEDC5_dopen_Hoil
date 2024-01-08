import {
  Input,
  Button,
  Flex,
  Box,
  BoxProps,
  FormControl,
} from '@chakra-ui/react';
import { useMessageForm } from '@/hooks/useMessageForm';
import { sendMessage } from '@/apis/message';

interface MessageFormProps extends BoxProps {
  userId: string;
  onSuccess: () => void;
}

const MessageForm = ({ userId, onSuccess, ...props }: MessageFormProps) => {
  const { registeredOption, onSubmit, isSubmitting, isValid } = useMessageForm({
    onSubmit: async (message) => {
      await sendMessage({ message, receiver: userId });
      onSuccess();
    },
  });

  return (
    <Box {...props}>
      <form onSubmit={onSubmit}>
        <FormControl>
          <Flex p="5" borderTop="1px solid pink" position="relative">
            <Input
              {...registeredOption}
              display="inline"
              border="1px solid white"
              borderRadius="10"
            />
            <Button
              type="submit"
              isLoading={isSubmitting}
              isDisabled={!isValid}
            >
              전송
            </Button>
          </Flex>
        </FormControl>
      </form>
    </Box>
  );
};

export default MessageForm;
