import React from 'react';
import { Button } from '../../components/button';
import { useForm } from 'react-hook-form';
import { useMe } from '../../hooks/useMe';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import { editProfile, editProfileVariables } from '../../__api__/editProfile';
import { useHistory } from 'react-router-dom';

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      isOK
      error
    }
  }
`;

interface IEditProfileForm {
  email?: string;
  password?: string;
}

export const EditProfile = () => {
  const { data: userdata, refetch: refetchProfile } = useMe();
  const client = useApolloClient();
  const history = useHistory();
  const [editProfile, { loading }] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE_MUTATION, {
    onCompleted: async (data) => {
      const {
        editProfile: { isOK },
      } = data;
      if (isOK && userdata) {
        const {
          getLoginUserProfile: {
            profile: { email: prevEmail, id },
          },
        } = userdata;
        const { email: newEmail } = getValues();
        if (prevEmail !== newEmail) {
          // client.writeFragment({
          //   id: `Profile:${id}`,
          //   fragment: gql`
          //     fragment EditedUser on Profile {
          //       verified
          //       email
          //     }
          //   `,
          //   data: {
          //     email: newEmail,
          //     verified: false,
          //   },
          // });
          await refetchProfile();
          history.push('/');
        }
      }
    },
  });
  const {
    register,
    watch,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
  } = useForm<IEditProfileForm>({
    defaultValues: {
      email: userdata?.getLoginUserProfile.profile.email,
    },
    mode: 'onChange',
  });
  const onValid = async () => {
    const { email, password } = getValues();
    editProfile({
      variables: {
        input: {
          ...(email !== '' && { email }),
          ...(password !== '' && { password }),
        },
      },
    });
  };
  const onInvalid = () => {
    console.log(getValues());
  };
  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <h4 className="mb-3 text-2xl font-semibold">Edit Profile</h4>
      <form
        className="mt-5 mb-5 grid w-full max-w-screen-sm gap-3"
        onSubmit={handleSubmit(onValid, onInvalid)}
      >
        <input
          {...register('email', {
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: 'Please enter a valid email ',
            },
          })}
          placeholder="Email"
          className="input"
        />
        <input
          type="password"
          {...register('password', {
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
              message:
                'Password should be at least 8 characters & mix of upper & lowercase letter and number',
            },
          })}
          placeholder="Password"
          className="input"
        />
        <Button
          loading={false}
          actionText="Save Profile"
          isValid={
            (watch('email') || watch('password') ? true : false) &&
            isValid &&
            (getValues().password !== ''
              ? isValid
              : userdata?.getLoginUserProfile.profile.email !==
                getValues().email)
          }
        />
      </form>
    </div>
  );
};
