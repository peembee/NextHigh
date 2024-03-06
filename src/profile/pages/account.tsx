import { styled } from '@mui/material/styles';

import Dialog from '@mui/material/Dialog';
import { AccountDetails } from '../components/accountDetails';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type AccountProps = {
  setModalOpen: (close: boolean) => void;
  modalOpen: boolean;
};

export const Account = (props: AccountProps) => {
  const { setModalOpen, modalOpen } = props;

  return (
    <>
      <BootstrapDialog
        onClose={() => setModalOpen(false)}
        aria-labelledby='customized-dialog-title'
        open={modalOpen}
      >
        <AccountDetails setModalOpen={setModalOpen} />
      </BootstrapDialog>
    </>
  );
};
