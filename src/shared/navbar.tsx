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
import AdbIcon from '@mui/icons-material/Adb';
import { useContext, useState } from 'react';
import { Account } from '../profile/pages/account';
import { LogOut } from '../signedOut/logOutModal';
import { useNavigate } from 'react-router-dom';
import { Profile } from '../profile/pages/profile';
import { AppContext } from '../contexts/appContext';

const pages = [
  { id: 1, pageName: 'Home', url: '/home', toolTip: 'Lets go Home' },
  { id: 2, pageName: 'PingPong', url: '/pingpong', toolTip: 'Go to Ping Pong' },
  { id: 3, pageName: 'Staff', url: '/staff', toolTip: 'Meet our Staff' },
];
const settings = [
  { id: 1, settingName: 'profile' },
  { id: 2, settingName: 'account' },
  { id: 3, settingName: 'logout' },
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

  const navigate = useNavigate();

  //user context
  const { user } = useContext(AppContext);
  console.log('user', user);

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
  const goToPage = (page: string) => {
    setActivePage(page);
    navigate(page);
  };

  const handleOpenModal = (target: string) => {
    switch (target) {
      case 'profile':
        setOpenProfileModal(true);
        break;
      case 'account':
        setOpenAccountModal(true);
        break;
      case 'logout':
        setOpenLogoutModal(true);
        break;
      case 'login':
        setSignInModalOpen(true);
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
      109.6deg,
      rgb(0, 0, 0) 11.2%,
      rgb(11, 132, 145) 91.1%
    )`,
        }}
      >
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' } }} />
            <Typography
              variant='h6'
              noWrap
              component='a'
              onClick={() =>
                activePage === '/home' ? null : goToPage('/home')
              }
              sx={{
                mr: 5,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                cursor: activePage === '/home' ? 'default' : 'pointer',
              }}
            >
              LOGO
            </Typography>

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
                          activePage === page.url ? null : goToPage(page.url)
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
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant='h5'
              noWrap
              component='a'
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
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
                  onClick={() => goToPage(page.url)}
                  disabled={activePage === page.url}
                  sx={{
                    ml: 7,
                    my: 2,
                    color:
                      activePage === page.url ? 'rgb(176, 151, 151)' : 'white',
                    display: 'inline',
                    '&:hover': {
                      color: 'rgb(176, 151, 151)',
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
                            ? 'rgb(176, 151, 151)'
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
                sx={{
                  background: `linear-gradient(
                              109.6deg,
                              rgb(11, 132, 145) 2.1%,
                              rgb(20, 30, 10) 61.2%
                            )`,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                  '&:active': {
                    transform: 'scale(0.95)',
                  },
                }}
              >
                Log in
              </Button>
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title='Open settings' placement='left'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt='Remy Sharp'
                      src='/static/images/avatar/2.jpg'
                    />
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
            {/* --------- */}
          </Toolbar>
        </Container>
      </AppBar>
      {openProfileModal && (
        <Profile
          setModalOpen={setOpenProfileModal}
          modalOpen={openProfileModal}
        />
      )}
      {openAccountModal && (
        <Account
          setModalOpen={setOpenAccountModal}
          modalOpen={openAccountModal}
        />
      )}
      {openLogoutModal && (
        <LogOut setModalOpen={setOpenLogoutModal} modalOpen={openLogoutModal} />
      )}
    </>
  );
}
