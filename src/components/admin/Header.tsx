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
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Badge from '@mui/material/Badge';
import logoUrl from '../../Images/logo2.png';
import '../../custom.css';

//const pages = ['Home', 'Pricing', 'Blog'];
const settings = ['Profile', 'My Orders', 'Logout'];

export const Header = () => {

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

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

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
              width: 65, // Make the width equal to the height
              marginRight: 0,
              borderRadius: '50%', // This makes it round
              objectFit: 'cover', // Ensures the image fits inside the circle
            }}
          />
          <Typography
            variant="h3"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              ml: 1,
              flexGrow: 1,
              fontFamily: 'Roboto',
              fontStyle:'italic',
              fontWeight: 550,
              letterSpacing: '.1rem',
              color: '#669933',
              textDecoration: 'none',
            }}
          >
            Medicine
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton color="inherit" aria-label="shopping cart" sx={{ p: 2 }}>
              <Badge badgeContent={cartItemCount} color="error">
                <ShoppingCartIcon fontSize="large" />
              </Badge>
            </IconButton>
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </div>
    </AppBar>
  )
}
