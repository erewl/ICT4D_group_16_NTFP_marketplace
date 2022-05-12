import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
        en: {
            translation: {
                navbar: {
                    sell: 'sell',
                    offers: 'offers',
                    bids: 'bids',
                    login: 'login',
                    language: 'language'
                  },
                  offers: {
                    products_for_sale: 'Products for Sale',
                    product: 'Product',
                    quantity: 'Quantity',
                    unit: 'Unit',
                    price: 'Price',
                    phone_number: 'Phone Number',
                    buy: 'buy',
                    edit: 'edit'
                  },
                  bids: {
                      bids:'Bids',
                      offer: 'Offer',
                      product: 'Product',
                      quantity: 'Quantity',
                      seller: 'Seller',
                      buyer: 'Buyer',
                      approve: 'approve',
                      edit: 'edit'
                  }
                }
        },
        nl: {
            translation: {
                navbar: {
                    sell: 'verkopen',
                    offers: 'kopen',
                    bids: 'biedingen',
                    login: 'log in',
                    language: 'taal'
                  },
                  offers: {
                    products_for_sale: 'Producten te Koop',
                    product: 'Product',
                    quantity: 'Hoeveelheid',
                    unit: 'Eenheid',
                    price: 'Prijs',
                    phone_number: 'Telefoonnummer',
                    buy: 'koop',
                    edit: 'bewerk'
                  },
                  bids: {
                      bids:'Bids',
                      offer: 'Offer',
                      product: 'Product',
                      quantity: 'Quantity',
                      seller: 'Seller',
                      buyer: 'Buyer',
                      approve: 'approve',
                      edit: 'edit'
                  }
                }
        },
        fr: {
            translation: {
                navbar: {
                    sell: 'vendre',
                    offers: 'acheter',
                    bids: 'enchères',
                    login: 'login',
                    language: 'langue'
                  },
                  offers: {
                    products_for_sale: 'Produits à Vendre',
                    product: 'Produit',
                    quantity: 'Quantité',
                    unit: 'Unité',
                    price: 'Prix',
                    phone_number: 'Numéro de Téléphone',
                    buy: 'Acheter',
                    edit: 'Éditer'
                  },
                  bids: {
                      bids:'Bids',
                      offer: 'Offer',
                      product: 'Product',
                      quantity: 'Quantity',
                      seller: 'Seller',
                      buyer: 'Buyer',
                      approve: 'approve',
                      edit: 'edit'
                  }
                }
        } 
    }
});

export default i18n;