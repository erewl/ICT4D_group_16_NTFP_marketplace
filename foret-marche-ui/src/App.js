import React from 'react';
import './App.css';

import OffersService from './services/offers-service';

function App() {

  const [state, setState] = React.useState({ offers: [] })

  const update = s => {
    setState({ ...state, offers: s })
  }

  // useEffect is being run before and after each render of the site, to limit the API call only to when no data is in the frontend, the if-clause is introduced
  React.useEffect(() => {
    let response = OffersService.fetchData(update);
  }, []);

  return (
    <div className="App">
      <h1>Forêt Marché</h1>

      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quanity</th>
            <th>Unit</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {state.offers && state.offers.map((offer) => {
            return <tr>
              <td>{offer.product}</td>
              {/* TODO add quantity unit in table */}
              <td>{offer.quantity}</td>
              <td>{offer.unit}</td>
              <td>{offer.price}</td>
              <td>
                <button onClick={() => console.log("TODO Edit")}>Edit</button>
                <button onClick={() => console.log("TODO Remove")}>Remove</button>
              </td>
            </tr>
          })}
        </tbody>
      </table>

    </div>
  );
}

export default App;
