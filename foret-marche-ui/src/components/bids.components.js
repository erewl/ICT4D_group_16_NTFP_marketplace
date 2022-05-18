import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import bidsService from '../services/bids-service';
import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../context/UserContext';

export default function Bids() {
  const [state, setState] = React.useState({ bids: [] })

  const [context, setContext] = React.useContext(UserContext);

  const { t, i18n } = useTranslation();

  const update = s => {
    let bids = s.map(bid => ({ ...bid, editing: false }))
    bids.sort((a, b) => b.bidId - a.bidId)
    setState({ ...state, bids: bids })
  }

  const toggleEditState = (bid) => {
    let bidsCopy = state.bids
    if (bid.editing) { // when editing is being toggled from true -> false: we are saving data
      bidsService.updateData(bid, context.token)
    }
    bidsCopy.find(b => b.bidId === bid.bidId).editing = !bidsCopy.find(b => b.bidId === bid.bidId).editing
    setState({ ...state, bids: bidsCopy })
  }

  const closeEditState = (bid) => {
    let bidsCopy = state.bids
    bidsCopy.find(b => b.bidId === bid.bidId).editing = !bidsCopy.find(b => b.bidId === bid.bidId).editing
    setState({ ...state, bids: bidsCopy })
  }

  // useEffect is being run before and after each render of the site, to limit the API call only to when no data is in the frontend, the if-clause is introduced
  React.useEffect(() => {
    let response = bidsService.fetchData(update);
  }, []);

  const approveBid = (bidId) => {
    bidsService.approveBid(bidId, context.token, () => {
      setState({
        ...state,
        bids: state.bids.filter(b => b.bidId !== bidId)
      })
    })
  }

  const determineEditButton = (bid) => {
    if (bid && !bid.editing) return <div>
      <Button sx={{ mr: 2 }} color="success" onClick={() => approveBid(bid.bidId)} variant="outlined" > {t('buttons.approve')} </Button >
      {context.token && context.token !== '' &&
        < Button sx={{ mr: 2 }} color="success" onClick={() => toggleEditState(bid)} variant="outlined">{t('buttons.edit')} </Button>
      }
    </div >
    else
      return <div>
        {context.token && context.token !== '' &&
          <>
            <Button sx={{ mr: 2, }} color="success" onClick={() => closeEditState(bid)} variant="outlined" > {t('buttons.cancel')} </Button >
            <Button sx={{ mr: 2, }} color="success" onClick={() => toggleEditState(bid)} variant="outlined">{t('buttons.edit')} </Button>
          </>
        }
      </div>

  }

  const commonStyle = { fontFamily: 'Monospace', fontSize: 18 }

  const renderCell = (bid, attribute) => {
    let content = bid[attribute]
    return <Typography sx={commonStyle}>
      {content}
    </Typography>
  }

  const productTranslation = (product, lng) => {
    if (product == "Shea Butter" && lng == "fr") {
      var product_name = "Beurre de Karité";
    } else if (product == "Honey" && lng == "fr") {
      var product_name = "Miel";
    } else if (product == "Honey" && lng == "nl") {
      var product_name = "Honing";
    } else {
      var product_name = product;
    }
    return <Typography sx={commonStyle}>
      {product_name}
    </Typography>
  }

  const renderEditableCell = (bid, attribute) => {
    let content = bid[attribute]
    if (!bid.editing)
      return <Typography sx={commonStyle}>
        {content}
      </Typography>
    else
      return <TextField sx={commonStyle} onChange={event => updatebid(event, bid, attribute)} defaultValue={content} />
  }

  const updatebid = (event, bid, attribute) => {
    let bidCopy = bid
    let bidsCopy = state.bids

    bidCopy[attribute] = event.target.value
    // find existing bid and replace with updated bid in the bids-array
    bidsCopy = bidsCopy.map(b => {
      if (b.bidId === bidCopy.bidId) return bidCopy
      else return b
    })
    setState({ ...state, bids: bidsCopy })
  };

  return (
    <div>
      <Box sx={{ py: 4 }} align="center">
        <Typography variant="h3" align="center" component="div" sx={{ fontFamily: 'Monospace', fontWeight: 'medium' }}> {t('bids.bids')}  </Typography>
      </Box>
      <div style={{ width: '100%' }}>
        <TableContainer align="center">
          <Table style={{ width: 1100 }} stickyHeader>
            <TableHead>
              <TableCell> <Typography sx={{ fontWeight: "bold", fontSize: 24, fontFamily: 'Monospace' }}> {t('bids.offer')}  </Typography></TableCell>
              <TableCell> <Typography sx={{ fontWeight: "bold", fontSize: 24, fontFamily: 'Monospace' }}> {t('bids.product')}  </Typography></TableCell>
              <TableCell> <Typography sx={{ fontWeight: "bold", fontSize: 24, fontFamily: 'Monospace' }}> {t('bids.seller')}  </Typography></TableCell>
              <TableCell> <Typography sx={{ fontWeight: "bold", fontSize: 24, fontFamily: 'Monospace' }}> {t('bids.buyer')}  </Typography></TableCell>
              <TableCell> <Typography sx={{ fontWeight: "bold", fontSize: 24, fontFamily: 'Monospace' }}> {t('bids.quantity')}  </Typography></TableCell>
            </TableHead>
            <TableBody>
              {state.bids && state.bids.map((bid) => {
                return <TableRow key={bid.offerId} >
                  <TableCell> {renderCell(bid, 'offerId')} </TableCell>
                  <TableCell> {productTranslation(bid['product'], i18n.resolvedLanguage)} </TableCell>
                  <TableCell> {renderEditableCell(bid, 'seller')} </TableCell>
                  <TableCell> {renderEditableCell(bid, 'buyer')} </TableCell>
                  <TableCell> {renderEditableCell(bid, 'quantity')} </TableCell>
                  <TableCell style={{ width: 300 }}>
                    {determineEditButton(bid)}
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
