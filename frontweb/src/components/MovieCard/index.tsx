import ButtonIcon from 'components/ButtonIcon';
import { useForm } from 'react-hook-form';

import './styles.css';

type FormData = {
  description: string;
};

const MovieCard = () => {

  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
   console.log(formData.description); 
  formData.description.toString();     
     
  };

  return (
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
  );
};

export default MovieCard;
