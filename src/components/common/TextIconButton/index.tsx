import {
  Flex,
  FlexProps,
  Icon,
  IconButton,
  IconProps,
  Text,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface TextIconButtonProps extends FlexProps {
  TheIcon: IconType;
  textContent: string;
  boxSize?: IconProps['boxSize'];
  textLocation?: 'left' | 'right' | 'top' | 'bottom';
}

const TextIconButton = ({
  TheIcon,
  textContent,
  boxSize = 'icon',
  textLocation = 'bottom',
  ...props
}: TextIconButtonProps) => {
  const calculateFlexDir = (
    textLocation: TextIconButtonProps['textLocation'],
  ) => {
    switch (textLocation) {
      case 'bottom':
        return 'column';
      case 'top':
        return 'column-reverse';
      case 'left':
        return 'row-reverse';
      case 'right':
        return 'row';
      default:
        return 'column';
    }
  };
  return (
    <Flex
      flexDir={calculateFlexDir(textLocation)}
      align="center"
      justify="center"
      cursor="pointer"
      role="group"
      {...props}
    >
      <IconButton
        aria-label="home"
        icon={<Icon as={TheIcon} boxSize={boxSize} color="black" />}
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
