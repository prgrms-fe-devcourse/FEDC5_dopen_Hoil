import axios from 'axios';
import { useQuery } from 'react-query';

export const useAdvice = () => {
  const { data, isError } = useQuery(
    'advice',
    async () => {
      return await axios
        .get('https://api.adviceslip.com/advice')
        .then((res) => res.data.slip.advice);
    },
    {
      meta: {
        errorMessage: '명언을 불러올 때 에러가 발생했습니다.',
      },
    },
  );

  return { data, isError };
};
