import PageHeader from '@/components/PageHeader';
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
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
  required: boolean;
  placeholder: string;
  validate?: RegisterOptions;
}

const ReflectionInputList: ReflectionInputProps[] = [
  {
    name: 'title',
    label: '한 줄 회고',
    type: 'text',
    required: true,
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
    required: true,
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
    required: true,
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
    required: true,
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
    /*     handleSubmit,
    getValues,
    formState: { errors, isValid }, */
  } = useForm<ReflectionInputTypes>();

  return (
    <>
      <PageHeader pageName="회고" />
      <Flex flexDir="column" align="center" w="100%">
        <HStack>
          <Box>11</Box>
          <Box>12</Box>
          <Box>13</Box>
          <Box>14</Box>
        </HStack>
        <VStack>
          <form>
            {ReflectionInputList.map(
              ({ name, label, type, required, placeholder, validate }) => (
                <FormControl key={name}>
                  <FormLabel>{label}</FormLabel>
                  <Input
                    type={type}
                    placeholder={placeholder}
                    {...register(name, { required, ...validate })}
                  />
                  <FormErrorMessage>{}</FormErrorMessage>
                </FormControl>
              ),
            )}
          </form>
        </VStack>
      </Flex>
    </>
  );
};

export default ReflectionPostEditPage;
