import './HomePage.scss';
import Search from '../Search/Search';
import { Link } from 'react-router-dom';
import List from '../List/List';

function HomePage() {
  return(
    <div className="home">
      <h1 className="h1 home__title title">To-Do List</h1>
      <div className="home__wrap">
        <Search />
        <button className="btn btn-primary mb-5 home__button">
          <Link to={`/add-new-task`} className="home__link">Add New Task</Link>
        </button>
        <List/>
      </div>
    </div>
  );
}

export default HomePage;