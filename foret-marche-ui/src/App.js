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
import Typography from '@mui/material/Typography';
import Logo from './img/logo_white.png';

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
      <Box sx={{ flexGrow: 1, pb:3 }} >
        <AppBar position="static" color = "success">
          <Toolbar sx={{align: "left"}}>
            <Box
              component="img"
              sx={{height: 50, pr: 1, cursor:"pointer"}}
              alt="Your logo."
              src={Logo}
            />
            <Typography variant="h3" component="div" align="left" sx={{ flexGrow: 1 ,fontFamily: 'Monospace', fontSize: 40, cursor:"pointer" }}>
              Forêt Marché
            </Typography>
            <Button color="inherit" sx={{ fontFamily: 'Monospace', fontSize: 20 }} >Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{py:4}}> 
        <Typography variant="h3" component="div" sx={{fontFamily: 'Monospace', fontWeight: 'medium'}}> Products for Sale </Typography>
      </Box>
      <div style= {{width: '100%'}}>
        <TableContainer align = "center">
          <Table style={{ width: 800}} stickyHeader>
            <TableHead>
              {state.offers && columns.map((column) => (
                  <TableCell> <Typography sx = {{fontWeight: "bold", fontSize:24, fontFamily: 'Monospace'}}> {column} </Typography></TableCell>
                ))}
            </TableHead>
            <TableBody>
              {state.offers && state.offers.map((offer) => { 
                return <TableRow>
                  <TableCell> <Typography sx={{fontFamily: 'Monospace', fontSize:18}}> {offer.product}      </Typography> </TableCell>
                  <TableCell> <Typography sx={{fontFamily: 'Monospace', fontSize:18}}> {offer.quantity}     </Typography> </TableCell>
                  <TableCell> <Typography sx={{fontFamily: 'Monospace', fontSize:18}}> {offer.unit}         </Typography> </TableCell>
                  <TableCell> <Typography sx={{fontFamily: 'Monospace', fontSize:18}}> {offer.price}        </Typography> </TableCell>
                  <TableCell> <Typography sx={{fontFamily: 'Monospace', fontSize:18}}> {offer.sellerNumber} </Typography> </TableCell>
                  <TableCell> 
                    <Button sx={{ mr: 2, }} color="success" onClick={() => console.log("TODO Edit")} variant="outlined">Buy</Button>
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