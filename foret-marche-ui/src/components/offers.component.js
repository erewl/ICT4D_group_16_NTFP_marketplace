import React, { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import OffersService from '../services/offers-service';
import { TextField } from '@mui/material';

export default function Offers () {
    const [state, setState] = React.useState({ offers: [] })

    const columns = ['Product', 'Quantity', 'Unit', 'Price', 'Phone Number']

    const update = s => {
      let offers = s.map(offer => ({ ...offer, editing: false }))
      offers.sort((a, b) => b.id - a.id)
      setState({ ...state, offers: offers })
    }

    const toggleEditState = (offer) => {
      let offersCopy = state.offers
      if (offer.editing) { // when editing is being toggled from true -> false: we are saving data
        OffersService.updateData(offer)
      }
      offersCopy.find(o => o.id === offer.id).editing = !offersCopy.find(o => o.id === offer.id).editing
      setState({ ...state, offers: offersCopy })
    }

    // useEffect is being run before and after each render of the site, to limit the API call only to when no data is in the frontend, the if-clause is introduced
    React.useEffect(() => {
      let response = OffersService.fetchData(update);
    }, []);

    const determineEditButton = (offer) => {
      if (offer && !offer.editing) return <div>
        <Button sx={{ mr: 2 }} color="success" onClick={() => console.log("TODO BUY")} variant="outlined" > Buy</Button >
        <Button sx={{ mr: 2 }} color="success" onClick={() => toggleEditState(offer)} variant="outlined">Edit</Button>
      </div>
      else
        return <div>
          <Button sx={{ mr: 2, }} color="success" onClick={() => console.log("TODO BUY")} variant="outlined" > Delete</Button >
          <Button sx={{ mr: 2, }} color="success" onClick={() => toggleEditState(offer)} variant="outlined">Save</Button>
        </div>

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
      let offerCopy = offer
      let offersCopy = state.offers

      offerCopy[attribute] = event.target.value
      // find existing offer and replace with updated offer in the offers-array
      offersCopy = offersCopy.map(o => {
        if (o.id === offerCopy.id) return offerCopy
        else return o
      })
      setState({ ...state, offers: offersCopy })
    };
 
    return (
    <div>
        <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="div" sx={{ fontFamily: 'Monospace', fontWeight: 'medium' }}> Products for Sale </Typography>
      </Box>
      <div style={{ width: '100%' }}>
        <TableContainer align="center">
          <Table style={{ width: 1000 }} stickyHeader>
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
                  <TableCell> {renderCell(offer, 'sellerNumber')} </TableCell>
                  <TableCell style={{width: 200}}>
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
