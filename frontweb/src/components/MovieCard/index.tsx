import './styles.css';

type Props = {
  name?: string;
  description?: string;
};

const MovieCard = ({ name, description }: Props) => {
  return (
    <div className="info-container">
      <h6>{name}</h6>
      <h6>{description} </h6>
    </div>
  );
};

export default MovieCard;
