import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
        en: {
            translation: {
                navbar: {
                    sell: 'Sell',
                    offers: 'Offers',
                    bids: 'Bids',
                    login: 'Login',
                    logout: 'Logout',
                    language: 'Language'
                  },
                  offers: {
                    products_for_sale: 'Products for Sale',
                    sell_a_product: 'Sell a Product',
                    product: 'Product',
                    quantity: 'Quantity',
                    unit: 'Unit',
                    price: 'Price',
                    phone_number: 'Phone Number',
                    offer_number: 'Offer #',
                  },
                  bids: {
                      bids:'Bids',
                      offer: 'Offer',
                      product: 'Product',
                      quantity: 'Quantity',
                      seller: 'Seller',
                      buyer: 'Buyer',
                      edit: 'edit'
                  },
                  buttons: {
                    buy: 'Buy',
                    edit: 'Edit',
                    approve: 'Approve',
                    yes: 'Yes',
                    no: 'No',
                    submit: 'Submit',
                    delete: 'Delete',
                    cancel: 'Cancel',
                    save: 'Save',
                  },
                  sales: {
                    sold: "Sales"
                  },
                  alerts:{
                    approve_quantity_error: "Bid quantity invalid, please check if there is enough availability",
                    bid_quantity_error: "Please enter a valid quantity" 
                  }
            }
        },
        nl: {
            translation: {
                navbar: {
                    sell: 'Verkopen',
                    offers: 'Kopen',
                    bids: 'Biedingen',
                    login: 'Log in',
                    logout: 'Log out',
                    language: 'Taal'
                  },
                  offers: {
                    products_for_sale: 'Producten te Koop',
                    sell_a_product: 'Verkoop een Product',
                    product: 'Product',
                    quantity: 'Hoeveelheid',
                    unit: 'Eenheid',
                    price: 'Prijs',
                    phone_number: 'Telefoonnummer',
                    offer_number: 'Bod #',
                  },
                  bids: {
                      bids:'Biedingen',
                      offer: 'Bod',
                      product: 'Product',
                      quantity: 'Kwantiteit',
                      seller: 'Verkoper',
                      buyer: 'Koper'
                  },
                  buttons: {
                    buy: 'Koop',
                    edit: 'Bewerk',
                    approve: 'Goedkeuren',
                    yes: 'Ja',
                    no: 'Nee',
                    submit: 'Verzenden',
                    delete: 'Verwijderen',
                    cancel: 'Annuleren',
                    save: 'Opslaan'
                  },
                  sales: {
                    sold: "Verkocht"
                  },
                  alerts:{
                    approve_quantity_error: "Hoeveelheid ongeldig, controleer of er voldoende beschikbaarheid is",
                    bid_quantity_error: "Voer een geldig aantal in"
                  }
            }
        },
        fr: {
            translation: {
                navbar: {
                    sell: 'Vendre',
                    offers: 'Acheter',
                    bids: 'Ench??res',
                    login: 'Login',
                    logout: 'Logout',
                    language: 'Langue'
                  },
                  offers: {
                    products_for_sale: 'Produits ?? Vendre',
                    sell_a_product: 'Vendre un Produit',
                    product: 'Produit',
                    quantity: 'Quantit??',
                    unit: 'Unit??',
                    price: 'Prix',
                    phone_number: 'Num??ro de T??l??phone',
                    offer_number: 'Offre #',
                  },
                  bids: {
                      bids:'Ench??res',
                      offer: 'Offre',
                      product: 'Produit',
                      quantity: 'Quantit??',
                      seller: 'Marchand',
                      buyer: 'Acheteur',
                  },
                  buttons:{
                    buy: 'Acheter',
                    edit: '??diter',
                    approve: 'Approuver',
                    yes: 'Oui',
                    no: 'Non',
                    submit: 'Envoyer',
                    delete: 'Effacer',
                    cancel: 'Annuler',
                    save: 'Sauvegarder'
                  },
                  sales: {
                    sold: "Vendu"
                  },
                  alerts:{
                    approve_quantity_error: "Quantit?? invalide, veuillez v??rifier si la disponibilit?? est suffisante",
                    bid_quantity_error: "Veuillez entrer une quantit?? valide" 
                  }
                  

            }
        } 
    }
});

export default i18n;