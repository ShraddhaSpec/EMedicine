import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Badge from '@mui/material/Badge';
import '../custom.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
//const pages = ['Home', 'Pricing', 'Blog'];
// const settings = ['Profile', 'My Orders', 'Logout'];


export const Header = () => {

  const { user, logout } = useAuth();

  const logoUrl = '../Images/logo2.png';
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const settings = user?.role === 'admin'
    ? ['Profile', 'Logout']
    : ['Profile', 'My Orders', 'Logout'];

  const menuItems = ['Medicines', 'Customers', 'Orders'];

  const cartItemCount = 5;

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const getLinkPath = (setting: string) => {
    switch (setting) {
      case 'Profile':
        return '/profile';
      case 'My Orders':
        return '/myorders';
      case 'Orders':
        return '/orders';
      case 'Customers':
        return '/customers';
      case 'Medicines':
        return '/medicines';
      case 'Logout':
        return '/login';
      default:
        return '/';
    }
  };

  return (
    <AppBar position="static" className="app-container">
      <div className='header-container'>
        <Toolbar disableGutters>
          <Box component="img" className='logo'
            src={logoUrl}
            alt="Logo"
            sx={{
              height: 65,
              width: 65,
              marginRight: 0,
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <Link to='/' style={{ textDecoration: 'none', paddingRight: "30px" }}>
            <Typography
              variant="h3"
              noWrap
              component="a"
              // href="/"
              sx={{
                mr: 2,
                ml: 1,
                flexGrow: 1,
                fontFamily: 'Roboto',
                fontStyle: 'italic',
                fontWeight: 550,
                letterSpacing: '.1rem',
                color: '#669933',
              }}
            >
              Medicine
            </Typography>
          </Link>
          {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          </Box> */}

          {user?.role === 'admin' && menuItems.map((item) => (
            <Link style={{ textDecoration: 'none' }}
              key={item}
              to={getLinkPath(item)}
            >
              <Typography variant="h6" sx={{ color: 'white', mr: 3, fontFamily: 'Roboto', fontStyle: 'regulor', fontWeight: 400 }}>
                {item}
              </Typography>

            </Link>
          ))}

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 0 }}>
            <Link to='/cart' >
              <IconButton color="inherit" aria-label="shopping cart" sx={{ p: 2 }}>
                <Badge badgeContent={cartItemCount} color="error">
                  <ShoppingCartIcon fontSize="large" sx={{ color: 'white' }} />
                </Badge>
              </IconButton>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton color="inherit" onClick={handleOpenUserMenu} sx={{ p: 1 }}>
              {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
              <AccountCircle fontSize="large" />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
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
                <Link to={getLinkPath(setting)} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <MenuItem key={setting} onClick={() => {
                    handleCloseUserMenu();
                    if (setting === 'Logout') {
                      handleLogout();
                    } else {
                      navigate(getLinkPath(setting));
                    }
                  }}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </div>
    </AppBar>
  )
}
