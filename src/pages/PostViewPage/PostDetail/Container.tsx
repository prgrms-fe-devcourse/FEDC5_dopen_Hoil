import { ReactNode } from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

interface PostProps extends FlexProps {
  children: ReactNode;
}

const PostContainer = ({ children, ...props }: PostProps) => {
  return (
    <Flex flexDir="column" gap="20px" {...props} flex={1}>
      {children}
    </Flex>
  );
};

const Post = Object.assign(PostContainer, { Header, Content, Footer });

export default Post;
