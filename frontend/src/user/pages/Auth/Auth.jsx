import { Card } from '../../../shared/components/UIElements';
import { Input, Button } from '../../../shared/components/FormElements';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from '../../../shared/util/validators';
import { useForm } from '../../../shared/hooks/form-hook';
import './Auth.css';
const Auth = () => {
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState);
  };

  return (
    <Card className='authentication'>
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        <Input
          element='input'
          id='email'
          type='email'
          label='Email'
          validators={[VALIDATOR_EMAIL()]}
          errorText='Please inter a valid email.'
          onInput={inputHandler}
        />
        <Input
          element='input'
          id='password'
          type='password'
          label='Password'
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText='Please inter a valid password.'
          onInput={inputHandler}
        />
        <Button type='submit' disabled={!formState.isValid}>
          Login
        </Button>
      </form>
    </Card>
  );
};

export default Auth;
