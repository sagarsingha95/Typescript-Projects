import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

// function useLocalStorage<T>(key:string,initialValue:T):[T,Dispatch<SetStateAction<T>>]{
//     const [value,setValue] = useState<T>(()=>{
//         const stored = localStorage.getItem(key);
//         if(stored){
//             return JSON.parse(stored)
//         }
//         return initialValue
//     });

//     useEffect(()=>{
//         localStorage.setItem(key,JSON.stringify(value));
//     },[key,value])

//     return [value,setValue];
// }

// export default useLocalStorage

function useLocalStorage<T>(
  key: string,
  initialValue: T,
  validator: (value: unknown) => value is T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);

    if (stored === null) {
      return initialValue;
    }

    try {
      const parsed: unknown = JSON.parse(stored);

      if (validator(parsed)) {
        return parsed;
      }

      return initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
