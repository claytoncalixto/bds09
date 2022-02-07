
import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from 'types/movie';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import { AuthContextData } from 'AuthContext';


import './styles.css';
import { removeAuthData } from 'util/storage';
import history from 'util/history';

const Movies = () => {
  const [ page, setPage] = useState<SpringPage<Movie>>();
  const [isLoading, setIsLoading] = useState(false);
  const [authContextData, setAuthContextData] = useState<AuthContextData>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies',
    };

    setIsLoading(true);
    requestBackend(params)
      .then((response) => {
        setPage(response.data);
        setAuthContextData(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace('/');
  };

  return (
    <div className="container my-4 movie-container">
      <div className="row movie-title-container">
        <h1>Tela listagem de filmes</h1>
      </div >
      { authContextData?.authenticated ? (
      <>
        <Link to="/movies/1">Acessar /movies/1</Link> <br/>

        <Link to="/movies/2">Acessar /movies/2</Link>
      </>
      ):(
        <Link to="/admin/auth/login" onClick={handleLogoutClick}>Sair</Link>
      )}
    </div>
  )
};

export default Movies;
