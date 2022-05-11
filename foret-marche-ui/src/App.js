import React from 'react';
import './App.css';
import Navbar from "./components/navbar.component"
import Offers from "./components/offers.component"
import Bids from "./components/bids.components"

function App() {

  const [state, setState] = React.useState({ selected: 'offers' })

  return (
    <div className="App">

      <Navbar changeTab={(tab) => setState({...state, selected: tab}) }/>
      {state.selected && state.selected === 'offers' &&
        <Offers />
      }
      {state.selected && state.selected === 'bids' &&
        <Bids />
      }
    </div>
  );
}

export default App;