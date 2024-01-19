import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Flex, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useChannelList } from '@/hooks/useChannels';
import { OPTION_USER } from '@/constants/SearchOptions';
import PageHeader from '@/components/PageHeader';
import PostList from '@/components/PostList';
import UserList from '@/components/UserList';
import SearchInput from './SearchInput';
import SearchOptionSelect from './SearchOptionSelect';

export interface SearchDataTypes {
  keyword: string;
  channelId: string;
}

const SearchPage = () => {
  const { channelListData = [] } = useChannelList();

  const [searchData, setSearchData] = useState<SearchDataTypes>({
    keyword: '',
    channelId: '',
  });

  const {
    register,
    handleSubmit,
    setError,
    watch,
    resetField,
    formState: { errors },
  } = useForm<SearchDataTypes>();

  const onSearchSubmit: SubmitHandler<SearchDataTypes> = ({
    keyword,
    channelId,
  }) => {
    if (keyword.trim() === '') {
      setError(
        'keyword',
        { message: '검색어를 공백 제외 1글자 이상 입력해주세요.' },
        { shouldFocus: true },
      );
      return;
    }

    if (channelId === OPTION_USER) {
      setSearchData({
        keyword,
        channelId: '',
      });
    } else {
      setSearchData({
        keyword,
        channelId: channelListData?.filter(
          (channel) => channel.name === channelId,
        )[0]._id,
      });
    }

    resetField('keyword');
  };

  const watchSearchOption = watch('channelId');
  useEffect(() => {
    setSearchData({
      keyword: '',
      channelId: '',
    });
  }, [watchSearchOption]);

  return (
    <Flex direction="column" height="100vh">
      <PageHeader pageName="검색" />

      <SearchPageBody>
        <SearchForm onSubmit={handleSubmit(onSearchSubmit)}>
          <SearchOptionSelect
            register={register}
            channelListData={channelListData}
          />
          <SearchInput register={register} resetField={resetField} />
          <Text mt={2} color="pink.300" fontSize="1.2rem">
            {errors && errors['keyword'] && errors['keyword']?.message}
          </Text>
          {searchData.keyword &&
            (searchData.channelId !== '' ? (
              <PostList
                keyword={searchData.keyword}
                channelId={searchData.channelId}
              />
            ) : (
              <UserList keyword={searchData.keyword} />
            ))}
        </SearchForm>
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

const SearchForm = styled.form`
  width: 100%;
  padding: 0 20px;
`;

export default SearchPage;
