import React from 'react';
import { authTokenVar, isLoggedInVar } from '../apollo';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { UserRole } from '../__api__/globalTypes';
import { Restaurants } from '../pages/client/restaurants';
import { Header } from '../components/header';
import { useMe } from '../hooks/useMe';

const ClientRoutes = [
  <Route path="/" exact={true}>
    <Restaurants />
  </Route>,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="text-xl font-medium tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <div>
      {data.getLoginUserProfile.profile?.role === UserRole.Client && (
        <BrowserRouter>
          <Header />
          <Switch>
            {ClientRoutes}
            <Redirect to="/"></Redirect>
          </Switch>
        </BrowserRouter>
      )}

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
