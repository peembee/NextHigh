import { Outlet } from 'react-router-dom';
import { Footer } from '../shared/footer';
import '../style/shared.css';
import { Box } from '@mui/material';
import { Navbar } from '../shared/navbar';
import { useState } from 'react';
import SignIn from '../signIn/pages/signIn';
import { SignUp } from '../signUp/pages/signUp';

export function RootLayout() {
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          background: '#F5F5F5',
        }}
      >
        <Navbar setSignInModalOpen={setSignInModalOpen} />
        <Box className='appContainer'>
          <Outlet />
          {signUpModalOpen && (
            <SignUp
              setSignUpModalOpen={setSignUpModalOpen}
              setSignInModalOpen={setSignInModalOpen}
            />
          )}
          {signInModalOpen && (
            <SignIn
              setSignInModalOpen={setSignInModalOpen}
              setSignUpModalOpen={setSignUpModalOpen}
            />
          )}
        </Box>
        <Footer />
      </Box>
    </>
  );
}
