import {
  ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { EmployeeResponse } from '../services/API/response/employeeResponse';

interface ContextProps {
  user: EmployeeResponse | null;
  setUser: Dispatch<SetStateAction<EmployeeResponse | null>>;
  login: (userData: EmployeeResponse) => void;
}

export const AppContext = createContext<ContextProps>({
  user: null,
  setUser: () => {},
  login: () => {},
});

export const Userprovider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<EmployeeResponse | null>(null);

  const login = (userData: EmployeeResponse) => {
    // Anropa setUser här för att uppdatera användaruppgifterna när någon loggar in
    setUser(userData);
  };

  const contextValue: ContextProps = {
    user,
    setUser,
    login,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
