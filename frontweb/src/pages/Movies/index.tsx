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
      </div>

      <div className="container link">
        {isLoading ? (
          <MovieLoader />
        ) : (
          page?.content.map((movie) => (
            <div className="col-sm-6 col-lg-4 col-xl-3 link-movies" key={movie.id}>
              <>
              <Link to="/movies/1">
                <h6>Acessar /movies/1 </h6>
                <MovieCard movie={movie} />
              </Link>
              <Link to="/movies/2">
                <h6>Acessar /movies/2</h6>
                <MovieCard movie={movie} />
              </Link>
              </>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Movies;
