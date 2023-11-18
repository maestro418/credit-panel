import React from 'react';
import './App.css';

import MainRoute from './routes';
import ProviderData from './provider/context';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <ProviderData>
      <BrowserRouter>
        <MainRoute />
      </BrowserRouter>
    </ProviderData>
  );
}

export default App;
