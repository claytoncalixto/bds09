import { ReactComponent as Start } from 'assets/images/star.svg';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Movie } from 'types/movie';
import { BASE_URL } from 'util/requests';
import { hasAnyRoles } from 'util/auth';
import MovieCard from 'components/MovieCard';
import Users from 'pages/Admin/User';

import './styles.css';


type UrlParams = {
  moviesId: string;
};

const MovieDetails = () => {

  const { moviesId } = useParams<UrlParams>();

  const [movie, setMovie] = useState<Movie>();


  useEffect(() => {    
    axios
      .get(`${BASE_URL}/movies/${moviesId}`)
      .then((response) => {
        setMovie(response.data);
        
      })
      .finally(() => {
      });
  }, [moviesId]);

  return (
    <div className="movie-details-container">
      <div className="base-card movie-details-card">
        <h2>Tela detalhes do filme id: {moviesId}</h2>
        <div className="colunm">
          { hasAnyRoles.name === 'ROLE_MEMBER' ? (
            <>        
             
              <MovieCard />
             
              <div className="movie-details-loader">               
                <div className="name-container">
                  <div className="row star-movie-name">
                    <span>
                      <Start /> Nome: {Users.name}
                    </span>
                  </div>
                  <div className="description-container">
                    <p>{movie?.description}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="movie-details-loader">               
            <div className="name-container">
              <div className="row star-movie-name">
                <span>
                  <Start /> Nome: {Users.name}
                </span>
              </div>
              <div className="description-container">
                <p>{movie?.description}</p>
              </div>
            </div>
          </div>         
          )}        
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
