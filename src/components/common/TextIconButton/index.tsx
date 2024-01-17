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
  textLocation?: 'left' | 'right' | 'top' | 'bottom';
  boxSize?: IconProps['boxSize'];
  iconColor?: IconProps['color'];
}

const TextIconButton = ({
  TheIcon,
  textContent,
  textLocation = 'bottom',
  boxSize = 'icon',
  iconColor = 'inherit',
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
      fontSize="sm"
      fontWeight="extrabold"
      {...props}
    >
      <IconButton
        aria-label="home"
        bg="transparent"
        color="inherit"
        _groupHover={{ background: 'gray.450' }}
        icon={<Icon as={TheIcon} boxSize={boxSize} color={iconColor} />}
      />
      <Text textAlign="center">{textContent}</Text>
    </Flex>
  );
};

export default TextIconButton;
