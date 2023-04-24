import React from 'react';
import { NavLink } from 'react-router-dom';

function addNewClassName(params:any) {
  return params.isActive ? 'active' : '';
}

function Tabs() {
  return (
    <nav className="tabs">
      <ul className="nav nav-tabs tabs__ul">
        <li className="nav-item tabs__item">
          <NavLink to={`/`} className={`nav-link tabs__link ${addNewClassName}`}>
            Home
          </NavLink>
        </li>
        <li className="nav-item tabs__item">
          <NavLink to={`/add-new-task`} className={`nav-link tabs__link ${addNewClassName}`}>
            Add New Task
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Tabs;