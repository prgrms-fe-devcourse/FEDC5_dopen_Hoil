import { IconType } from 'react-icons';
import { Icon, Flex, Text } from '@chakra-ui/react';
import { FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface MyPageListItemProps {
  icon: IconType;
  title: string;
  href?: string;
  username?: string;
}

const MyPageListItem = ({
  icon,
  title,
  href,
  username,
}: MyPageListItemProps) => {
  const navigator = useNavigate();

  return (
    <li onClick={() => navigator(href || `/${username}`)}>
      <Flex alignItems="center">
        <Flex
          alignItems="center"
          justifyContent="center"
          boxSize="32px"
          borderRadius="4px"
          marginRight="30px"
          backgroundColor="#FAFCFE"
          border="1px"
          borderColor="gray.200"
          boxShadow="0px 24px 48px 0 rgba(0,0,0,0.16)"
        >
          <Icon as={icon} boxSize="18px" fill="pink.300" />
        </Flex>
        <Text as="span" fontSize="lg" fontWeight="medium">
          {title}
        </Text>
      </Flex>
      <Icon as={FaChevronRight} w={8} h={8} />
    </li>
  );
};

export default MyPageListItem;
