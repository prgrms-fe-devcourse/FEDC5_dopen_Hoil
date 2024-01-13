import { ReactNode } from 'react';
import { FlexProps, Box } from '@chakra-ui/react';

interface ContentProps extends FlexProps {
  children?: ReactNode;
}

const Content = ({ children, ...props }: ContentProps) => {
  return <Box {...props}>{children}</Box>;
};

export default Content;
