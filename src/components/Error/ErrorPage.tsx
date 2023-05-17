import { useRouteError } from 'react-router-dom';
import IError from './Error.model';
import { Link } from 'react-router-dom';
import './ErrorPage.scss';

function ErrorPage() {
  const error = useRouteError() as IError;
  console.error(error, 'error');

  return (
    <div className="error-page">
      <div className="error-page__wrap">
        <h1 className="h1 title error-page__title">Oops!</h1>
        <p className="error-page__text">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="error-page__text">
          <i>Page {error.statusText || error.message}</i>
        </p>
        <button className="btn btn-primary mb-5 error-page__button">
          <Link to={`/`} className="error-page__link">
            Return to Homepage
          </Link>
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
