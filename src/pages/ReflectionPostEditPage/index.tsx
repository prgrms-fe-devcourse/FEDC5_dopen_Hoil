import PageHeader from '@/components/PageHeader';
import { DEFAULT_HEADER_HEIGHT } from '@/constants/style';
import { getRecentEightDates } from '@/utils/getRecentEightDates';
import { EditIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { Path, RegisterOptions, useForm } from 'react-hook-form';

export interface ReflectionInputTypes {
  title: string;
  favorite: string;
  shame: string;
  sayToMe: string;
}

export interface ReflectionInputProps {
  name: Path<ReflectionInputTypes>;
  label: string;
  type: string;
  required: boolean | string;
  placeholder: string;
  validate?: RegisterOptions;
}

const ReflectionInputList: ReflectionInputProps[] = [
  {
    name: 'title',
    label: '한 줄 회고',
    type: 'text',
    required: '이 칸을 채워주세요',
    placeholder: '오늘 하루는 어땠나요?',
    validate: {
      minLength: {
        value: 2,
        message: '최소 2글자 이상 입력해주세요',
      },
      maxLength: {
        value: 20,
        message: '최대 20글자까지 입력 가능합니다',
      },
    },
  },
  {
    name: 'favorite',
    label: '오늘 가장 좋았던 일',
    type: 'text',
    required: '이 칸을 채워주세요',
    placeholder: '오늘 가장 좋았던 일은 무엇인가요?',
    validate: {
      minLength: {
        value: 1,
        message: '최소 1글자 이상 입력해주세요',
      },
      maxLength: {
        value: 300,
        message: '최대 300글자까지 입력 가능합니다',
      },
    },
  },
  {
    name: 'shame',
    label: '오늘 아쉬웠던 일',
    type: 'text',
    required: '이 칸을 채워주세요',
    placeholder: '오늘 아쉬웠던 일은 무엇인가요?',
    validate: {
      minLength: {
        value: 1,
        message: '최소 1글자 이상 입력해주세요',
      },
      maxLength: {
        value: 300,
        message: '최대 300글자까지 입력 가능합니다',
      },
    },
  },
  {
    name: 'sayToMe',
    label: '나에게 한마디',
    type: 'text',
    required: '이 칸을 채워주세요',
    placeholder: '나에게 하고 싶은 말을 적어주세요',
    validate: {
      minLength: {
        value: 2,
        message: '최소 2글자 이상 입력해주세요',
      },
      maxLength: {
        value: 40,
        message: '최대 40글자까지 입력 가능합니다',
      },
    },
  },
];

const ReflectionPostEditPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ReflectionInputTypes>();

  /*   const navigate = useNavigate();

  const onSuccessFn = () => {
    alert('글 등록 성공!');
    navigate('/board/reflection');
  };

  const { mutate: onCreatePost } = usePosting({ onSuccessFn });

  const { mutate: onEditPost } = useEditPost({ onSuccessFn }); */

  const onPosting = () => {};

  return (
    <>
      <PageHeader pageName="회고" />
      <Flex flexDir="column" align="center" w="100%" flex={1} color="black">
        <Flex
          w="100%"
          p="0 20px"
          h={DEFAULT_HEADER_HEIGHT}
          justify="space-between"
        >
          {getRecentEightDates().map(({ date, day }, index) => (
            <Flex
              key={index}
              flexDir="column"
              justify="center"
              align="center"
              w="53px"
              h="70px"
              borderRadius="16px"
              bg={date === new Date().getDate() ? 'pink.100' : 'transparent'}
              color={date === new Date().getDate() ? 'pink.300' : 'inherit'}
              position="relative"
            >
              {date === new Date().getDate() && (
                <Text
                  bg="pink.300"
                  boxSize="6px"
                  borderRadius="50%"
                  position="absolute"
                  top="8px"
                />
              )}
              <Text fontSize="1.8rem" fontWeight="bold">
                {date}
              </Text>
              <Text
                fontSize="1.2rem"
                color={date === new Date().getDate() ? 'pink.300' : 'gray.800'}
              >
                {day}
              </Text>
            </Flex>
          ))}
        </Flex>
        <form
          style={{ width: '100%', flex: 1 }}
          onSubmit={handleSubmit(onPosting)}
        >
          <VStack w="100%" bg="gray.100" p="0 20px" spacing="14px" pt="47px">
            {ReflectionInputList.map(
              ({ name, label, required, placeholder, validate }) => (
                <FormControl key={name} isInvalid={!!errors?.[name]?.message}>
                  <FormLabel fontSize="1.6rem" fontWeight="bold">
                    {label}
                  </FormLabel>
                  <Textarea
                    id={name}
                    p="10px"
                    placeholder={placeholder}
                    _placeholder={{ color: 'gray.700' }}
                    borderRadius="5px"
                    bg="white"
                    wordBreak="break-all"
                    h={name === 'title' ? '50px' : '100px'}
                    resize="none"
                    {...register(name, { required, ...validate })}
                  />
                  <FormErrorMessage>{errors?.[name]?.message}</FormErrorMessage>
                </FormControl>
              ),
            )}
            <Button
              h="50px"
              mt="27px"
              mb="128px"
              w="100%"
              borderRadius="50px"
              fontSize="1.6rem"
              fontWeight="medium"
              color="white"
              bg="pink.300"
              _hover={{ bg: 'pink.400' }}
              disabled={!isValid}
              type="submit"
            >
              글쓰기
              <EditIcon ml="5px" />
            </Button>
          </VStack>
        </form>
      </Flex>
    </>
  );
};

export default ReflectionPostEditPage;
