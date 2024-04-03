import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../style/signUp.css';
import { UseCreateUser } from '../queries/useMutations/useCreateUser';
import { EmployeeRequest } from '../../services/API/request/employeeRequest';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { SignUpSchema } from '../../schemas/signUpSchema';

type SignUpProps = {
  setSignUpModalOpen: (close: boolean) => void;
  setSignInModalOpen: (close: boolean) => void;
};

export function SignUp(props: SignUpProps) {
  const { setSignUpModalOpen, setSignInModalOpen } = props;
  const [isLoading, setIsLoading] = useState(false);
  const createNewUser = UseCreateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(SignUpSchema),
  });

  const onSubmit = (data: EmployeeRequest) => {
    setIsLoading(true);

    createNewUser.mutate(data, {
      onSuccess: () => {
        toast.success('You are successfully registered!');
        reset();
        setSignUpModalOpen(false);
        setSignInModalOpen(true);
      },
      onError: () => {
        toast.error('An error occurred. Please try again later.');
      },
      onSettled: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <>
      <Box
        sx={{
          marginTop: '6rem',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 9999,
        }}
      >
        <div>
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
                        onClick={() => {
                          setSignInModalOpen(true);
                          setSignUpModalOpen(false);
                        }}
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
                    <h2
                      style={{ display: 'flex', justifyContent: 'center' }}
                      className='fw-bold mb-2 text-uppercase'
                    >
                      CREATE AN ACCOUNT
                    </h2>
                    <div className='card-body p-5 text-center'>
                      <div className='mb-md-5 mt-md-4 pb-5'>
                        {/* Forms and Yup validation */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                            }}
                          >
                            {/* Enter Username */}
                            <div
                              style={{ marginRight: '25px' }}
                              className='form-outline form-white mb-4'
                            >
                              <input
                                type='text' // Använd "text" om fältet är för användarnamn
                                id='typeUsername' // Uppdatera id om det är mer relevant för användarnamnet
                                placeholder='Username'
                                className='form-control form-control-lg'
                                {...register('username')}
                              />
                              <p className='inputError'>
                                {errors.username?.message}
                              </p>
                            </div>

                            {/* Enter Email */}
                            <div className='form-outline form-white mb-4'>
                              <input
                                type='email' // Använd "text" om fältet är för användarnamn
                                id='typeEmail' // Uppdatera id om det är mer relevant för användarnamnet
                                placeholder='Email'
                                autoComplete='email'
                                className='form-control form-control-lg'
                                {...register('email')}
                              />
                              <p className='inputError'>
                                {errors.email?.message}
                              </p>
                            </div>
                          </Box>

                          {/* Enter Firstname */}
                          <div className='form-outline form-white mb-4'>
                            <input
                              type='text'
                              id='typeFirstname'
                              placeholder='Firstname'
                              autoComplete='given-name'
                              className='form-control form-control-lg'
                              {...register('firstName')}
                            />
                            <p className='inputError'>
                              {errors.firstName?.message}
                            </p>
                          </div>

                          {/* Enter Lastname */}
                          <div className='form-outline form-white mb-4'>
                            <input
                              type='text' // Använd "text" om fältet är för användarnamn
                              id='typeLastname' // Uppdatera id om det är mer relevant för användarnamnet
                              placeholder='Lastname'
                              autoComplete='family-name'
                              className='form-control form-control-lg'
                              {...register('lastName')}
                            />
                            <p className='inputError'>
                              {errors.lastName?.message}
                            </p>
                          </div>

                          {/* Enter YearsInPratice */}
                          <div className='form-outline form-white mb-4'>
                            <input
                              type='number' // Använd "text" om fältet är för användarnamn
                              id='typeHiredtime' // Uppdatera id om det är mer relevant för användarnamnet
                              placeholder='Employed for many years'
                              autoComplete='off'
                              className='form-control form-control-lg'
                              {...register('yearsInPratice')}
                            />
                            <p className='inputError'>
                              {errors.yearsInPratice?.message}
                            </p>
                          </div>

                          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            {/* Enter Password */}
                            <div
                              style={{ marginRight: '25px' }}
                              className='form-outline form-white mb-4'
                            >
                              <input
                                type='password'
                                id='typePassword'
                                autoComplete='off'
                                placeholder='Password'
                                className='form-control form-control-lg'
                                {...register('password')}
                              />
                              <p className='inputError'>
                                {errors.password?.message}
                              </p>
                            </div>

                            {/* Repeat password */}
                            <div className='form-outline form-white mb-4'>
                              <input
                                type='password'
                                id='typeConfirmPassword'
                                autoComplete='off'
                                placeholder='Repeat your password'
                                className='form-control form-control-lg'
                                {...register('confirmPassword')}
                              />
                              <p className='inputError'>
                                {errors.confirmPassword?.message}
                              </p>
                            </div>
                          </Box>

                          <button
                            disabled={isLoading}
                            className='btn btn-outline-light btn-lg px-5'
                            type='submit'
                          >
                            {isLoading ? (
                              <CircularProgress size={24} />
                            ) : (
                              'Register'
                            )}
                          </button>
                        </form>
                      </div>

                      <div>
                        <p className='mb-0'>
                          Have already an account?{' '}
                          <button
                            onClick={() => {
                              setSignInModalOpen(true);
                              setSignUpModalOpen(false);
                            }}
                            className='text-white-50 fw-bold'
                            style={{
                              backgroundColor: 'rgba(255, 255, 255, 0)',
                            }}
                          >
                            Login here
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Box>
    </>
  );
}
