import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { useContext, useState } from 'react';
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PongResultRequest } from '../../services/API/request/pongResultRequest';
import { PongResultSchema } from '../../schemas/pongResultSchema';
import { AppContext } from '../../contexts/appContext';
import '../../style/shared.css';
import { useFetchUser } from '../queries/useQueries/useFetchUser';
import { EmployeeResponse } from '../../services/API/response/employeeResponse';
import { useCreatePongResults } from '../queries/useMutations/useCreatePongResult';
import { toast } from 'react-toastify';

export const AddPingPongGame = () => {
  const { user } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useFetchUser();
  const createResult = useCreatePongResults();

  const formMethods = useForm<PongResultRequest>({
    resolver: yupResolver(PongResultSchema),
    defaultValues: {
      fK_PersonID: user?.personID,
      fK_PersonIDPoints: undefined,
      opponentPoints: undefined,
      opponentUsername: '',
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = formMethods;

  const onSubmit = (data: PongResultRequest) => {
    setLoading(true);
    setTimeout(() => {
      createResult.mutate(data, {
        onSuccess: (data) => {
          toast.success('You have successfully registered the game!');
          reset();
        },
        onError: (error) => {
          toast.error('An error occurred. Please try again later.');
        },
        onSettled: () => {
          setLoading(false);
        },
      });
    }, 1500);
  };

  return (
    <>
      {user?.personID && fetchUsers.data && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: ' center',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              minWidth: 500,
              height: 400,
            },
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Paper elevation={3} sx={{ padding: '1rem' }}>
              <Grid container>
                <Controller
                  name='fK_PersonID'
                  control={control}
                  defaultValue={user?.personID}
                  render={({ field }) => (
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                          <TextField
                            {...field}
                            disabled
                            size='medium'
                            label='Username'
                            value={user?.username || ''}
                            fullWidth
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position='end'>
                                  <LockIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Controller
                            name='fK_PersonIDPoints'
                            control={control}
                            render={({ field }) => (
                              <>
                                <TextField
                                  {...field}
                                  size='medium'
                                  label='User Points'
                                  fullWidth
                                  type='number'
                                  value={field.value || ''}
                                />
                                {errors?.fK_PersonIDPoints?.message && (
                                  <Typography className='inputError'>
                                    {String(errors.fK_PersonIDPoints.message)}
                                  </Typography>
                                )}
                              </>
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} md={8}>
                          <Controller
                            name='opponentUsername'
                            control={control}
                            render={({ field }) => (
                              <>
                                <FormControl fullWidth>
                                  <InputLabel id='opponent-username-label'>
                                    Opponents Username
                                  </InputLabel>
                                  <Select
                                    {...field}
                                    labelId='opponent-username-label'
                                    label='Opponents Username'
                                    onChange={(event) =>
                                      field.onChange(event.target.value)
                                    }
                                  >
                                    {fetchUsers.data.map(
                                      (user: EmployeeResponse) => (
                                        <MenuItem
                                          key={user.personID}
                                          value={user.username}
                                        >
                                          {user.username}
                                        </MenuItem>
                                      )
                                    )}
                                  </Select>
                                </FormControl>
                                {errors?.opponentUsername?.message && (
                                  <Typography className='inputError'>
                                    {String(errors.opponentUsername.message)}
                                  </Typography>
                                )}
                              </>
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Controller
                            name='opponentPoints'
                            control={control}
                            render={({ field }) => (
                              <>
                                <TextField
                                  {...field}
                                  size='medium'
                                  label='Opponents Points'
                                  fullWidth
                                  type='number'
                                  value={field.value || ''}
                                />
                                {errors?.opponentPoints?.message && (
                                  <Typography className='inputError'>
                                    {String(errors.opponentPoints.message)}
                                  </Typography>
                                )}
                              </>
                            )}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                />
                <Grid item xs={12} display='flex' justifyContent='center' p={2}>
                  <Button
                    disabled={!isDirty || loading}
                    fullWidth
                    variant='contained'
                    type='submit'
                  >
                    {loading ? <CircularProgress size={24} /> : 'Add Game'}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        </Box>
      )}
    </>
  );
};
