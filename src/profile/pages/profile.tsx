import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { EmployeeResponse } from '../../services/API/response/employeeResponse';
import { ProfilePaper } from '../components/profilePaper';
import { useFetchEmpRankById } from '../queries/useQueries/useFetchEmpRankById';
import { useFetchPongRankById } from '../queries/useQueries/useFetchPongRankById';
import { useFetchPongResultById } from '../queries/useQueries/useFetchPongResultById';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type ProfileProps = {
  setModalOpen: (close: boolean) => void;
  modalOpen: boolean;
  user: EmployeeResponse;
};

export const Profile = (props: ProfileProps) => {
  const { setModalOpen, modalOpen, user } = props;

  const fetchEmpRank = useFetchEmpRankById(user?.personID);
  const fetchPongRank = useFetchPongRankById(user?.personID);
  const fetchPongResult = useFetchPongResultById(user?.personID);

  return (
    <>
      {user &&
        fetchEmpRank.data &&
        fetchPongRank.data &&
        fetchPongResult.data && (
          <BootstrapDialog
            onClose={() => setModalOpen(false)}
            aria-labelledby='customized-dialog-title'
            open={modalOpen}
          >
            <DialogTitle
              sx={{
                m: 0,
                p: 2,
                pr: 2,
                display: 'flex',
                justifyContent: 'center',
              }}
              id='customized-dialog-title'
            >
              Profile
            </DialogTitle>
            <IconButton
              aria-label='close'
              onClick={() => setModalOpen(false)}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <ProfilePaper
                memberSince={user.createdDate}
                rankEmpTitle={fetchEmpRank.data.rankTitle}
                rankPongTitle={fetchPongRank.data.rankTitle}
                pongResults={fetchPongResult.data}
              />
            </DialogContent>
          </BootstrapDialog>
        )}
    </>
  );
};
