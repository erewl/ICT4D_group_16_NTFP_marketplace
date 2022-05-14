import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import OffersService from '../services/offers-service';
import InputAdornment from '@mui/material/InputAdornment';
import {useTranslation} from 'react-i18next';

export default function Sell() {

  const { t, i18n } = useTranslation(); 
  const [product, setProduct] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [unit, setUnit] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const products = [
    {
      value: 'Shea Butter',
      label: ['Shea Butter','Shea Butter','Beurre de Karité']
    },
    {
      value: 'Honey',
      label: ['Honey','Honing', 'Miel']
    },
    {
      value: 'Sesame Oil',
      label: ['Sesame Oil', 'Sesamolie','Huile de Sésame']
    },
    {
        value: 'Nuts',
        label: ['Nuts', 'Noten', 'Des Noisettes']
    }
];

const determineLanguage = () => {
    if (i18n.resolvedLanguage === "nl") {
        return 1
    } 
    else if (i18n.resolvedLanguage === "fr") {
        return 2
    }
    else {
        return 0
    }
}

  const submit = e => {
    e.preventDefault()
    let offer = new FormData()
    offer.append("product",product);
    offer.append("quantity",quantity);
    offer.append("price",price);
    offer.append("session.callerid",phoneNumber);
    offer.append("units",unit);
    OffersService.setData(offer);
    setProduct("");
    setQuantity("");
    setUnit("");
    setPrice("");
    setPhoneNumber("");
  }

  return (
    <div>
        <Box sx={{ py:2}}>
            <Typography variant="h3" component="div" sx={{ fontFamily: 'Monospace', fontWeight: 'medium' }}> {t('offers.sell_a_product')} </Typography>
        </Box>
        <Box sx={{mt:3}} align="center">
            <form onSubmit={submit}>
                <div> 
                    <Typography sx={{fontSize: 12, my: 1, fontFamily: 'Monospace'}}> {t('offers.product')} </Typography>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label={t('offers.product')}
                        required
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                        sx={{width:300}}
                    >
                        {products.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label[determineLanguage()]}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div> 
                    <Typography sx={{fontSize: 12, my: 1, fontFamily: 'Monospace'}}> {t('offers.quantity')}  </Typography>
                    <TextField
                      required
                      id="outlined-required"
                      label={t('offers.quantity')}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      sx={{width:300}}
                    />
                </div>
                <div> 
                    <Typography sx={{fontSize: 12, my: 1, fontFamily: 'Monospace'}}> {t('offers.unit')} </Typography>
                    <TextField
                      required
                      id="outlined-required"
                      label={t('offers.unit')} 
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      sx={{width:300}}
                    />
                </div>
                <div> 
                    <Typography sx={{fontSize: 12, my: 1, fontFamily: 'Monospace'}}> {t('offers.price')} </Typography>
                    <TextField
                      required
                      id="outlined-required"
                      label={t('offers.price')}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      sx={{width:300}}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">CFA</InputAdornment>
                      }}
                    />
                </div>
                <div> 
                    <Typography sx={{fontSize: 12, my: 1, fontFamily: 'Monospace'}}> {t('offers.phone_number')} </Typography>
                    <TextField
                      required
                      id="outlined-required"
                      label={t('offers.phone_number')}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      sx={{width:300}}
                    />
                </div>
                <Button sx={{ mt: 3 }} color="success" variant="outlined" type="submit" > {t('buttons.submit')}  </Button >
            </form>
        </Box>
    </div>
  );
}
