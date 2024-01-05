import { DEFAULT_PAGE_PADDING } from '@/constants/style';
import { Box, Select, SelectProps } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

interface SearchOptionSelectorProps extends SelectProps {
  setOption: Dispatch<SetStateAction<string>>;
  SELECT_OPTIONS: string[];
}

const OptionSelector = ({
  SELECT_OPTIONS = [],
  setOption,
  ...props
}: SearchOptionSelectorProps) => {
  return (
    <Box p={`0 ${DEFAULT_PAGE_PADDING}`}>
      <Select
        placeholder="검색 조건"
        onChange={(e) => setOption(e.target.value)}
        {...props}
      >
        {SELECT_OPTIONS.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default OptionSelector;
