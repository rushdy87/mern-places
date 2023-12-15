import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '../../../shared/components/FormElements';
import ImageUpload from '../../../shared/components/ImageUpload/ImageUpload';
import {
  LoadingSpinner,
  ErrorModal,
} from '../../../shared/components/UIElements';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../../shared/util/validators';
import { useForm, useHttpClient } from '../../../shared/hooks';
import { AuthContext } from '../../../shared/context/auth-context';
import '../placeForm.css';

const NewPlace = () => {
  const navigate = useNavigate();

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );
  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  const { userId } = useContext(AuthContext);

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();

      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('creator', userId);
      formData.append('image', formState.inputs.image.value);

      await sendRequest('http://localhost:3030/api/places', 'POST', formData);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className='place-form' onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id='title'
          element='input'
          type='text'
          label='Title'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid title.'
          onInput={inputHandler}
        />
        <Input
          id='description'
          element='textarea'
          label='Description'
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText='Please enter a valid description (at least 5 characters).'
          onInput={inputHandler}
        />
        <Input
          id='address'
          element='input'
          label='Address'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid address.'
          onInput={inputHandler}
        />
        <ImageUpload
          id='image'
          onInput={inputHandler}
          errorText='Please provied an image.'
        />
        <Button type='submit' disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
};

export default NewPlace;
