import React from 'react';
import { NavLink } from 'react-router-dom';

function Tabs() {
  const navigationLink = [
    {
      id: 1,
      name: 'Home',
      link: '/',
    },
    {
      id: 2,
      name: 'Add New Task',
      link: '/add-new-task',
    },
  ];

  return (
    <nav className="tabs">
      <ul className="nav nav-tabs tabs__ul">
        {navigationLink.map((navItem) => {
          return (
            <li className="nav-item tabs__item" key={navItem.id}>
              <NavLink to={navItem.link} className="nav-link tabs__link">
                {navItem.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Tabs;
