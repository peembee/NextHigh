import Box from '@mui/material/Box';
import { useContext, useState } from 'react';
import {
  Autocomplete,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputAdornment,
  Paper,
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
import { useQueryClient } from '@tanstack/react-query';
import { PongResultKeys } from '../../profile/queries/pongResultKeys';
import { PongRankKeys } from '../../profile/queries/pongRankKeys';
import { EmployeeKeys } from '../../staff/queries/employeeKeys';

export const AddPingPongGame = () => {
  const { user } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

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
          queryClient.invalidateQueries({ queryKey: PongRankKeys.all });
          queryClient.invalidateQueries({ queryKey: PongResultKeys.all });
          queryClient.invalidateQueries({ queryKey: EmployeeKeys.all });
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
            paddingBottom: { xs: '6rem', md: '0rem' },
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Paper
              elevation={3}
              sx={{
                padding: { xs: '3rem', md: '1rem' },
              }}
            >
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
                                  <Autocomplete
                                    {...field}
                                    options={[
                                      '',
                                      ...fetchUsers.data
                                        .filter(
                                          (filterUser: EmployeeResponse) =>
                                            filterUser.username !==
                                            user?.username
                                        )
                                        .map(
                                          (user: EmployeeResponse) =>
                                            user.username
                                        ),
                                    ]}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label='Opponents Username'
                                        error={!!errors?.opponentUsername}
                                        helperText={
                                          errors?.opponentUsername?.message
                                        }
                                      />
                                    )}
                                    onChange={(event, value) =>
                                      field.onChange(value)
                                    }
                                  />
                                </FormControl>
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
