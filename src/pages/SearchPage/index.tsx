import { FormEvent, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
// TODO : 게시판 목록을 API를 통해 '658b7460fadd1520147a8d72' 형태로 받아와서 객체 key-value 값으로 바꿀 필요가 있음.
// 이에 따라 Router 설정도 필요 (with. 쿼리 스트링)
// /constants/SearchOption 에서 수정하기
import { SELETE_OPTION } from '@/constants/SearchOption';
import { DEFAULT_WIDTH } from '@/constants/style';
import PageHeader from '@/components/PageHeader';
import PostList from '@/components/PostList';
import UserList from '@/components/UserList';
import SearchOptionSelector from '@/pages/SearchPage/SearchOptionSelector';
import SearchInput from '@/pages/SearchPage/SearchInput';

export interface searchDataTypes {
  keyword: string;
  channelId: string;
}

const SearchPage = () => {
  const [searchOption, setSearchOption] = useState('');
  const [keyword, setKeyword] = useState('');
  const [searchData, setSearchData] = useState<searchDataTypes>({
    keyword: '',
    channelId: '',
  });

  const onSearchStart = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 이 부분 컨벤션이 기억이 안나서 코멘트 부탁드리겠습니다 !
    if (searchOption === '유저') {
      setSearchData({
        keyword: keyword,
        channelId: '',
      });
    } else {
      setSearchData({
        keyword: keyword,
        channelId: '658b7460fadd1520147a8d72', // 게시판의 ID로 바꿔주기. 이건 Test 채널
      });
    }
    // 이 부분 컨벤션이 기억이 안나서 코멘트 부탁드리겠습니다 !
  };

  return (
    <Flex w={DEFAULT_WIDTH} height="100vh" margin="0 auto" direction="column">
      <PageHeader pageName="검색" />
      <SearchPageBody>
        <SearchOptionSelector
          w="132px"
          mb="5px"
          setSearchOption={setSearchOption}
          SELETE_OPTION={SELETE_OPTION}
        />
        <SearchInput
          w="100%"
          mb="30px"
          disabled={searchOption ? false : true}
          keyword={keyword}
          setKeyword={setKeyword}
          onSearchStart={onSearchStart}
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
