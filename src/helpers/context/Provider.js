import React, { useState } from 'react';
import Consumer from './Consumer';

function Provider({ children }) {
  const [userInfo, setUserInfo] = useState({ user: '', password: '' });
  const [stateB, setStateB] = useState('initialStateB');
  
  const contextValue = {
    userInfo,
    setUserInfo,
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