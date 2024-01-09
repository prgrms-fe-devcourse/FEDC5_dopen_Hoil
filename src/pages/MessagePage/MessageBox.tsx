import { ReactNode } from 'react';
import { Box, Flex, FlexProps, BoxProps } from '@chakra-ui/react';

interface MessageBoxProps extends FlexProps, BoxProps {
  children: ReactNode | string;
}

const MessageBoxContainer = ({ children, ...props }: MessageBoxProps) => {
  return (
    <Flex flexDir="column" borderRadius="10" p="4" maxW="200" {...props}>
      {children}
    </Flex>
  );
};

const Main = ({ children, ...props }: MessageBoxProps) => {
  return <Box {...props}>{children}</Box>;
};

const Sub = ({ children, ...props }: MessageBoxProps) => {
  return <Box {...props}>{children}</Box>;
};

const MessageBox = Object.assign(MessageBoxContainer, {
  Main,
  Sub,
});

export default MessageBox;
