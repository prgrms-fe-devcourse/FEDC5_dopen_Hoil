import { BoxProps, Heading } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface HeaderProps extends BoxProps {
  children?: string | ReactNode;
}

const Header = ({ children, ...props }: HeaderProps) => {
  return (
    <Heading {...props} p="0 20px">
      {children}
    </Heading>
  );
};

export default Header;
