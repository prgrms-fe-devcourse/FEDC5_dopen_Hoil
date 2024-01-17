import { ReactNode } from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

interface FooterProps extends FlexProps {
  children?: ReactNode;
}

const Footer = ({ children, ...props }: FooterProps) => {
  return (
    <Flex {...props} p="0 20px">
      {children}
    </Flex>
  );
};

export default Footer;
