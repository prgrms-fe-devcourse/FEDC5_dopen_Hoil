import { ReactNode } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

interface PostProps extends BoxProps {
  children: ReactNode;
}

const PostContainer = ({ children, ...props }: PostProps) => {
  return <Box {...props}>{children}</Box>;
};

const Post = Object.assign(PostContainer, { Header, Content, Footer });

export default Post;
