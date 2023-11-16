import { Input } from '../../../shared/components/FormElements';
import { VALIDATOR_REQUIRE } from '../../../shared/util/validators';
import './NewPlace.css';

const NewPlace = () => {
  return (
    <form className='place-form'>
      <Input
        element='input'
        type='text'
        label='Title'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a valid Title.'
      />
    </form>
  );
};

export default NewPlace;
