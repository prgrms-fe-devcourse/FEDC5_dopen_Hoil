import { useState, useCallback } from 'react';

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  }, []);

  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  return { value, onChange, reset };
};

export default useInput;
