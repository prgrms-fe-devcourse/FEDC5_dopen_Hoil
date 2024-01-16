import { FormEvent, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { OPTION_USER } from '@/constants/SearchOptions';
import { DEFAULT_WIDTH } from '@/constants/style';
import PageHeader from '@/components/PageHeader';
import PostList from '@/components/PostList';
import UserList from '@/components/UserList';
import OptionSelector from '@/pages/SearchPage/OptionSelector';
import SearchInput from '@/pages/SearchPage/SearchInput';
import { useChannelList } from '@/hooks/useChannels';

export interface SearchDataTypes {
  keyword: string;
  channelId: string;
}

const SearchPage = () => {
  const { channelListData } = useChannelList();

  const [option, setOption] = useState('유저');
  const [keyword, setKeyword] = useState('');
  const [searchData, setSearchData] = useState<SearchDataTypes>({
    keyword: '',
    channelId: '',
  });

  const onSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword === '') {
      alert('검색어를 입력해주세요.');
      return;
    }

    if (option === OPTION_USER) {
      setSearchData({
        keyword,
        channelId: '',
      });
    } else {
      if (channelListData) {
        setSearchData({
          keyword,
          channelId: channelListData?.filter(
            (channel) => channel.name === option,
          )[0]._id,
        });
      }
    }
    setKeyword('');
  };

  return (
    <Flex w={DEFAULT_WIDTH} height="100vh" margin="0 auto" direction="column">
      <PageHeader pageName="검색" />
      <SearchPageBody>
        <OptionSelector
          w="155px"
          mb="5px"
          option={option}
          setOption={setOption}
          channelListData={channelListData}
        />
        <SearchInput
          w="100%"
          mb="30px"
          keyword={keyword}
          setKeyword={setKeyword}
          onSearchSubmit={onSearchSubmit}
        />
        {searchData.keyword &&
          (searchData.channelId !== '' ? (
            <PostList
              keyword={searchData.keyword}
              channelId={searchData.channelId}
            />
          ) : (
            <UserList keyword={searchData.keyword} />
          ))}
      </SearchPageBody>
    </Flex>
  );
};

const SearchPageBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  max-width: ${DEFAULT_WIDTH};
  height: 100vh;
  margin: 0 auto;
  padding: 20px 0;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default SearchPage;
