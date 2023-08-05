import { useEffect, useState } from "react";

const PREFIX = "whatsapp-clone-";

export default function useLocalStorage(key, initialState) {
  const prefixedKey = PREFIX + key;
  const [value, setvalue] = useState(() =>
    getSavedValue(prefixedKey, initialState)
  );
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [value, prefixedKey]);
  return [value, setvalue];
}

function getSavedValue(prefixedKey, initialState) {
  const jsonValue = localStorage.getItem(prefixedKey);
  if (jsonValue) {
    return JSON.parse(jsonValue);
    }
  return initialState instanceof Function ? initialState() : initialState;
}
