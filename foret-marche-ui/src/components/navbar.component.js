import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Logo from '../img/logo_white.png';

export default function Navbar(props) {

  return (
    <Box sx={{ pb: 3 }} >
      <AppBar position="static" color="success">
        <Toolbar>
          <Box sx={{ display: "flex", justifyContent: "space-between", width: 1 }}>

            <Box sx={{ display: "inline-flex", flexDirection: "row", cursor: "pointer" }}>
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
              <Button color="inherit" sx={{ fontFamily: 'Monospace', fontSize: 20 }} >
                Sell
              </Button>
              <Button onClick={() => props.changeTab('offers')} color="inherit" sx={{ fontFamily: 'Monospace', fontSize: 20, color: "white" }} >
                Offers
              </Button>
              <Button onClick={() => props.changeTab('bids')} color="inherit" sx={{ fontFamily: 'Monospace', fontSize: 20, color: "white" }} >
                Bids
              </Button>
              <Button color="inherit" sx={{ fontFamily: 'Monospace', fontSize: 20 }} >
                Login
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>

  );
}