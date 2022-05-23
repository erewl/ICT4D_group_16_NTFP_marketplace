import React from 'react';
import './App.css';
import Navbar from "./components/navbar.component"
import Offers from "./components/offers.component"
import Bids from "./components/bids.components"
import Sell from "./components/sell.components"
import Sales from "./components/sales.component"
import { UserContextProvider } from './context/UserContext';

function App() {

  const [state, setState] = React.useState({ selected: 'offers' })

  return (
    <UserContextProvider>
      <div className="App">
        <Navbar changeTab={(tab) => setState({ ...state, selected: tab })} />
        {state.selected && state.selected === 'offers' &&
          <Offers />
        }
        {state.selected && state.selected === 'bids' &&
          <Bids />
        }
        {state.selected && state.selected === 'sell' &&
          <Sell />
        }
        {state.selected && state.selected === 'sales' &&
          <Sales />
        }
      </div>
    </UserContextProvider>
  );
}

export default App;