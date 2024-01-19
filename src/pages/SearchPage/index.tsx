import { FormEvent, useRef, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { OPTION_USER } from '@/constants/SearchOptions';
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
  const [isSearch, setIsSearch] = useState(false);
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [searchData, setSearchData] = useState<SearchDataTypes>({
    keyword: '',
    channelId: '',
  });

  const onSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.trim().length === 0 || keyword.trim().length > 30) {
      alert('검색어를 1글자 이상 30글자 이하로 입력해 주세요.');
      setIsSearch(true);
      setSearchData({
        keyword: '',
        channelId: '',
      });
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
    setIsSearch(false);
  };

  const onChangeSearchOption = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setOption(event.target.value);
    setSearchData({
      keyword: '',
      channelId: '',
    });
    setIsSearch(false);
    inputRef?.current?.focus();
  };

  return (
    <Flex direction="column" height="100vh">
      <PageHeader pageName="검색" />
      <SearchPageBody>
        <OptionSelector
          w="155px"
          mb="5px"
          option={option}
          onChangeSearchOption={onChangeSearchOption}
          channelListData={channelListData}
        />
        <SearchInput
          w="100%"
          mb="30px"
          keyword={keyword}
          isSearch={isSearch}
          setKeyword={setKeyword}
          inputRef={inputRef}
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
  margin: 0 auto;
  padding: 20px 0;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default SearchPage;
