import { ReactNode, createContext, useState, useEffect } from 'react';
import { EmployeeResponse } from '../services/API/response/employeeResponse';

interface ContextProps {
  user: EmployeeResponse | null;
  setUser: (user: EmployeeResponse | null) => void;
}

export const AppContext = createContext<ContextProps>({
  user: null,
  setUser: () => {},
});

export const Userprovider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<EmployeeResponse | null>(null);

  // Hämta användarinformation från localstate
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }
  }, []);

  const setUser = (newUser: EmployeeResponse | null) => {
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('user');
    }
    setUserState(newUser);
  };

  const contextValue: ContextProps = {
    user,
    setUser,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
