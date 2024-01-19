import { UseFormRegister } from 'react-hook-form';
import { Box, Flex, Input, CloseButton } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { SearchDataTypes } from '.';

interface SearchInputProps {
  register: UseFormRegister<SearchDataTypes>;
  resetField: (fieldName: keyof SearchDataTypes) => void;
}

const SearchInput = ({ register, resetField }: SearchInputProps) => {
  return (
    <Box>
      <Flex
        padding="8px 16px"
        bgColor="gray200"
        borderRadius="10px"
        alignItems="center"
      >
        <SearchIcon mr="5px" boxSize={6} />
        <Input
          padding="3px 10px"
          width="100%"
          outline="none"
          backgroundColor="transparent"
          fontSize="1.3rem"
          type="text"
          placeholder="검색어를 입력해주세요."
          autoFocus
          {...register('keyword', {
            required: '검색어를 입력해주세요.',
            maxLength: {
              value: 30,
              message: '검색어를 30글자 이하로 입력해주세요.',
            },
          })}
        />
        <CloseButton ml="5px" onClick={() => resetField('keyword')} />
      </Flex>
    </Box>
  );
};

export default SearchInput;
