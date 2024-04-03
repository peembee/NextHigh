import { ReactNode, createContext, useState, useEffect } from 'react';
import { EmployeeResponse } from '../services/API/response/employeeResponse';
import axios from 'axios';

interface ContextProps {
  user: EmployeeResponse | null;
  setUser: (user: EmployeeResponse | null) => void;
  fetchUpdatedUser: (userId: number) => Promise<void>;
}

export const AppContext = createContext<ContextProps>({
  user: null,
  setUser: () => {},
  fetchUpdatedUser: async () => {},
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

  const fetchUpdatedUser = async (userId: number) => {
    const getUserApi = `${import.meta.env.VITE_APP_API_URL}/person`;
    try {
      const res = await axios.get(`${getUserApi}/${userId}`);
      setUser(res.data);
    } catch (error) {
      console.error('Error fetching updated user:', error);
    }
  };

  const contextValue: ContextProps = {
    user,
    setUser,
    fetchUpdatedUser,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
