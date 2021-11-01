import React, { useState, useEffect } from 'react';
import './App.css';

import Form from './components/Form';
import Authenticated from './pages/Authenticated';
import List from './pages/List';

function App() {


  return (
    <div className="App">
    <header>
      <h1>Nome </h1>
    </header>
    <Authenticated />
    </div>
  );
}

export default App;
