import {
  Flex,
  FlexProps,
  Icon,
  IconButton,
  IconProps,
  Text,
  TextProps,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface TextIconButtonProps extends FlexProps {
  TheIcon: IconType;
  textContent: string;
  boxSize?: IconProps['boxSize'];
  textLocation?: 'left' | 'right' | 'top' | 'bottom';
  fontSize?: TextProps['fontSize'];
  iconColor?: IconProps['color'];
  textColor?: TextProps['color'];
  fontWeight?: TextProps['fontWeight'];
}

const TextIconButton = ({
  TheIcon,
  textContent,
  textLocation = 'bottom',
  fontSize = 'sm',
  textColor = 'black',
  fontWeight = '800',
  boxSize = 'icon',
  iconColor = 'black',
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
        icon={<Icon as={TheIcon} boxSize={boxSize} color={iconColor} />}
        bg="transparent"
        _groupHover={{ background: 'gray.450' }}
      />
      <Text
        fontSize={fontSize}
        fontWeight={fontWeight}
        textAlign="center"
        color={textColor}
      >
        {textContent}
      </Text>
    </Flex>
  );
};

export default TextIconButton;
