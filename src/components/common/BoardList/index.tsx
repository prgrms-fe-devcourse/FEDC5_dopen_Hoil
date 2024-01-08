import { ChevronRightIcon } from '@chakra-ui/icons';
import { Divider, Flex, FlexProps, Text } from '@chakra-ui/react';

interface BodarListProps extends FlexProps {
  boardName: string;
}

const BoardList = ({ boardName, ...props }: BodarListProps) => {
  return (
    <>
      <Flex
        color="black"
        justifyContent="space-between"
        alignItems="center"
        cursor="pointer"
        {...props}
      >
        <Text>{boardName}</Text>
        <ChevronRightIcon />
      </Flex>
      <Divider color="gray.450" />
    </>
  );
};

export default BoardList;
