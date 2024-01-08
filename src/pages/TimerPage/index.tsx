import PageHeader from '@/components/PageHeader';
import useTimer from '@/hooks/useTimer';
import {
  Button,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Icon,
  IconButton,
  IconButtonProps,
  VStack,
} from '@chakra-ui/react';
import { MdPlayArrow } from 'react-icons/md';

const TEST_TIME = '00:00:05';

const TimerPage = () => {
  const { timer, startTimer } = useTimer(TEST_TIME);
  const timerIconStyle: IconButtonProps = {
    position: 'absolute',
    left: '50%',
    bottom: '35px',
    transform: 'translate(-50%, -50%)',
    boxSize: '100px',
    borderRadius: '50%',
    bg: 'pink.300',
    _hover: { bg: 'pink.400' },
    'aria-label': '',
  };
  return (
    <Flex flexDir="column" align="center" w="100%" bg="pink.200">
      <PageHeader pageName="타이머" />
      <Center p="97px 0" position="relative" w="100%">
        <CircularProgress value={50} color="black" size="360px" thickness="1px">
          <CircularProgressLabel
            fontWeight="bold"
            color="white"
            fontSize="6.6rem"
          >
            {timer}
          </CircularProgressLabel>
        </CircularProgress>
        <IconButton
          {...timerIconStyle}
          aria-label="재생"
          icon={<Icon as={MdPlayArrow} color="white" boxSize="50px" />}
          onClick={() => startTimer()}
        />
      </Center>
      <VStack pb="155px" spacing="22px">
        <Button
          color="white"
          bg="pink.300"
          w="388px"
          h="70px"
          _hover={{ bg: 'pink.400' }}
        >
          타이머 설정
        </Button>
        <Button
          color="white"
          bg="pink.300"
          w="388px"
          h="70px"
          _hover={{ bg: 'pink.400' }}
        >
          스톱워치로 전환
        </Button>
      </VStack>
    </Flex>
  );
};

export default TimerPage;
