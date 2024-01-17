import { Divider, Flex, FlexProps, Text } from '@chakra-ui/react';
import { MdArrowForwardIos } from 'react-icons/md';

interface BodarListProps extends FlexProps {
  boardName: string;
}

const BoardList = ({ boardName, ...props }: BodarListProps) => {
  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        cursor="pointer"
        {...props}
      >
        <Text>{boardName}</Text>
        <MdArrowForwardIos />
      </Flex>
      <Divider color="gray.450" />
    </>
  );
};

export default BoardList;
