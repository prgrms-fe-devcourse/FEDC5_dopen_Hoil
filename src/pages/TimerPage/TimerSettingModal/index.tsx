import MyModal, { MyModalProps } from '@/components/common/MyModal';
import { TIME_OUT_VALUE } from '@/constants/time';
import { convertDateToString } from '@/utils/convertDateToString';
import { setItem } from '@/utils/storage';
import { stringTimeToSeconds } from '@/utils/stringTimeToSeconds';
import { FormControl, FormErrorMessage } from '@chakra-ui/form-control';
import { Box, Flex, Input, Text } from '@chakra-ui/react';
import { Dispatch, Fragment, MutableRefObject, SetStateAction } from 'react';
import { Path, RegisterOptions, useForm } from 'react-hook-form';

const checkTimeOut = (value: string) => {
  const currentTime = new Date();
  const currentLimit =
    stringTimeToSeconds(TIME_OUT_VALUE) -
    stringTimeToSeconds(
      `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`,
    );
  const timeDiff = currentLimit - stringTimeToSeconds(value);
  return timeDiff >= 0 || '23:45:00까지만 설정 가능합니다.';
};

interface TimerInputTypes {
  hour: string;
  minute: string;
  second: string;
}

interface TimerInputMetaDataTypes {
  name: Path<TimerInputTypes>;
  validate?: RegisterOptions;
}

interface TimerSettingModalProps
  extends Pick<MyModalProps, 'isOpen' | 'onClose'> {
  setTimer: Dispatch<SetStateAction<string>>;
  currentTargetTime: MutableRefObject<string>;
  originTargetTime: MutableRefObject<string>;
}

const TimerSettingModal = ({
  isOpen,
  onClose,
  setTimer,
  currentTargetTime,
  originTargetTime,
}: TimerSettingModalProps) => {
  const timeInputMetaData: TimerInputMetaDataTypes[] = [
    {
      name: 'hour',
      validate: {
        pattern: {
          value: /^(0?[0-9]|1[0-9]|2[0-3])$/,
          message: '00~23사이 숫자만 가능합니다',
        },
        maxLength: {
          value: 2,
          message: '숫자는 두개까지 입력 가능합니다',
        },
        validate: () =>
          checkTimeOut(
            `${getValues().hour}:${getValues().minute}:${getValues().second}`,
          ),
      },
    },
    {
      name: 'minute',
      validate: {
        pattern: {
          value: /^[0-5]?[0-9]$/,
          message: '00~59사이 숫자만 가능합니다',
        },
        maxLength: {
          value: 2,
          message: '숫자는 두개까지 입력 가능합니다',
        },
        validate: () =>
          checkTimeOut(
            `${getValues().hour}:${getValues().minute}:${getValues().second}`,
          ),
      },
    },
    {
      name: 'second',
      validate: {
        pattern: {
          value: /^[0-5]?[0-9]$/,
          message: '00~59사이 숫자만 가능합니다',
        },
        maxLength: {
          value: 2,
          message: '숫자는 두개까지 입력 가능합니다',
        },
        validate: () =>
          checkTimeOut(
            `${getValues().hour}:${getValues().minute}:${getValues().second}`,
          ),
      },
    },
  ];

  const onSubmit = () => {
    const { hour, minute, second } = getValues();
    const timeArr = [hour, minute, second].map((time) =>
      time.toString().padStart(2, '0'),
    );
    const stringTime = timeArr.join(':');

    setTimer(stringTime);
    currentTargetTime.current = stringTime;
    originTargetTime.current = stringTime;

    const currentDate = new Date();
    const { date } = convertDateToString(currentDate);

    setItem('timer', {
      time: stringTime,
      originTime: stringTime,
      day: date,
    });

    onClose();
  };

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<TimerInputTypes>({
    defaultValues: {
      hour: '00',
      minute: '00',
      second: '00',
    },
  });
  return (
    <MyModal
      title="타이머 설정"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="타이머 설정하기"
      onButtonClick={handleSubmit(onSubmit)}
      isCentered
    >
      <Box pl="20px" color="black">
        <Text fontSize="1.4rem" fontWeight="bold" m="14px 0">
          목표 시간을 설정해주세요
        </Text>
        <form
          style={{
            display: 'flex',
            height: '90px',
          }}
        >
          {timeInputMetaData.map(({ name, validate }, index) => (
            <Fragment key={name}>
              <FormControl isInvalid={!!errors?.[name]?.message} w="100px">
                <Input
                  id={name}
                  type="number"
                  {...register(name, {
                    required: '시간을 설정해주세요',
                    ...validate,
                  })}
                  h="70px"
                  fontSize="3rem"
                  textAlign="center"
                />
                <FormErrorMessage>{errors?.[name]?.message}</FormErrorMessage>
              </FormControl>
              {index !== timeInputMetaData.length - 1 && (
                <Flex
                  fontSize="2rem"
                  color="#000000"
                  fontWeight="bold"
                  m="0 10px"
                  align="center"
                  h="60px"
                >
                  :
                </Flex>
              )}
            </Fragment>
          ))}
        </form>
      </Box>
    </MyModal>
  );
};

export default TimerSettingModal;
