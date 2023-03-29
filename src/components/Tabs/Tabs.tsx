import { Link } from 'react-router-dom';

function Tabs() {
  return (
    <nav className="tabs">
      <ul className="nav nav-tabs tabs__ul">
        <li className="nav-item tabs__item">
          <Link to={`/`} className="nav-link active tabs__link">Home</Link>
        </li>
        <li className="tabs__item">
          <Link to={`/add-new-task`} className="nav-link tabs__link">Add New Task</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Tabs;