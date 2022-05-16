import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Logo from '../img/logo_white.png';
import {useTranslation} from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';


import useToken from '../util/useToken.util';
import LoginModal from './login.component';
import authService from '../services/auth-service';

export default function Navbar(props) {
  const { t, i18n } = useTranslation();
  const lngs = {
    en: { nativeName: 'English' },
    fr: { nativeName: 'Français' },
    nl: { nativeName: 'Nederlands' }
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { token, removeToken, setToken } = useToken();
  console.log("Token " + token);

  const [modalOpen, setModalOpen] = React.useState(false);

  const [e, setE] = React.useState('');
  console.log("TEST " + e)

  const toggle = () => {
    setModalOpen(false)
    setE('')
  }

  return (
    <Box sx={{ pb: 3 }} >
      <AppBar position="static" color="success">
        <Toolbar>
          <Box sx={{ display: "flex", justifyContent: "space-between", width: 1 }}>
            <Box onClick={() => props.changeTab('offers')} sx={{ display: "inline-flex", flexDirection: "row", cursor: "pointer" }}>
              <Box
                component="img"
                sx={{ height: 50, pr: 1 }}
                src={Logo}
              />
              <Typography variant="h3" component="div" sx={{ fontFamily: 'Monospace', fontSize: 40, color: 'white' }}>
                Forêt Marché
              </Typography>
            </Box>
            <Box>
              <Button 
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 , fontFamily: 'Monospace', fontSize: 20}}
                aria-controls={open ? "language" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined } color="inherit" >
                  <LanguageIcon sx={{mr:1}} />
                  {t('navbar.language')}
              </Button>
              <Menu
                anchorEl={anchorEl}
                id="language"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      zIndex: 0
                    }
                  }
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem sx={{fontWeight: i18n.resolvedLanguage === 'en' ? 'bold' : 'normal'}} type="submit" onClick={() => {i18n.changeLanguage('en');}}>English</MenuItem>
                <MenuItem sx={{fontWeight: i18n.resolvedLanguage === 'nl' ? 'bold' : 'normal'}} type="submit" onClick={() => {i18n.changeLanguage('nl');}}>Nederlands</MenuItem>
                <MenuItem sx={{fontWeight: i18n.resolvedLanguage === 'fr' ? 'bold' : 'normal'}} type="submit" onClick={() => {i18n.changeLanguage('fr');}}>Français</MenuItem>
              </Menu>
              <Button onClick={() => props.changeTab('sell')} color="inherit" sx={{ fontFamily: 'Monospace', fontSize: 20 }} >
              {t('navbar.sell')}
              </Button>
              <Button onClick={() => props.changeTab('offers')} color="inherit" sx={{ fontFamily: 'Monospace', fontSize: 20, color: "white" }} >
              {t('navbar.offers')}
              </Button>
              <Button onClick={() => props.changeTab('bids')} color="inherit" sx={{ fontFamily: 'Monospace', fontSize: 20, color: "white" }} >
              {t('navbar.bids')}
              </Button>
              {!token || token === null || token === undefined ? 
                <>
                  <Button color="inherit" onClick={() => setModalOpen(true)} sx={{ fontFamily: 'Monospace', fontSize: 20 }} >
                  {t('navbar.login')}
                  </Button>
                  {modalOpen &&
                    <LoginModal open={true} setClose={() => setModalOpen(false) } setOpen={() => setModalOpen(true)} />
                  }
                </> :
                <Button color="inherit" onClick={() => authService.logoutUser(removeToken) } sx={{ fontFamily: 'Monospace', fontSize: 20 }}>
                  {t('navbar.logout')}
                </Button>
              }
              
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>

  );
}
