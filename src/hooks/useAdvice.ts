import axios from 'axios';
import { useState } from 'react';

export const useAdvice = () => {
  const [advice, setAdvice] = useState('');

  axios
    .get('https://api.adviceslip.com/advice')
    .then((res) => setAdvice(res.data.slip.advice))
    .catch(() => setAdvice('Hi dopen !'));

  return { advice };
};
