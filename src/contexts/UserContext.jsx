import { createContext, useContext, useState } from 'react';

const Context = createContext();

const initialUser = null;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);

  return (
    <Context.Provider value={{ user, setUser }}>
      {children}
    </Context.Provider>
  );
};

export const useUserContext = () => useContext(Context);