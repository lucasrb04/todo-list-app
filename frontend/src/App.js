import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router';
import './App.css';

import Authenticated from './pages/Authenticated';
import List from './pages/List';

function App() {


  return (
    <div className="App">
    <header>
      <h1>Todo list app</h1>
    </header>
    <Switch>
      <Route path="/list" component={ List } />
      <Route path="/create" component={ Authenticated } />
      <Route path="/" component={ Authenticated } />
    </Switch>
    </div>
  );
}

export default App;
