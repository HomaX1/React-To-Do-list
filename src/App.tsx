import React from 'react';
import { Tabs } from './components';
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
