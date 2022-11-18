import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import logo from '../images/logo.svg';
import { FormError } from '../components/form-error';
import { Button } from '../components/button';
import { Link, useHistory } from 'react-router-dom';
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
} from '../__api__/CreateAccountMutation';
import { UserRole } from '../__api__/globalTypes';

const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      isOK
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

export const CreateAccount = () => {
  const {
    register,
    watch,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ICreateAccountForm>({
    defaultValues: {
      role: UserRole.Client,
    },
  });

  const history = useHistory();

  const [createAccountErrorVisible, setCreateAccountErrorVisible] =
    useState(false);

  const [createAccountMutation, { data: createAccountResult, loading }] =
    useMutation<CreateAccountMutation, CreateAccountMutationVariables>(
      CREATE_ACCOUNT_MUTATION,
      {
        variables: {
          createAccountInput: {
            email: watch('email'),
            password: watch('password'),
            role: watch('role'),
          },
        },
        onCompleted: (data) => {
          const {
            createAccount: { isOK, error },
          } = data;
          if (isOK) {
            history.push('/login');
          }
        },
      },
    );

  const onValid = async () => {
    setCreateAccountErrorVisible(true);
    if (!loading) {
      await createAccountMutation();
    }
  };
  const onInvalid = () => {
    setCreateAccountErrorVisible(true);
  };
  return (
    <div className="mt-10 flex h-screen flex-col items-center lg:mt-36">
      <div className="flex w-full max-w-screen-sm flex-col items-center px-5">
        <Helmet>
          <title>Create Account | Juber Eats</title>
        </Helmet>
        <img src={logo} className="mb-10 w-64" />
        <h4 className="w-full text-left font-mono text-2xl">
          Let's Get Start !
        </h4>
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
              setCreateAccountErrorVisible(false);
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
              setCreateAccountErrorVisible(false);
            }}
          />

          <select className="input" {...register('role', { required: true })}>
            {Object.keys(UserRole).map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>
          {createAccountErrorVisible && (
            <FormError
              errorMessage={
                errors.email
                  ? errors.email.message
                  : errors.password
                  ? errors.password.message
                  : createAccountResult?.createAccount.error
                  ? createAccountResult.createAccount.error
                  : undefined
              }
            />
          )}
          <Button isValid={isValid} loading={loading} actionText="join" />
        </form>
        <div>
          Already have an account?{'  '}
          <Link to="/login" className="font-mono text-lime-600 hover:underline">
            Log in Now!
          </Link>
        </div>
      </div>
    </div>
  );
};
