import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react';
import DdayModal from './DdayModal';
import { useEffect, useMemo, useState } from 'react';
import { getItem } from '@/utils/storage';
import { calculateDday } from '@/utils/calculateDday';

const LoginDday = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [dDay, setDday] = useState({
    dDayTitle: '데브코스 수료식',
    dDayDate: '2024.03.25',
  });

  useEffect(() => {
    const storedDday = getItem('d-day', {
      dDayTitle: '데브코스 수료식',
      dDayDate: '2024.03.25',
    });
    setDday(storedDday);
  }, []);

  const dDayRemain = useMemo(
    () => calculateDday(dDay.dDayDate),
    [dDay.dDayDate],
  );

  return (
    <Flex
      padding="10px 20px"
      color="white"
      fontWeight="bold"
      alignItems="center"
      justifyContent="space-between"
      onClick={onOpen}
    >
      <Text fontSize="2xl">{dDay.dDayTitle}</Text>
      <Box>
        <Text fontSize="2xl">{`D-${dDayRemain}`}</Text>
        <Text fontSize="lg" fontWeight="normal">
          {dDay.dDayDate}
        </Text>
      </Box>
      <DdayModal isOpen={isOpen} onClose={onClose} setDday={setDday} />
    </Flex>
  );
};

export default LoginDday;
