import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useEffect, useState } from 'react';
import { Account } from '../profile/pages/account';
import { LogOut } from '../signedOut/logOutModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { Profile } from '../profile/pages/profile';
import { AppContext } from '../contexts/appContext';
import { AddQuiz } from '../admin/createQuiz/components/addQuiz';

export const pages = [
  { id: 1, pageName: 'Home', url: '/home', toolTip: 'Lets go Home' },
  { id: 2, pageName: 'PingPong', url: '/pingpong', toolTip: 'Go to Ping Pong' },
  { id: 3, pageName: 'Staff', url: '/staff', toolTip: 'Meet our Staff' },
];
const settings = [
  { id: 1, settingName: 'Profile' },
  { id: 2, settingName: 'Account' },
  { id: 3, settingName: 'Logout' },
];

type NavbarProps = {
  setSignInModalOpen: (close: boolean) => void;
};

export function Navbar(props: NavbarProps) {
  const { setSignInModalOpen } = props;
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [activePage, setActivePage] = useState<string>('/home');
  const [openProfileModal, setOpenProfileModal] = useState<boolean>(false);
  const [openAccountModal, setOpenAccountModal] = useState<boolean>(false);
  const [openLogoutModal, setOpenLogoutModal] = useState<boolean>(false);
  const [openAddQuiz, setOpenAddQuiz] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  //user context
  const { user } = useContext(AppContext);

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  // Navbar-actions
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // Page-actions
  const goToPage = (page: string, pageName?: string) => {
    if (!user && (page === '/pingpong' || page === '/staff')) {
      setSignInModalOpen(true);
    } else {
      setActivePage(page);
      navigate(page);

      pageName ? (document.title = `NextHigh - ${pageName}`) : `NextHigh`;
    }
  };

  const handleOpenModal = (target: string) => {
    switch (target) {
      case settings[0].settingName:
        setOpenProfileModal(true);
        break;
      case settings[1].settingName:
        setOpenAccountModal(true);
        break;
      case settings[2].settingName:
        setOpenLogoutModal(true);
        break;
      case 'login':
        setSignInModalOpen(true);
        break;
      case 'AddQuiz':
        setOpenAddQuiz(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <AppBar
        position='fixed'
        sx={{
          background: `linear-gradient(
      90deg,
      rgb(242, 129, 179) 5%,
      rgb(13, 12, 72) 100%
    )`,
        }}
      >
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Box
              component='a'
              sx={{
                display: { xs: 'none', md: 'block' },
              }}
            >
              <img
                onClick={() =>
                  activePage === '/home' ? null : goToPage('/home')
                }
                style={{
                  cursor: activePage === '/home' ? 'default' : 'pointer',
                  maxHeight: '50px',
                }}
                src='https://i.ibb.co/mXfh53J/Next-High-logotypejpeg.png'
                alt='Next-High-logotype'
              />
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {/* --------- */}
                {/* MobilePage */}

                {pages.map((page) => (
                  <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                    <Tooltip title={page.toolTip} placement='right'>
                      <Typography
                        onClick={() =>
                          activePage === page.url
                            ? null
                            : goToPage(page.url, page.pageName)
                        }
                        variant='body2'
                        sx={{
                          color:
                            activePage === page.url ? 'rgb(176, 151, 151)' : '',
                          fontWeight: 'bold',
                          textAlign: 'center',
                          cursor:
                            activePage === page.url ? 'default' : 'pointer',
                        }}
                      >
                        {page.pageName}
                      </Typography>
                    </Tooltip>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box
              component='a'
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
              }}
            >
              <img
                onClick={() =>
                  activePage === '/home' ? null : goToPage('/home')
                }
                style={{
                  cursor: activePage === '/home' ? 'default' : 'pointer',
                  maxHeight: '40px',
                }}
                src='https://i.ibb.co/mXfh53J/Next-High-logotypejpeg.png'
                alt='Next-High-logotypejpeg'
              />
            </Box>
            {/* --------- */}
            <Box
              ml={2}
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
              }}
            >
              {/* --------- */}
              {/* Big Screen */}
              {pages.map((page) => (
                <Button
                  key={page.id}
                  onClick={() => goToPage(page.url, page.pageName)}
                  disabled={activePage === page.url}
                  sx={{
                    ml: 7,
                    my: 2,
                    color:
                      activePage === page.url ? 'rgb(13, 12, 72)' : 'white',
                    display: 'inline',
                    '&:hover': {
                      color: 'rgb(13, 12, 72)',
                      transition: '0.2s',
                    },
                  }}
                >
                  <Tooltip title={page.toolTip}>
                    <Typography
                      variant='body2'
                      sx={{
                        fontWeight: 'bold',
                        color:
                          activePage === page.url
                            ? 'rgb(13, 12, 72)'
                            : 'inherit',
                        transition: '0.2s',
                      }}
                    >
                      {page.pageName}
                    </Typography>
                  </Tooltip>
                </Button>
              ))}
              {/* --------- */}
            </Box>

            {/* user profile */}

            {user === null ? (
              <Button
                onClick={() => handleOpenModal('login')}
                variant='contained'
              >
                Log in
              </Button>
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title='Open settings' placement='left'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt='Standard Profile Pic' src={user.imageURL} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {user.isAdmin && (
                    <MenuItem key={user.personID} onClick={handleCloseUserMenu}>
                      <Typography
                        onClick={() => handleOpenModal('AddQuiz')}
                        textAlign='center'
                      >
                        Add Quiz
                      </Typography>
                    </MenuItem>
                  )}
                  {settings.map((setting) => (
                    <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
                      <Typography
                        onClick={() => handleOpenModal(setting.settingName)}
                        textAlign='center'
                      >
                        {setting.settingName}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {openProfileModal && user && (
        <Profile
          setModalOpen={setOpenProfileModal}
          modalOpen={openProfileModal}
          user={user}
        />
      )}
      {openAccountModal && user && (
        <Account
          setModalOpen={setOpenAccountModal}
          modalOpen={openAccountModal}
        />
      )}
      {openLogoutModal && (
        <LogOut setModalOpen={setOpenLogoutModal} modalOpen={openLogoutModal} />
      )}
      {openAddQuiz && (
        <AddQuiz setModalOpen={setOpenAddQuiz} modalOpen={openAddQuiz} />
      )}
    </>
  );
}
