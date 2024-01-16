import { Box, UnorderedList, ListItem, Text, Avatar } from '@chakra-ui/react';
import { SOCIAL_LOGIN_LIST } from './loginInputList';
import { preparing } from './preparing';

const LoginWithSocial = () => {
  return (
    <Box>
      <UnorderedList display="flex" justifyContent="space-evenly">
        {SOCIAL_LOGIN_LIST.map(({ name, title, src, href }) => (
          <ListItem key={name} listStyleType="none">
            <Text
              as="a"
              title={title}
              cursor="pointer"
              display="block"
              target="_blank"
              href={href}
              onClick={preparing}
            >
              <Avatar size="40px" name={title} src={src} />
            </Text>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default LoginWithSocial;
