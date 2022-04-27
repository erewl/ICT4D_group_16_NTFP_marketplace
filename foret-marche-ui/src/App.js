import React from 'react';
import './App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';

import OffersService from './services/offers-service';

function App() {

  const [state, setState] = React.useState({ offers: [] })

  const columns =  ['Product','Quantity','Unit','Price','Phone Number']

  const update = s => {
    setState({ ...state, offers: s })
  }

  // useEffect is being run before and after each render of the site, to limit the API call only to when no data is in the frontend, the if-clause is introduced
  React.useEffect(() => {
    let response = OffersService.fetchData(update);
  }, []);

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1, pb:3 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
              Forêt Marché
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div style= {{width: '100%'}}>
        <TableContainer >
          <Table style={{ width: 1000, margin: 'auto'}}>
            <TableHead stickyHeader>
              {state.offers && columns.map((column) => (
                  <TableCell> <Typography sx = {{fontWeight: 'medium', fontSize:20}}> {column} </Typography></TableCell>
                ))}
            </TableHead>
            <TableBody>
              {state.offers && state.offers.map((offer) => { 
                return <TableRow>
                  <TableCell> <Typography> {offer.product}      </Typography> </TableCell>
                  <TableCell> <Typography> {offer.quantity}     </Typography> </TableCell>
                  <TableCell> <Typography> {offer.unit}         </Typography> </TableCell>
                  <TableCell> <Typography> {offer.price}        </Typography> </TableCell>
                  <TableCell> <Typography> {offer.sellerNumber} </Typography> </TableCell>
                  <TableCell> 
                    <Button sx={{ mr: 2 }} onClick={() => console.log("TODO Edit")} variant="outlined">Edit</Button>
                    <Button onClick={() => console.log("TODO Remove")} variant="outlined">Remove</Button>
                  </TableCell>
                </TableRow> })}
            </TableBody> 
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default App;
