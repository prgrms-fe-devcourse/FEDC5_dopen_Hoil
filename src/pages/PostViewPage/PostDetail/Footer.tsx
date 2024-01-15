import { ReactNode } from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

interface FooterProps extends FlexProps {
  children?: ReactNode;
}

const Footer = ({ children, ...props }: FooterProps) => {
  return <Flex {...props}>{children}</Flex>;
};

export default Footer;
