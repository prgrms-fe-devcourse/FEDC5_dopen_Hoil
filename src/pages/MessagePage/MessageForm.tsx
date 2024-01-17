import {
  Input,
  Button,
  Flex,
  Box,
  BoxProps,
  FormControl,
  Image,
} from '@chakra-ui/react';
import { useMessageForm } from '@/hooks/useMessageForm';

interface MessageFormProps extends BoxProps {
  onSuccess: (value: string) => void;
}

const MessageForm = ({ onSuccess, ...props }: MessageFormProps) => {
  const { registeredOption, onSubmit, isSubmitting, isValid, reset } =
    useMessageForm({
      onSubmit: (message) => {
        onSuccess(message);
        reset();
      },
    });

  return (
    <Box {...props}>
      <form onSubmit={onSubmit}>
        <FormControl>
          <Flex p="5px" position="relative" alignItems="center">
            <Input
              {...registeredOption}
              h="4rem"
              display="inline"
              borderRadius="10px"
              bgColor="customWhite"
            />
            <Button
              isLoading={isSubmitting}
              isDisabled={!isValid}
              _hover={{ background: 'transparent' }}
              bgColor="customWhite"
              type="submit"
            >
              <Image src="/public/assets/send.svg" alt="comment send" />
            </Button>
          </Flex>
        </FormControl>
      </form>
    </Box>
  );
};

export default MessageForm;
