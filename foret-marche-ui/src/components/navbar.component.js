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
import LoginModal from './login.component';
import authService from '../services/auth-service';
import { UserContext } from '../context/UserContext';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonIcon from '@mui/icons-material/Person';
import AddTaskIcon from '@mui/icons-material/AddTask';

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

  const [context, setContext] = React.useContext(UserContext);

  const removeToken = () => {
    localStorage.removeItem("token");
    setContext({...context, token: null})
  }

  const [state, setState] = React.useState({right: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          <ListItem onClick={() => props.changeTab('sell')}>
            <ListItemButton>
              <ListItemIcon> <AddCircleOutlineIcon /> </ListItemIcon>
              <ListItemText primary= {t('navbar.sell')} />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => props.changeTab('offers')}>
            <ListItemButton>
              <ListItemIcon> <StorefrontIcon /> </ListItemIcon>
              <ListItemText primary={t('navbar.offers')} />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => props.changeTab('bids')}>
            <ListItemButton>
              <ListItemIcon> <AddTaskIcon /> </ListItemIcon>
              <ListItemText primary={t('navbar.bids')} />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={handleClick}>
            <ListItemButton>
              <ListItemIcon> <LanguageIcon /> </ListItemIcon>
              <ListItemText primary={t('navbar.language')} />
            </ListItemButton>
          </ListItem>
          <Divider />
          {!context.token && context.token !== ''? 
            <>
            <ListItem onClick={() => setModalOpen(true)}>
              <ListItemButton>
                <ListItemIcon> <PersonIcon /> </ListItemIcon>
                <ListItemText primary={t('navbar.login')} />
              </ListItemButton>
            </ListItem> 
            </>
            : 
            <ListItem onClick={() => authService.logoutUser(removeToken)}>
              <ListItemButton>
                <ListItemIcon> <PersonIcon /> </ListItemIcon>
                <ListItemText primary= {t('navbar.logout')}/>
              </ListItemButton>
            </ListItem> 
          }     
      </List>
    </Box>
  );

  const [modalOpen, setModalOpen] = React.useState(false);

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
            <Box sx={{ display: { xs: 'none',  md: 'block' } }}>
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
              {!context.token && context.token !== ''? 
              <></>:
              <Button onClick={() => props.changeTab('bids')} color="inherit" sx={{ fontFamily: 'Monospace', fontSize: 20, color: "white" }} >
              {t('navbar.bids')}
              </Button>}
              {!context.token && context.token !== ''? 
              <></>:
              <Button onClick={() => props.changeTab('sales')} color="inherit" sx={{ fontFamily: 'Monospace', fontSize: 20, color: "white" }} >
              {t('sales.sold')}
              </Button>}
              {!context.token && context.token !== ''? 
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
              <Box component = "span"  sx={{ display: { md: 'none', xs: 'block' }, mt:1  }}> 
                  {["right"].map((anchor) => (
                    <React.Fragment key={anchor}>
                      <Button onClick={toggleDrawer(anchor, true)}> <MenuIcon sx={{color:"white"}} /> </Button>
                      <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                      >
                        {list(anchor)}
                      </Drawer>
                    </React.Fragment>
                  ))}
              </Box>  
          </Box>
        </Toolbar>
      </AppBar>
    </Box>

  );
}
