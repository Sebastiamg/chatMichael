import React, {createContext, useContext, useState} from 'react';

const serverContext = createContext<any>('127.0.0.1');

export function ServerContextProvider({children}: any) {
  const [ip, setIp] = useState<string>('');

  function setServerIp(value: string) {
    setIp(value);
  }

  return (
    <serverContext.Provider value={{ip, setServerIp}}>
      {children}
    </serverContext.Provider>
  );
}

export const useServerContext = () => {
  return useContext(serverContext);
};
