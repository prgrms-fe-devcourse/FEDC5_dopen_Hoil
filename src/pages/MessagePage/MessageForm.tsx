import {
  Input,
  Icon,
  Button,
  Flex,
  Box,
  BoxProps,
  FormControl,
} from '@chakra-ui/react';
import { LuMousePointer2 } from 'react-icons/lu';
import { useMessageForm } from '@/hooks/useMessageForm';

interface MessageFormProps extends BoxProps {
  onSuccess: (value: string) => void;
}

const MessageForm = ({ onSuccess, ...props }: MessageFormProps) => {
  const { registeredOption, onSubmit, isSubmitting, isValid } = useMessageForm({
    onSubmit: (message) => onSuccess(message),
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
              border="1px solid black"
              borderRadius="10px"
            />
            <Button
              bgColor="white"
              type="submit"
              isLoading={isSubmitting}
              isDisabled={!isValid}
            >
              <Icon as={LuMousePointer2} color="pink" />
            </Button>
          </Flex>
        </FormControl>
      </form>
    </Box>
  );
};

export default MessageForm;
