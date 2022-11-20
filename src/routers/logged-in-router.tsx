import React from 'react';
import { authTokenVar, isLoggedInVar } from '../apollo';
import { gql, useQuery } from '@apollo/client';
import { getLoginUserProfile } from '../__api__/getLoginUserProfile';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { UserRole } from '../__api__/globalTypes';
import { Restaurants } from '../pages/client/restaurants';

const ClientRoutes = [
  <Route path="/" exact={true}>
    <Restaurants />
  </Route>,
];
const GET_LOGIN_USER_PROFILE = gql`
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
export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<getLoginUserProfile>(
    GET_LOGIN_USER_PROFILE,
  );
  if (!data || loading || error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="text-xl font-medium tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <div>
      <BrowserRouter>
        <Switch>
          {data.getLoginUserProfile.profile?.role === UserRole.Client &&
            ClientRoutes}
          <Redirect to="/"></Redirect>
        </Switch>
      </BrowserRouter>
      <button
        onClick={() => {
          isLoggedInVar(false);
          authTokenVar(null);
          localStorage.clear();
        }}
      >
        Click to logout
      </button>
    </div>
  );
};
