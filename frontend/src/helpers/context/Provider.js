import React, { useState } from 'react';
import Consumer from './Consumer';

function Provider({ children }) {
  const [stateA, setStateA] = useState('initialStateA');
  const [stateB, setStateB] = useState('initialStateB');
  const contextValue = {
    stateA,
    setStateA,
    stateB,
    setStateB,
  };

  return (
    <Consumer.Provider value={contextValue}>
      {children}
    </Consumer.Provider>
  );
}

export default Provider;