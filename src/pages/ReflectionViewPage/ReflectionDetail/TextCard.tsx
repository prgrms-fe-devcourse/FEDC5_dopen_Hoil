import { Box, BoxProps, Heading, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface TextCardProps extends BoxProps {
  header: string | ReactNode;
  body: string | ReactNode;
}

const TextCard = ({ header, body, ...props }: TextCardProps) => {
  return (
    <Box minH="100px" {...props}>
      <Heading as="h3">{header}</Heading>
      <Text textColor="gray700">{body}</Text>
    </Box>
  );
};

export default TextCard;
