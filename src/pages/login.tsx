import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';
import { gql, useMutation } from '@apollo/client';
import {
  LoginMutation,
  LoginMutationVariables,
} from '../__api__/LoginMutation';
import logo from '../images/logo.svg';
import { Button } from '../components/button';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { authTokenVar, isLoggedInVar } from '../apollo';
import { LOCALSTORAGE_TOKEN } from '../constants';

const LOGIN_MUTATION = gql`
  mutation LoginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      isOK
      error
      token
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    watch,
    getValues,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginForm>();

  const [loginMutation, { data: loginResult, loading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION, {
    variables: {
      loginInput: {
        email: watch('email'),
        password: watch('password'),
      },
    },
    onCompleted: (data) => {
      const {
        login: { isOK, error, token },
      } = data;
      if (isOK && token) {
        localStorage.setItem(LOCALSTORAGE_TOKEN, token);
        authTokenVar(token);
        console.log(token);
        isLoggedInVar(true);
      } else {
        console.log(error);
      }
    },
  });

  const [errorVisible, setErrorVisible] = useState(false);

  const onValid = async () => {
    setErrorVisible(true);
    if (!loading) {
      await loginMutation();
    }
  };
  const onInvalid = () => {
    console.log(getValues());
    setErrorVisible(true);
    if (errors.email) setValue('email', '');
    if (errors.password) setValue('password', '');
  };
  return (
    <div className="mt-10 flex h-screen flex-col items-center lg:mt-36">
      <Helmet>
        <title>Login | Juber Eats</title>
      </Helmet>
      <div className="flex w-full max-w-screen-sm flex-col items-center px-5">
        <img src={logo} className="mb-10 w-64" />
        <h4 className="w-full text-left font-mono text-2xl">Welcome back</h4>
        <form
          onSubmit={handleSubmit(onValid, onInvalid)}
          className="mt-5 mb-5 grid w-full gap-3"
        >
          <input
            {...register('email', {
              required: {
                value: true,
                message: 'Email is required',
              },
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: 'Please enter a valid email ',
              },
            })}
            placeholder="Email"
            className="input"
            onInput={() => {
              setErrorVisible(false);
            }}
          />
          <input
            type="password"
            {...register('password', {
              required: {
                value: true,
                message: 'Password is required',
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                message:
                  'Password should be at least 8 characters & mix of upper & lowercase letter and number',
              },
            })}
            placeholder="Password"
            className="input"
            onInput={() => {
              setErrorVisible(false);
            }}
          />

          {errorVisible && (
            <FormError
              errorMessage={
                errors.email
                  ? errors.email.message
                  : errors.password
                  ? errors.password.message
                  : loginResult?.login.error
                  ? loginResult.login.error
                  : undefined
              }
            />
          )}

          <Button
            isValid={watch('email') && watch('password') ? true : false}
            loading={loading}
            actionText={loading ? 'Loading...' : 'Login'}
          />
        </form>
        <div>
          New to Juber?{'  '}
          <Link
            to="/create-account"
            className="font-mono text-lime-600 hover:underline"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};
