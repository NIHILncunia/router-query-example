import { useCallback, useRef, useState } from 'react';

type InputElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
export const useInput = <T extends InputElement>(id: string) => {
  const [ value, setValue, ] = useState('');
  const ref = useRef<T>();

  const onChange = useCallback(() => {
    setValue(ref.current.value);
  }, []);

  return {
    data: {
      value, id, onChange, ref,
    },
    setValue,
  };
};
