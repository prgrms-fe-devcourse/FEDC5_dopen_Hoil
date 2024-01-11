import { Channel } from '@/apis/type';
import { DEFAULT_PAGE_PADDING } from '@/constants/style';
import { Box, Select, SelectProps } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

interface SearchOptionSelectorProps extends SelectProps {
  setOption: Dispatch<SetStateAction<string>>;
  channelListData?: Channel[];
}

const OptionSelector = ({
  setOption,
  channelListData = [],
  ...props
}: SearchOptionSelectorProps) => {
  return (
    <Box p={`0 ${DEFAULT_PAGE_PADDING}`}>
      <Select
        placeholder="검색 조건"
        onChange={(e) => setOption(e.target.value)}
        {...props}
      >
        <option value="유저">유저</option>
        {channelListData?.map((option) => (
          <option value={option.name} key={option._id}>
            {option.description}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default OptionSelector;
