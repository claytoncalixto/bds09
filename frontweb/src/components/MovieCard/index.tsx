import MoviePrice from 'components/MoviePrice';
import { Movie } from 'types/movie';

import './styles.css';

type Props = {movie : Movie;}

const MovieCard = ({ movie } : Props) => {
  return (
    <div className="base-card movie-card">
      <div className="card-top-container">
          
          <h6>Acessar /movies/1 </h6> {movie.id}
          <h6>Acessar /movies/2 </h6> {movie.id}
      </div>
      <div className="card-bottom-container">
          <h6>{ movie.name}</h6>
          <MoviePrice price={movie.price} />
      </div>
    </div>
  );
}

export default MovieCard;
