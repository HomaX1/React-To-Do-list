import { useRouteError } from 'react-router-dom';
import ErrorObject from './error-interface';
import { Link } from 'react-router-dom';
function ErrorPage() {
  const error = useRouteError() as ErrorObject;
  console.error(error, 'error');

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{ error.statusText || error.message }</i>
      </p>
      <Link to={`/`}>Return to Homepage</Link>
    </div>
  );
}

export default ErrorPage;