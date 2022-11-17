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
import { Helmet } from 'react-helmet';

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
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ILoginForm>({ mode: 'onBlur' });

  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
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
      if (isOK) console.log(token);
      else {
        console.log(error);
      }
    },
  });

  const [loginErrorVisible, setLoginErrorVisible] = useState(false);

  const onValid = async () => {
    setLoginErrorVisible(true);
    await loginMutation();
  };
  const onInvalid = () => {
    console.log(getValues());
    console.log('invalid');
    setLoginErrorVisible(true);
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
        <h4 className="w-full text-left font-mono text-lg">Welcome back</h4>
        <form
          onSubmit={handleSubmit(onValid, onInvalid)}
          className="mt-5 mb-5 grid w-full gap-3"
        >
          <input
            {...register('email', {
              required: {
                value: true,
                message: '이메일을 입력해 주세요.',
              },
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: '잘못된 이메일 형식입니다.',
              },
            })}
            placeholder="Email"
            className="input"
            onInput={() => {
              setLoginErrorVisible(false);
            }}
          />
          <input
            type="password"
            {...register('password', {
              required: {
                value: true,
                message: '패스워드를 입력해주세요',
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                message: '잘못된 비밀번호 형식입니다.',
              },
            })}
            placeholder="Password"
            className="input"
            onInput={() => {
              setLoginErrorVisible(false);
            }}
          />

          {loginErrorVisible && (
            <FormError
              errorMessage={
                errors.email
                  ? errors.email.message
                  : errors.password
                  ? errors.password.message
                  : loginMutationResult?.login.error
                  ? loginMutationResult.login.error
                  : undefined
              }
            />
          )}

          <Button
            isValid={isValid}
            loading={loading}
            actionText={loading ? 'Loading...' : '로그인'}
          />
        </form>
        <div>
          New to Juber?{' '}
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
