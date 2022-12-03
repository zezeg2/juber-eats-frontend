import React from 'react';
import logo from '../images/logo.svg';
import { useMe } from '../hooks/useMe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface IFromProps {
  searchTerm: string;
}
export const HeaderWithSearch = () => {
  const { data } = useMe();
  const history = useHistory();
  const { register, handleSubmit, getValues } = useForm<IFromProps>();
  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    console.log(getValues());
    history.push({
      pathname: '/search',
      search: `term=${searchTerm}`,
      state: { searchTerm },
    });
  };
  return (
    <div>
      {!data?.getLoginUserProfile.profile?.verified && (
        <div className="bg-red-500 py-7 px-3 text-center text-sm text-white">
          <span>Please verify your email</span>
        </div>
      )}
      <header className="py-4">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-5 xl:px-0">
          <Link to="/">
            <img src={logo} className="w-44" />
          </Link>
          <form
            onSubmit={handleSubmit(onSearchSubmit)}
            className="flex w-1/2 items-center justify-center"
          >
            <input
              {...register('searchTerm', { required: true, minLength: 2 })}
              id="searchTerm"
              type="Search"
              className="input w-1/2 rounded-md border-2 py-2.5 md:w-3/4"
              placeholder="SearchForm restaurants..."
            />
            <button className="mx-4 min-w-fit rounded-md bg-emerald-700 p-2.5 font-medium text-white">
              Find Food
            </button>
          </form>
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
