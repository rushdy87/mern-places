import { useState } from 'react';

import { Card } from '../../../shared/components/UIElements';
import { Input, Button } from '../../../shared/components/FormElements';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MIN,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../../shared/util/validators';
import { useForm } from '../../../shared/hooks/form-hook';
import './Auth.css';
const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
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

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState);
  };

  return (
    <Card className='authentication'>
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element='input'
            id='name'
            type='text'
            label='Name'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please inter a name.'
            onInput={inputHandler}
          />
        )}
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
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        Switch to {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </Button>
    </Card>
  );
};

export default Auth;
