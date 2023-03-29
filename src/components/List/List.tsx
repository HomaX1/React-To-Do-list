import React, { FC } from 'react';
import './List.scss';

interface ListProps {}

const List: FC<ListProps> = () => (
  <div data-testid="List">
    <ul className="list-group list">
      <li className="list-group-item list__item">
        <label className="list__label">
          <input className="list__input" type="checkbox" checked/>
          <span className="ms-3 list__text">Task 1</span>
        </label>
      </li>
      <li className="list-group-item list__item">
        <label className="list__label">
          <input className="list__input" type="checkbox"/>
          <span className="ms-3 list__text">Task 2</span>
        </label>
      </li>
      <li className="list-group-item list__item">
        <label className="list__label">
          <input className="list__input" type="checkbox"/>
          <span className="ms-3 list__text">Task 3</span>
        </label>
      </li>
    </ul>
  </div>
);

export default List;
