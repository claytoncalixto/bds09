import { AuthContext } from 'AuthContext';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTokenData, isAuthenticated } from 'util/auth';
import history from 'util/history';

import './styles.css';

const Movies = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);
  return (
    <div className="container my-4 movie-container">
      <div className="row movie-title-container">
        <h1>Tela listagem de filmes</h1>
      </div>
      <div>
        {authContextData.authenticated ? (
         
          history.replace('/movies')
        ) : (
          <>
            <Link to="/movies/1">Acessar /movies/1.</Link> <br />
            <Link to="/movies/2">Acessar /movies/2</Link>
          </>
        )}.
      </div>
    </div>
  );
};

export default Movies;
