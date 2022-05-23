import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SalesService from '../services/sales-service';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../context/UserContext';

export default function Sales() {
  const [state, setState] = React.useState({ sales: [] })

  const [context, setContext] = React.useContext(UserContext);

  const { t, i18n } = useTranslation();

  const update = s => {
    let bids = s.map(bid => ({ ...bid, editing: false }))
    bids.sort((a, b) => b.bidId - a.bidId)
    setState({ ...state, bids: bids })
  }

  // useEffect is being run before and after each render of the site, to limit the API call only to when no data is in the frontend, the if-clause is introduced
  React.useEffect(() => {
    let response = SalesService.fetchData(update);
  }, []);

  const commonStyle = { fontFamily: 'Monospace', fontSize: 18 }

  const renderCell = (sale, attribute) => {
    let content = sale[attribute]
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

  return (
    <div>
      <Box sx={{ py: 4 }} align="center">
        <Typography variant="h3" align="center" component="div" sx={{ fontFamily: 'Monospace', fontWeight: 'medium' }}> {t('sales.sold')}  </Typography>
      </Box>
      <div style={{ width: '100%' }}>
        <TableContainer align="center">
          <Table style={{ width: 1100 }} stickyHeader>
            <TableHead>
              <TableCell> <Typography sx={{ fontWeight: "bold", fontSize: 24, fontFamily: 'Monospace' }}> {t('bids.product')}  </Typography></TableCell>
              <TableCell> <Typography sx={{ fontWeight: "bold", fontSize: 24, fontFamily: 'Monospace' }}> {t('bids.seller')}  </Typography></TableCell>
              <TableCell> <Typography sx={{ fontWeight: "bold", fontSize: 24, fontFamily: 'Monospace' }}> {t('bids.buyer')}  </Typography></TableCell>
              <TableCell> <Typography sx={{ fontWeight: "bold", fontSize: 24, fontFamily: 'Monospace' }}> {t('offers.unit')}  </Typography></TableCell>
              <TableCell> <Typography sx={{ fontWeight: "bold", fontSize: 24, fontFamily: 'Monospace' }}> {t('offers.price')}  </Typography></TableCell>
              <TableCell> <Typography sx={{ fontWeight: "bold", fontSize: 24, fontFamily: 'Monospace' }}> {t('offers.quantity')}  </Typography></TableCell>
            </TableHead>
            <TableBody>
              {state.bids && state.bids.map((bid) => {
                return <TableRow key={bid.offerId} >
                  <TableCell> {productTranslation(bid['product'], i18n.resolvedLanguage)} </TableCell>
                  <TableCell> {renderCell(bid, 'seller')} </TableCell>
                  <TableCell> {renderCell(bid, 'buyer')} </TableCell>
                  <TableCell> {renderCell(bid, 'unit')} </TableCell>
                  <TableCell> {renderCell(bid, 'price')} </TableCell>
                  <TableCell> {renderCell(bid, 'quantity')} </TableCell>
                </TableRow>
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
