import { Flex, Icon, IconButton, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface TextIconButtonProps {
  TheIcon: IconType;
  textContent: string;
}

const TextIconButton = ({ TheIcon, textContent }: TextIconButtonProps) => {
  return (
    <Flex flexDir="column" align="center" cursor="pointer" role="group">
      <IconButton
        aria-label="home"
        icon={<Icon as={TheIcon} boxSize="icon" color="black" />}
        bg="transparent"
        _groupHover={{ background: 'gray.450' }}
      />
      <Text fontSize="sm" fontWeight="800" textAlign="center" color="black">
        {textContent}
      </Text>
    </Flex>
  );
};

export default TextIconButton;
