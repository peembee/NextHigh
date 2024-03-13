import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import '../../../style/shared.css';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Checkbox,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { QuizRequest } from '../../../services/API/request/quizRequest';
import { QuizSchema } from '../../../schemas/quizSchema';
import { useCreateQuiz } from './queries/mutations/useCreateQuiz';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type AddQuizProps = {
  setModalOpen: (close: boolean) => void;
  modalOpen: boolean;
};

export const AddQuiz = (props: AddQuizProps) => {
  const { setModalOpen, modalOpen } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [checkedValue, setCheckedValue] = useState<string | null>(null);

  const createQuiz = useCreateQuiz();

  const formMethods = useForm<QuizRequest>({
    resolver: yupResolver(QuizSchema),
    defaultValues: {
      quizHeading: undefined,
      altOne: undefined,
      altTwo: undefined,
      altThree: undefined,
      points: 1,
      correctAnswer: undefined,
    },
  });

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = formMethods;

  const handleCheckboxChange = (correctAnswer: string) => {
    setCheckedValue(correctAnswer);
  };

  useEffect(() => {
    if (checkedValue !== null) {
      setValue('correctAnswer', checkedValue);
    }
  }, [checkedValue]);

  useEffect(() => {
    const checkedAlternative =
      watch('altOne') || watch('altTwo') || watch('altThree');

    if (checkedValue !== checkedAlternative) {
      setValue('correctAnswer', '');
      setCheckedValue(null);
    }
  }, [watch('altOne'), watch('altTwo'), watch('altThree')]);

  const onSubmit = (data: QuizRequest) => {
    setIsLoading(true);
    setTimeout(() => {
      createQuiz.mutate(data, {
        onSuccess: () => {
          toast.success('Quiz Added');
          reset();
          setModalOpen(false);
        },
        onError: (error) => {
          toast.error('An error occurred. Please try again later.');
        },
        onSettled: () => {
          setIsLoading(false);
        },
      });
    }, 1500);
  };

  return (
    <>
      <BootstrapDialog
        onClose={() => setModalOpen(false)}
        aria-labelledby='customized-dialog-title'
        open={modalOpen}
      >
        <form onSubmit={handleSubmit(onSubmit)} className='background'>
          <DialogTitle
            sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'center' }}
            id='customized-dialog-title'
          >
            <Typography>Account Details</Typography>
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
            <Grid container spacing={3} p={2} pl={5} pr={5}>
              <Grid item xs={4}>
                <Controller
                  name='points'
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <>
                      <TextField
                        {...field}
                        disabled={isLoading}
                        size='small'
                        type='number'
                        label='Given Points'
                        fullWidth
                        inputProps={{
                          min: 1,
                          max: 5,
                        }}
                      />
                      {errors?.points?.message && (
                        <Typography className='inputError'>
                          {String(errors.points.message)}
                        </Typography>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='quizHeading'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      disabled={isLoading}
                      multiline
                      rows={4}
                      size='small'
                      label='quizHeading'
                      fullWidth
                      sx={{ minWidth: '100%', paddingBottom: '20px' }}
                    />
                  )}
                />
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name='altOne'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        disabled={isLoading}
                        multiline
                        rows={2}
                        size='small'
                        label={'Alternative 1'}
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <>
                              <Divider
                                orientation='vertical'
                                flexItem
                                sx={{ background: 'black' }}
                              />
                              <Checkbox
                                disabled={isLoading}
                                color='primary'
                                checked={field.value === checkedValue}
                                onChange={() =>
                                  handleCheckboxChange(field.value)
                                }
                              />
                            </>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name='altTwo'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        multiline
                        disabled={isLoading}
                        rows={2}
                        size='small'
                        label={'Alternative 2'}
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <>
                              <Divider
                                orientation='vertical'
                                flexItem
                                sx={{ background: 'black' }}
                              />
                              <Checkbox
                                disabled={isLoading}
                                color='primary'
                                checked={field.value === checkedValue}
                                onChange={() =>
                                  handleCheckboxChange(field.value)
                                }
                              />
                            </>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name='altThree'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        disabled={isLoading}
                        multiline
                        rows={2}
                        size='small'
                        label={'Alternative 3'}
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <>
                              <Divider
                                orientation='vertical'
                                flexItem
                                sx={{ background: 'black' }}
                              />
                              <Checkbox
                                disabled={isLoading}
                                color='primary'
                                checked={field.value === checkedValue}
                                onChange={() =>
                                  handleCheckboxChange(field.value)
                                }
                              />
                            </>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Box
              sx={{
                background: '#FFCDD2',
                display: 'inline-block',
                padding: '5px',
                borderRadius: '5px',
                marginLeft: '15px',
                border: '1px solid #F8BBD0',
              }}
            >
              <Typography sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                Check the correct answer
              </Typography>

              <Divider />
              {errors?.quizHeading?.message && (
                <Typography className='inputError'>
                  {String(errors.quizHeading.message)}
                </Typography>
              )}
              {errors?.altOne?.message && (
                <Typography className='inputError'>
                  {String(errors.altOne.message)}
                </Typography>
              )}
              {errors?.altTwo?.message && (
                <Typography className='inputError'>
                  {String(errors.altTwo.message)}
                </Typography>
              )}
              {errors?.altThree?.message && (
                <Typography className='inputError'>
                  {String(errors.altThree.message)}
                </Typography>
              )}
              {errors?.correctAnswer?.message && !checkedValue && (
                <Typography className='inputError'>
                  {String(errors.correctAnswer.message)}
                </Typography>
              )}
            </Box>
          </DialogContent>
          <DialogActions
            sx={{
              display: 'flex',
              justifyContent: 'center',
              '@media (min-width:900px)': {
                justifyContent: 'flex-end',
                marginRight: '1rem',
              },
            }}
          >
            <Button
              type='submit'
              variant='outlined'
              disabled={!isDirty}
              autoFocus
              sx={{ width: '30%' }}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Save Details'}
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </>
  );
};
