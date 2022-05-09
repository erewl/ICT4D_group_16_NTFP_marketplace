import React from 'react';
import './App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { BrowserRouter as Router,  Switch,  Route,  Link} from "react-router-dom";
import OffersService from './services/offers-service';
import { TextField } from '@mui/material';
import Navbar from "./components/navbar.component"
import Offers from "./components/offers.component"

function App() {

  return (
    <div className="App">

      <Navbar />
      <Offers />

    </div>
  );
}

export default App;