import { BoxProps, Heading } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface HeaderProps extends BoxProps {
  children?: string | ReactNode;
}

const Header = ({ children, ...props }: HeaderProps) => {
  return <Heading {...props}>{children}</Heading>;
};

export default Header;
