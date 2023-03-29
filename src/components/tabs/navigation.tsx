import { Link } from 'react-router-dom';

function Tabs() {
  return (
    <nav>
      <ul>
        <li>
          <Link to={`/`}>Home</Link>
        </li>
        <li>
          <Link to={`/add-new-task`}>Add New Task</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Tabs;