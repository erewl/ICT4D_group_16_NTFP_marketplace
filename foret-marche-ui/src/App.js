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
import { TextField } from '@mui/material';

function App() {

  const [state, setState] = React.useState({ offers: [] })

  const columns = ['Product', 'Quantity', 'Unit', 'Price', 'Phone Number']

  const update = s => {
    let offers = s.map(offer => ({ ...offer, editing: false }))
    setState({ ...state, offers: offers })
  }

  const toggleEditState = (offer) => {
    let offersCopy = state.offers
    offersCopy.find(o => o.id === offer.id).editing = !offersCopy.find(o => o.id === offer.id).editing
    setState({ ...state, offers: offersCopy })
  }

  // useEffect is being run before and after each render of the site, to limit the API call only to when no data is in the frontend, the if-clause is introduced
  React.useEffect(() => {
    let response = OffersService.fetchData(update);
  }, []);

  const determineEditButton = (offer) => {
    let editText = 'Edit'
    if (offer && offer.editing) editText = 'Save'

    // TODO group EDIT & BUY, and SAVE properly
    let f = < Button sx={{ mr: 2, }} color="success" onClick={() => console.log("TODO BUY")} variant="outlined" > Buy</Button >

    return <Button sx={{ mr: 2, }} color="success" onClick={() => toggleEditState(offer)} variant="outlined">{editText}</Button>
  }

  const commonStyle = { fontFamily: 'Monospace', fontSize: 18 }

  const renderCell = (offer, attribute) => {
    let content = offer[attribute]
    return <Typography sx={commonStyle}>
      {content}
    </Typography>
  }

  const renderEditableCell = (offer, attribute) => {
    let content = offer[attribute]
    if (!offer.editing)
      return <Typography sx={commonStyle}>
        {content}
      </Typography>
    else
      return <TextField sx={commonStyle} onChange={event => updateOffer(event, offer, attribute)} defaultValue={content} />
  }

  const updateOffer = (event, offer, attribute) => {
    console.log("Update offer's " + attribute + " to: " + event.target.value);
    let offerCopy = offer
    offerCopy[attribute] = event.target.value
    let offersCopy = state.offers
    offersCopy = offersCopy.map(o => {
      if (o.id === offerCopy.id) return offerCopy
      else return o
    })
    setState({...state, offers: offersCopy})
  };

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1, pb: 3 }} >
        <AppBar position="static" color="success">
          <Toolbar sx={{ align: "left" }}>
            <Box
              component="img"
              sx={{ height: 50, pr: 1, cursor: "pointer" }}
              alt="Your logo."
              src={Logo}
            />
            <Typography variant="h3" component="div" align="left" sx={{ flexGrow: 1, fontFamily: 'Monospace', fontSize: 40, cursor: "pointer" }}>
              Forêt Marché
            </Typography>
            <Button color="inherit" sx={{ fontFamily: 'Monospace', fontSize: 20 }} >Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="div" sx={{ fontFamily: 'Monospace', fontWeight: 'medium' }}> Products for Sale </Typography>
      </Box>
      <div style={{ width: '100%' }}>
        <TableContainer align="center">
          <Table style={{ width: 800 }} stickyHeader>
            <TableHead>
              {state.offers && columns.map((column) => (
                <TableCell> <Typography sx={{ fontWeight: "bold", fontSize: 24, fontFamily: 'Monospace' }}> {column} </Typography></TableCell>
              ))}
            </TableHead>
            <TableBody>
              {state.offers && state.offers.map((offer) => {
                return <TableRow>
                  <TableCell> {renderCell(offer, 'product')} </TableCell>
                  <TableCell> {renderEditableCell(offer, 'quantity')} </TableCell>
                  <TableCell> {renderEditableCell(offer, 'unit')} </TableCell>
                  <TableCell> {renderEditableCell(offer, 'price')} </TableCell>
                  <TableCell> {renderEditableCell(offer, 'sellerNumber')} </TableCell>
                  <TableCell>
                    {determineEditButton(offer)}
                  </TableCell>
                </TableRow>
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default App;