import React, { useState, useEffect } from 'react';
import './App.css';

import Form from './components/Form';
import List from './pages/List';

function App() {


  return (
    <div className="App">
    <header>
      <h1>Nome </h1>
    </header>
    <List />
    </div>
  );
}

export default App;
