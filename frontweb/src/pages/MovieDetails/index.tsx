import { ReactComponent as Start } from 'assets/images/star.svg';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Movie } from 'types/movie';
import { BASE_URL } from 'util/requests';
import { hasAnyRoles } from 'util/auth';
import Users from 'pages/Admin/User';
import ButtonIcon from 'components/ButtonIcon';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';


import './styles.css';



type FormData = {
  description: string;
};

type UrlParams = {
  moviesId: string;
};

const MovieDetails = () => {
  const { moviesId } = useParams<UrlParams>();

  const [movie, setMovie] = useState<Movie>();

  const { register, handleSubmit } = useForm<FormData>();


  const onSubmit = (formData: FormData) => {
   console.log(formData.description); 
  formData.description.toString();          
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movies/${moviesId}`)
      .then((response) => {
        setMovie(response.data);
      })
      .finally(() => {});
  }, [moviesId]);

  return (
    <div className="movie-details-container">
      <div className="base-card movie-details-card">
        <h2>Tela detalhes do filme id: {moviesId}</h2>
        <div className="colunm">
          { hasAnyRoles (['ROLE_MEMBER']) && (
            <>              

              <div className="text-insert-conatiner">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    {...register('description')}
                    className="form-control"
                    type="text"
                    placeholder="Deixe sua avaliação aqui"
                    name="description"
                  />
                  <div className="btn-save-submit">
                    <ButtonIcon text="SALVAR AVALIAÇÃO" />
                  </div>
                </form>
              </div>
              </>
          )}

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
           
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
