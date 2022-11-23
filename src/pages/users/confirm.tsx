import React, { useEffect } from 'react';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import { verifyEmail, verifyEmailVariables } from '../../__api__/verifyEmail';
import { useMe } from '../../hooks/useMe';
import { useHistory } from 'react-router-dom';

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      isOK
      error
    }
  }
`;
export const ConfirmEmail = () => {
  const { data: userdata } = useMe();
  const client = useApolloClient();
  const history = useHistory();
  const [verifyEmail] = useMutation<verifyEmail, verifyEmailVariables>(
    VERIFY_EMAIL_MUTATION,
    {
      onCompleted: (data) => {
        const {
          verifyEmail: { isOK },
        } = data;
        if (isOK && userdata?.getLoginUserProfile.profile.id) {
          client.writeFragment({
            id: `Profile:${userdata?.getLoginUserProfile.profile.id}`,
            fragment: gql`
              fragment VerifiedUser on Profile {
                verified
              }
            `,
            data: {
              verified: true,
            },
          });
          history.push('/');
        }
      },
    },
  );
  useEffect(() => {
    const [_, code] = window.location.href.split('code=');
    verifyEmail({
      variables: {
        input: { code },
      },
    });
  }, []);
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h2 className="mb-2 text-lg font-medium">Confirming email...</h2>
      <h4 className="text-sm text-gray-700">
        Please wait, don't close this page
      </h4>
    </div>
  );
};
