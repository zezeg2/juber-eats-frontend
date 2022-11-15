import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';

interface ILoginForm {
  email?: string;
  password?: string;
}
export const Login = () => {
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginForm>();

  const [showError, setShowError] = useState(false);
  const onSubmit = () => {
    console.log(getValues());
    if (errors) setShowError(true);
    else {
      setShowError(false);
    }
  };
  return (
    <div className="flex h-screen items-center justify-center bg-gray-800">
      <div className="max-w w-full  max-w-lg rounded-lg bg-white  py-5 text-center">
        <h3 className="text-3xl font-bold text-gray-800 ">Log In</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 grid gap-3 px-5 "
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
          />
          <input
            {...register('password', {
              required: {
                value: true,
                message: '패스워드를 입력해주세요',
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                message: '잘못된 비밀번호 양식입니다.',
              },
            })}
            placeholder="Password"
            className="input"
          />
          <FormError
            errorMessage={
              errors && errors.email
                ? errors.email.message
                : errors.password?.message
            }
          />
          <button className="btn">Login</button>
        </form>
      </div>
    </div>
  );
};
