import { useEffect, useRef } from 'react';

type PropsType = Record<string, any>;

export const useTraceUpdate = <T extends PropsType>(props: T): void => {
  const prev = useRef<T>(props);

  useEffect(() => {
    const changedProps: Record<keyof T, any[]> = Object.entries(props).reduce(
      (acc, [k, v]) => {
        if (prev.current[k] !== v) {
          acc[k as keyof T] = [prev.current[k], v];
        }
        return acc;
      },
      {} as Record<keyof T, [T[keyof T], T[keyof T]]>,
    );

    if (Object.keys(changedProps).length > 0) {
      console.log('Changed props:', changedProps);
    }

    prev.current = props;
  });
};
