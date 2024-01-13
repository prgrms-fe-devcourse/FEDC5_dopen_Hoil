import { FormEvent, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
// TODO : 게시판 목록을 API를 통해 '658b7460fadd1520147a8d72' 형태로 받아와서 객체 key-value 값으로 바꿀 필요가 있음.
// 이에 따라 Router 설정도 필요 (with. 쿼리 스트링)
// /constants/SearchOption 에서 수정하기
import { OPTION_USER } from '@/constants/SearchOptions';
import { DEFAULT_WIDTH } from '@/constants/style';
import PageHeader from '@/components/PageHeader';
import PostList from '@/components/PostList';
import UserList from '@/components/UserList';
import OptionSelector from '@/pages/SearchPage/OptionSelector';
import SearchInput from '@/pages/SearchPage/SearchInput';
import { useChannelList } from '@/hooks/useChannel';

export interface SearchDataTypes {
  keyword: string;
  channelId: string;
}

const SearchPage = () => {
  const { channelListData } = useChannelList();

  const [option, setOption] = useState('');
  const [keyword, setKeyword] = useState('');
  const [searchData, setSearchData] = useState<SearchDataTypes>({
    keyword: '',
    channelId: '',
  });

  const onSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      } else {
        // TODO : Toast UI로 처리 필요
        alert('네트워크 에러가 발생했습니다.');
      }
    }
    setKeyword('');
  };

  return (
    <Flex w={DEFAULT_WIDTH} height="100vh" margin="0 auto" direction="column">
      <PageHeader pageName="검색" />
      <SearchPageBody>
        <OptionSelector
          w="132px"
          mb="5px"
          setOption={setOption}
          channelListData={channelListData}
        />
        <SearchInput
          w="100%"
          mb="30px"
          disabled={option ? false : true}
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
