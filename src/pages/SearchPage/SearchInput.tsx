import { Dispatch, FormEvent, SetStateAction } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import { Box, BoxProps, CloseButton, Flex, Input } from '@chakra-ui/react';
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
    <Box p={`0 ${DEFAULT_PAGE_PADDING}`} {...props}>
      <Flex
        padding="8px 16px"
        bg="gray.200"
        borderRadius="10px"
        alignItems="center"
      >
        <SearchIcon boxSize={6} />
        <form style={{ flexGrow: '1' }} onSubmit={(e) => onSearchSubmit(e)}>
          <Input
            fontSize="1.4rem"
            color="gray.700"
            disabled={disabled}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="검색어를 입력하세요."
            focusBorderColor="transparent"
          />
        </form>
        <CloseButton onClick={() => setKeyword('')} />
      </Flex>
    </Box>
  );
};

export default SearchInput;
