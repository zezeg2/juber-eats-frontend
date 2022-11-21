import React from 'react';
import { authTokenVar, isLoggedInVar } from '../apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Restaurants } from '../pages/client/restaurants';
import { Header } from '../components/header';
import { useMe } from '../hooks/useMe';
import { NotFound } from '../pages/404';
import { ConfirmEmail } from '../pages/users/confirm';
import { UserRole } from '../__api__/globalTypes';
import { EditProfile } from '../pages/users/editProfile';

const ClientRoutes = [
  <Route key={1} path="/" exact={true}>
    <Restaurants />
  </Route>,
  <Route key={2} path="/confirm">
    <ConfirmEmail />
  </Route>,
  <Route key={3} path="/edit-profile">
    <EditProfile />
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
            {/*<Redirect to="/"></Redirect>*/}
            <Route>
              <NotFound />
            </Route>
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
