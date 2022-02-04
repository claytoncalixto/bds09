import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import axios from 'axios';
import MoviePrice from 'components/MoviePrice';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Movie } from 'types/movie';
import { BASE_URL } from 'util/requests';
import MovieDetailsLoader from './MovieDetailsLoader';
import MovieInfoLoader from './MovieInfoLoader';

import './styles.css';

type UrlParams = {
  moviesId: string;
};

const MovieDetails = () => {
  const { moviesId } = useParams<UrlParams>();

  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/movies/${moviesId}`)
      .then((response) => {
        setMovie(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [moviesId]);

  return (
    <div className="product-details-container">
      <div className="base-card product-details-card">
        <Link to="/movies">
          <div className="goback-container">
            <ArrowIcon />
            <h2>VOLTAR</h2>
          </div>
        </Link>
        <div className="row">
          <div className="col-xl-6">
            {isLoading ? (
              <MovieInfoLoader />
            ) : (
              <>
                <div className="img-conatiner">
                  <img src={movie?.imgUrl} alt={movie?.name} />
                </div>
                <div className="name-price-container">
                  <h1>{movie?.name}</h1>
                  {movie && <MoviePrice price={movie?.price} />}
                </div>
              </>
            )}
          </div>
          <div className="col-xl-6">
            {isLoading ? (
              <MovieDetailsLoader />
            ) : (
              <div className="description-container">
                <h2>Descrição do filme</h2>
                <p>{movie?.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
