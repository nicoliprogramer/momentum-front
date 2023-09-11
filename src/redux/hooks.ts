import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { useEffect, useState } from "react";

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export function useLocalState(defaultValue: string, key: string) {
    const [value, setValue] = useState(() => {
    const localStorageValue = localStorage.getItem(key);

    return localStorageValue !== null
      ? localStorageValue
      : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, (value));
  }, [key, value]);

  return [value, setValue];
}
