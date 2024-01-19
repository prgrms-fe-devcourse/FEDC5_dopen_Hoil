import { UseFormRegister } from 'react-hook-form';
import { Box, Select } from '@chakra-ui/react';
import { SearchDataTypes } from '.';
import { Channel } from '@/apis/type';

interface SearchSelectProps {
  register: UseFormRegister<SearchDataTypes>;
  channelListData?: Channel[];
}

const SearchSelect = ({ register, channelListData }: SearchSelectProps) => {
  return (
    <Box overflow="hidden">
      <Select
        w="160px"
        mb="5px"
        h="30px"
        fontSize="1.4rem"
        float="right"
        {...register('channelId', {})}
      >
        <option value="유저">유저</option>
        {channelListData &&
          channelListData.map((option) => (
            <option value={option.name} key={option._id}>
              {option.description}
            </option>
          ))}
      </Select>
    </Box>
  );
};
export default SearchSelect;
