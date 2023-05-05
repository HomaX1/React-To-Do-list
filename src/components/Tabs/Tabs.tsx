import React from 'react';
import { NavLink } from 'react-router-dom';

function Tabs() {
  return (
    <nav className="tabs">
      <ul className="nav nav-tabs tabs__ul">
        <li className="nav-item tabs__item">
          <NavLink to={`/`} className="nav-link tabs__link">
            Home
          </NavLink>
        </li>
        <li className="nav-item tabs__item">
          <NavLink to={`/add-new-task`} className="nav-link tabs__link">
            Add New Task
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Tabs;