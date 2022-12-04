import React from 'react';
import logo from '../images/logo.svg';
import { useMe } from '../hooks/useMe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const Header = () => {
  const { data } = useMe();
  return (
    <div>
      {!data?.getLoginUserProfile.profile?.verified && (
        <div className="bg-red-500 py-7 px-3 text-center text-sm text-white">
          <span>Please verify your email</span>
        </div>
      )}
      <header className="py-6">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-5 xl:px-0">
          <Link to="/">
            <img src={logo} className="w-44" />
          </Link>
          <span className="text-sm">
            <Link to="/edit-profile">
              <FontAwesomeIcon icon={faUser} className="mx-1 text-xl" />
              {data?.getLoginUserProfile.profile?.email}
            </Link>
          </span>
        </div>
      </header>
    </div>
  );
};
