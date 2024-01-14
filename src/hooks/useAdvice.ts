import axios from 'axios';
import { useQuery } from 'react-query';

export const useAdvice = () => {
  const { data, isError, isLoading } = useQuery('advice', async () => {
    return await axios
      .get('https://api.adviceslip.com/advice')
      .then((res) => res.data.slip.advice);
  });

  return { data, isError, isLoading };
};
