import { ReactNode } from 'react';
import { Divider, Box, AbsoluteCenter, BoxProps } from '@chakra-ui/react';

interface TextDividerProps extends BoxProps {
  dividerColor: string;
  text?: string | ReactNode;
}

const TextDivider = ({ dividerColor, text, ...props }: TextDividerProps) => {
  return (
    <Box position="relative" {...props}>
      <Divider borderColor={dividerColor} />
      {text && <AbsoluteCenter>{text}</AbsoluteCenter>}
    </Box>
  );
};

export default TextDivider;
