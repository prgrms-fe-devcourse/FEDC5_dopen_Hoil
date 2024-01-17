import { Dispatch, FormEvent, SetStateAction } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';
import { DEFAULT_PAGE_PADDING } from '@/constants/style';

// TODO : Input 컴포넌트인데 BoxProps를 받아오니깐 어색... 새로운 작명이 필요
interface SearchInputProps extends BoxProps {
  keyword: string;
  disabled?: boolean;
  setKeyword: Dispatch<SetStateAction<string>>;
  onSearchSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const SearchInput = ({
  keyword = '',
  disabled,
  setKeyword,
  onSearchSubmit,
  ...props
}: SearchInputProps) => {
  return (
    <FormControl isInvalid={!keyword}>
      <Box p={`0 ${DEFAULT_PAGE_PADDING}`} {...props}>
        <Flex
          padding="8px 16px"
          bgColor="gray200"
          borderRadius="10px"
          alignItems="center"
        >
          <SearchIcon mr="5px" boxSize={6} />
          <form style={{ flexGrow: '1' }} onSubmit={(e) => onSearchSubmit(e)}>
            <Input
              fontSize="1.4rem"
              disabled={disabled}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="검색어를 입력하세요."
              focusBorderColor="transparent"
            />
          </form>
          <CloseButton ml="5px" onClick={() => setKeyword('')} />
        </Flex>
        {!keyword && (
          <FormErrorMessage>검색어를 입력해주세요.</FormErrorMessage>
        )}
      </Box>
    </FormControl>
  );
};

export default SearchInput;
