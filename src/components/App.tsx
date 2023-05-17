import React from 'react';
import Tabs from './Tabs/Tabs';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Tabs />
      <Outlet />
    </div>
  );
}

export default App;
