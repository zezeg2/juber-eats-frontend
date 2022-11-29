import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Restaurants } from '../pages/client/restaurants';
import { Header } from '../components/header';
import { useMe } from '../hooks/useMe';
import { NotFound } from '../pages/404';
import { ConfirmEmail } from '../pages/users/confirm';
import { UserRole } from '../__api__/globalTypes';
import { EditProfile } from '../pages/users/editProfile';
import { Search } from '../pages/client/search';
import { Category } from '../pages/client/category';

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
  <Route key={4} path="/search">
    <Search />
  </Route>,
  <Route key={5} path="/category/:slug">
    <Category />
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

      {/*<button*/}
      {/*  onClick={() => {*/}
      {/*    isLoggedInVar(false);*/}
      {/*    authTokenVar(null);*/}
      {/*    localStorage.clear();*/}
      {/*  }}*/}
      {/*>*/}
      {/*  Click to logout*/}
      {/*</button>*/}
    </div>
  );
};
