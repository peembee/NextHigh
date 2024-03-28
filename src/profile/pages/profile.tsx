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
import { useFetchQuizResultById } from '../queries/useQueries/useFetchQuizResultById';
import { Typography } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root': {
    maxWidth: '100%',
    maxHeight: '90%',
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
  const fetchQuizResult = useFetchQuizResultById(user?.personID);

  return (
    <>
      {user && fetchEmpRank.data && fetchPongRank.data && (
        <BootstrapDialog
          onClose={() => setModalOpen(false)}
          aria-labelledby='customized-dialog-title'
          open={modalOpen}
          sx={{
            maxHeight: '100%',
            maxWidth: '100%',
          }}
        >
          <DialogTitle
            sx={{
              m: 0,
              p: 2,
              pr: 2,
              display: 'flex',
              justifyContent: 'center',
              background: 'linear-gradient(45deg, #ff00ff, #00ffff)',
              boxShadow: '0px 10px 40px 10px rgba(0, 0, 0, 0.2)',
            }}
            id='customized-dialog-title'
          >
            <Typography
              variant='h5'
              sx={{
                color: '#fff',
                textAlign: 'center',
                borderRadius: '25px',
                textTransform: 'uppercase',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold',
                letterSpacing: '6px',
                minWidth: '300px',
                maxWidth: `auto`,
              }}
            >
              {user.username}
            </Typography>
          </DialogTitle>
          <IconButton
            aria-label='close'
            onClick={() => setModalOpen(false)}
            sx={{
              position: 'absolute',
              scale: '1.3',
              right: 20,
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
              pongResults={fetchPongResult.data ?? []}
              quizResults={fetchQuizResult.data ?? []}
              imageURL={user.imageURL || ''}
            />
          </DialogContent>
        </BootstrapDialog>
      )}
    </>
  );
};
