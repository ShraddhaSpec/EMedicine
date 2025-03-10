import React, {useEffect,useState} from 'react';
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
import { useCart } from '../Context/CartContext';

interface HeaderProps {
  onLogOut: () => void; // Add this
}

export const Header : React.FC<HeaderProps> = ({ onLogOut }) => {
  const  role  = localStorage.getItem("role");
  const logoUrl = '../Images/logo2.png';
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve the username from localStorage
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const settings = role === 'admin'
    ? ['Profile', 'Logout']
    : ['Profile', 'My Orders', 'Logout'];

  const menuItems = ['Medicines', 'Customers', 'Orders'];
  const { quantity } = useCart();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogout = () => {
    console.log("Navigating to /login");
    localStorage.clear();
    onLogOut();
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

          {role === 'admin' && menuItems.map((item) => (
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
           {role === 'user' &&(
          <Box sx={{ flexGrow: 0 }}>
            <Link to='/cart' >
              <IconButton color="inherit" aria-label="shopping cart" sx={{ p: 2 }}>
                <Badge badgeContent={ quantity } color="error">
                  <ShoppingCartIcon fontSize="large" sx={{ color: 'white' }} />
                </Badge>
              </IconButton>
            </Link>
          </Box>)}

          <Box sx={{ flexGrow: 0 }}>
            <IconButton color="inherit" onClick={handleOpenUserMenu} sx={{ p: 1 }}>
              {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
              <AccountCircle fontSize="large" />
            </IconButton>{username}
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
