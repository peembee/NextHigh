import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useFetchUserById } from '../../staff/queries/useQueries/useFetchUserById';
import { AppContext } from '../../contexts/appContext';

type DialogUpdateAccountProps = {
  userId: number;
  setUpdateUserOpen: (open: boolean) => void;
};
export const DialogUpdateAccount = (props: DialogUpdateAccountProps) => {
  const { userId, setUpdateUserOpen } = props;
  console.log('userId', userId);

  const { setUser } = useContext(AppContext);
  const getUpdatedUser = useFetchUserById(userId);

  useEffect(() => {
    if (getUpdatedUser.isSuccess) {
      setUser(getUpdatedUser.data);
      console.log('updated user', getUpdatedUser.data);
      toast.success('Account updated');
      setUpdateUserOpen(false);
    }
  });
  return getUpdatedUser.data;
};
