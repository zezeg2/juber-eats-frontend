import { gql, useQuery } from '@apollo/client';
import { getLoginUserProfile } from '../__api__/getLoginUserProfile';

export const GET_LOGIN_USER_PROFILE = gql`
  query getLoginUserProfile {
    getLoginUserProfile {
      isOK
      profile {
        id
        email
        role
        verified
      }
    }
  }
`;
export const useMe = () => {
  return useQuery<getLoginUserProfile>(GET_LOGIN_USER_PROFILE);
};
