import { Channel } from '@/apis/type';
import { DEFAULT_PAGE_PADDING } from '@/constants/style';
import {
  Box,
  FormControl,
  FormErrorMessage,
  Select,
  SelectProps,
} from '@chakra-ui/react';

interface SearchOptionSelectorProps extends SelectProps {
  option: string;
  onChangeSearchOption: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  channelListData?: Channel[];
}

const OptionSelector = ({
  option = '',
  onChangeSearchOption,
  channelListData = [],
  ...props
}: SearchOptionSelectorProps) => {
  return (
    <Box p={`0 ${DEFAULT_PAGE_PADDING}`}>
      <FormControl isInvalid={!option}>
        <Select onChange={onChangeSearchOption} {...props}>
          <option value="유저">유저</option>
          {channelListData?.map((option) => (
            <option value={option.name} key={option._id}>
              {option.description}
            </option>
          ))}
        </Select>
        {!option && <FormErrorMessage>옵션을 선택해주세요.</FormErrorMessage>}
      </FormControl>
    </Box>
  );
};

export default OptionSelector;
