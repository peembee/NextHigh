import { yupResolver } from '@hookform/resolvers/yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import '../../style/signIn.css';
import '../../style/shared.css';
import { Box, CircularProgress } from '@mui/material';
import { useFetchUser } from '../queries/useQueries/useLogin';
import { toast } from 'react-toastify';
import { LoginRequest } from '../../services/API/request/loginRequest';
import { useContext, useState } from 'react';
import { AppContext } from '../../contexts/appContext';
import { SignInSchema } from '../../schemas/signInSchema';

type SignInProps = {
  setSignInModalOpen: (close: boolean) => void;
  setSignUpModalOpen: (close: boolean) => void;
};

export default function SignIn(props: SignInProps) {
  const { setSignInModalOpen, setSignUpModalOpen } = props;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(AppContext);

  const userSignIn = useFetchUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema),
  });

  const onSubmit = (data: LoginRequest) => {
    setIsLoading(true);
    setTimeout(() => {
      userSignIn.mutate(data, {
        onSuccess: (data) => {
          toast.success('Welcome!');
          setUser(data.result);
          setSignInModalOpen(false);
        },
        onError: (error: any) => {
          setErrorMessage(error.response.data);
        },
        onSettled: () => {
          setIsLoading(false);
        },
      });
    }, 1500);
  };

  return (
    <>
      <Box sx={{ marginTop: '6rem' }}>
        <section className='%-100 gradient-custom'>
          <div className='container py-1 h-100'>
            <div className='row d-flex justify-content-center align-items-center h-100'>
              <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
                <div
                  className='card bg-dark text-white'
                  style={{ borderRadius: '1rem' }}
                >
                  {/* close Button */}
                  <div className='closeBtnContainer'>
                    <button
                      type='button'
                      className='btnClose'
                      aria-label='Close'
                      onClick={() => setSignInModalOpen(false)}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        fill='currentColor'
                        className='bi bi-x-lg'
                        viewBox='0 0 16 16'
                      >
                        <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z' />
                      </svg>
                    </button>
                  </div>
                  <div className='card-body p-5 text-center'>
                    <div className='mb-md-5 mt-md-4 pb-5'>
                      <h2 className='fw-bold mb-2 text-uppercase'>Login</h2>
                      <p className='text-white-50 mb-5'>
                        Please enter your username and password!
                      </p>

                      {/* Forms and Yup validation */}
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='form-outline form-white mb-4'>
                          <input
                            type='text'
                            id='typeUsername'
                            autoComplete='username'
                            placeholder='Username'
                            className='form-control form-control-lg'
                            {...register('username')}
                          />
                          <p className='inputError'>
                            {errors.username?.message}
                          </p>
                        </div>

                        <div className='form-outline form-white mb-4'>
                          <input
                            type='password'
                            id='typePasswordX'
                            autoComplete='current-password'
                            placeholder='Password'
                            className='form-control form-control-lg'
                            {...register('password')}
                          />
                          <p className='inputError'>
                            {errors.password?.message}
                          </p>
                        </div>

                        {/* <p className='small mb-5 pb-lg-2'>
                          <a className='text-white-50' href='#!'>
                            Forgot password?
                          </a>
                        </p> */}

                        <button
                          className='btn btn-outline-light btn-lg px-5'
                          type='submit'
                          disabled={isLoading}
                        >
                          {isLoading ? <CircularProgress size={24} /> : 'Login'}
                        </button>
                        {errorMessage !== null && (
                          <p className='inputError'>{errorMessage}</p>
                        )}
                      </form>
                    </div>

                    <div>
                      <p className='mb-0'>
                        Don't have an account?{' '}
                        <button
                          onClick={() => {
                            setSignInModalOpen(false);
                            setSignUpModalOpen(true);
                          }}
                          className='text-white-50 fw-bold'
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0)',
                          }}
                        >
                          Sign Up
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Box>
    </>
  );
}
