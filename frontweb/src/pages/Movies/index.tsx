import { AxiosRequestConfig } from 'axios';
import MovieCard from 'components/MovieCard';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from 'types/movie';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import MovieLoader from './MovieLoader';

import './styles.css';

const Movies = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies',
    };

    setIsLoading(true);
    requestBackend(params)
      .then((response) => {
        setPage(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container my-4 movie-container">
      <div className="row movie-title-container">
        <h1>Tela listagem de filmes</h1>
      </div >
      <>
        <Link to="/movies/1">Acessar /movies/1</Link> <br/>

        <Link to="/movies/2">Acessar /movies/2</Link>
      </>
    </div>
  );
};

export default Movies;
