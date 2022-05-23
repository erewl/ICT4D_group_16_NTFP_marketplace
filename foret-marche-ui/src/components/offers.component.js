import React, { useContext } from 'react';
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
import BidsService from '../services/bids-service';
import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { UserContext } from '../context/UserContext';
import Modal from '@mui/material/Modal';

export default function Offers(props) {
    const { t, i18n } = useTranslation();

    const [state, setState] = React.useState({ offers: [] })

    const [context, setContext] = useContext(UserContext);

    const [quantity, setQuantity] = React.useState();
    const [offer_quantity, setOfferQuantity] = React.useState();
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [modalOpen, setModalOpen] = React.useState(false);
    const [offer_id, setOfferId] = React.useState();

    const update = s => {
        let offers = s.map(offer => ({ ...offer, editing: false }))
        offers.sort((a, b) => b.id - a.id)
        setState({ ...state, offers: offers })
    }

    const toggleEditState = (offer) => {
        let offersCopy = state.offers
        if (offer.editing) { // when editing is being toggled from true -> false: we are saving data
            OffersService.updateData(offer, context.token)
        }
        offersCopy.find(o => o.id === offer.id).editing = !offersCopy.find(o => o.id === offer.id).editing
        setState({ ...state, offers: offersCopy })
    }

    const closeEditState = (offer) => {
        let offersCopy = state.offers
        offersCopy.find(o => o.id === offer.id).editing = !offersCopy.find(o => o.id === offer.id).editing
        setState({ ...state, offers: offersCopy })
    }

    const deleteOffer = (offer) => {
        OffersService.deleteData(offer.id, context.token, setState({
            ...state,
            offers: state.offers.filter(o => o.id !== offer.id) // filter out the offer that is being deleted
        }))
    }

    const submit = () => {
        if (quantity > offer_quantity){
            alert(i18n.t('alerts.bid_quantity_error'))
            setQuantity("");
            setOfferQuantity("")
        }
        else {
            let bid = new FormData()
            bid.append("offer_id",offer_id);
            bid.append("quantity", quantity);
            bid.append("session.callerid",phoneNumber);
            setOfferId("");
            setQuantity();
            setPhoneNumber("");
            setOfferQuantity()
            BidsService.setData(bid);
        }
      }

    // useEffect is being run before and after each render of the site, to limit the API call only to when no data is in the frontend, the if-clause is introduced
    React.useEffect(() => {
        OffersService.fetchData(update);
    }, []);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 275,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: '25px',
        fontFamily: 'Monospace', 
        fontSize: 20
    };

    const determineEditButton = (offer) => {
        if (offer && !offer.editing) return <>
            <Button sx={{ mr: 2 }} color="success" onClick={() => {setModalOpen(true); setOfferId(offer["id"]); setOfferQuantity(offer["quantity"])}} variant="outlined" > {t('buttons.buy')}  </Button >
            {context.token && context.token !== '' && <Button sx={{ mr: 2 }} color="success" onClick={() => toggleEditState(offer)} variant="outlined">{t('buttons.edit')}  </Button>}
        </>
        else
            return <div>
                {context.token && context.token !== '' &&
                    <>
                        <Button sx={{ mr: 2, mt:1}} color="success" onClick={() => closeEditState(offer)} variant="outlined" > {t('buttons.cancel')} </Button >
                        <Button sx={{ mr: 2, mt:1 }} color="success" onClick={() => deleteOffer(offer)} variant="outlined" > {t('buttons.delete')}</Button >
                        <Button sx={{ mr: 2, mt:1}} color="success" onClick={() => toggleEditState(offer)} variant="outlined">{t('buttons.save')}</Button>
                    </>
                }
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

    const productTranslation = (product, lng) => {
        if (product === "Shea Butter" && lng === "fr") {
            var product_name = "Beurre de Karité";
        } else if (product === "Honey" && lng === "fr") {
            var product_name = "Miel";
        } else if (product === "Honey" && lng === "nl") {
            var product_name = "Honing";
        } else if (product === "Sesame Oil" && lng === "nl") {
            var product_name = "Sesamolie";
        } else if (product === "Sesame Oil" && lng === "fr") {
            var product_name = "Huile de Sésame";
        } else if (product === "Nuts" && lng === "nl") {
            var product_name = "Noten";
        } else if (product === "Nuts" && lng === "fr") {
            var product_name = "Des Noisettes";
        }
        else {
            var product_name = product;
        }
        return <Typography sx={commonStyle}>
            {product_name}
        </Typography>
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
                <Typography variant="h3" component="div" sx={{ fontFamily: 'Monospace', fontWeight: 'medium' }}> {t('offers.products_for_sale')} </Typography>
            </Box>
            <div style={{ width: '100%' }}>
                <TableContainer align="center">
                    <Table style={{ width: context.token && context.token !== '' ? 1350: 1200 }} stickyHeader>
                        <TableHead>
                        <TableRow>
                            {context.token && context.token !== '' &&      
                            <TableCell> <Typography sx={{ fontWeight: "bold", fontSize: 24, fontFamily: 'Monospace' }}> {t('offers.offer_number')} </Typography></TableCell> 
                            }
                            <TableCell> <Typography sx={{ fontWeight: "bold", fontSize: 24, fontFamily: 'Monospace' }}> {t('offers.product')}  </Typography></TableCell>
                            <TableCell> <Typography sx={{ fontWeight: "bold", fontSize: 24, fontFamily: 'Monospace' }}> {t('offers.quantity')}  </Typography></TableCell>
                            <TableCell> <Typography sx={{ fontWeight: "bold", fontSize: 24, fontFamily: 'Monospace' }}> {t('offers.unit')}  </Typography></TableCell>
                            <TableCell> <Typography sx={{ fontWeight: "bold", fontSize: 24, fontFamily: 'Monospace' }}> {t('offers.price')} <Box component="span" sx={{ fontSize: 14 }}>(CFA)</Box>  </Typography></TableCell>
                            <TableCell> <Typography sx={{ fontWeight: "bold", fontSize: 24, fontFamily: 'Monospace' }}> {t('offers.phone_number')}  </Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.offers && state.offers.map((offer) => {
                                return <TableRow >
                                    {context.token && context.token !== '' &&   
                                    <TableCell> {renderCell(offer, 'id')} </TableCell>
                                     }
                                    <TableCell> {productTranslation(offer['product'], i18n.resolvedLanguage)} </TableCell>
                                    <TableCell> {renderEditableCell(offer, 'quantity')} </TableCell>
                                    <TableCell> {renderEditableCell(offer, 'unit')} </TableCell>
                                    <TableCell> {renderEditableCell(offer, 'price')} </TableCell>
                                    <TableCell> {renderCell(offer, 'sellerNumber')} </TableCell>
                                    <TableCell style={{ width: context.token && context.token !== '' ? 300: 125 }}>
                                        {determineEditButton(offer)}
                                    </TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                {modalOpen &&
                <Modal
                open={true}
                onClose={() => {setModalOpen(false); setOfferId(undefined); setQuantity(undefined); setPhoneNumber(undefined);}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Box>
                    <TextField label="Quantity" variant="outlined" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    <TextField sx={{mt:2}} label="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                    </Box>
                    <Button sx={{mt: 2, fontSize: 16}} color="success" variant="outlined" onClick={() => {submit(); setModalOpen(false);}} >Submit</Button>
                </Box>
                </Modal> } 
            </div>
        </div>

    );
}