import { ReactComponent as Start } from 'assets/images/star.svg';
import axios from 'axios';
import ButtonIcon from 'components/ButtonIcon';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Movie } from 'types/movie';
import { BASE_URL } from 'util/requests';
import MovieDetailsLoader from './MovieDetailsLoader';
import MovieInfoLoader from './MovieInfoLoader';
import { AuthContextData } from 'AuthContext';

import './styles.css';

type UrlParams = {
  moviesId: string;
};

const MovieDetails = () => {
  const { moviesId } = useParams<UrlParams>();

  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState<Movie>();
  const [authContextData, setAuthContextData] = useState<AuthContextData>();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/movies/${moviesId}`)
      .then((response) => {
        setMovie(response.data);
        setAuthContextData(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [moviesId]);

  return (
    <div className="movie-details-container">
      <div className="base-card movie-details-card">
        <h2>Tela detalhes do filme id: {moviesId}</h2>
        <div className="colunm">
          <div className="MovieInfoLoader">
            {isLoading ? (
              <MovieInfoLoader />
            ) : (
              <>
                <div className="text-insert-conatiner">
                  <form>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Deixe sua avaliação aqui"
                    />
                    <div className="btn-save-submit">
                      <ButtonIcon text="SALVAR AVALIAÇÃO" />
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
          <div className="MovieDetailsLoader">
            {isLoading ? (
              <MovieDetailsLoader />
            ) : (
              <div className="name-container">
                <div className="row star-movie-name">
                  <span>
                    <Start /> Nome: {authContextData?.tokenData?.user_name}
                  </span>
                </div>
                <div className="description-container">
                  <p>{movie?.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
