import React from 'react';
import searchBackground from '../images/search-background.png';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

interface IFromProps {
  searchTerm: string;
}
export const SearchForm = () => {
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
    <form
      onSubmit={handleSubmit(onSearchSubmit)}
      className="mb-10 flex w-full items-center justify-center bg-gray-800 bg-cover py-32 md:py-72"
      style={{ backgroundImage: `url(${searchBackground})` }}
    >
      <input
        {...register('searchTerm', { required: true, minLength: 2 })}
        id="searchTerm"
        type="Search"
        className="input w-3/4 rounded-md border-0 md:w-1/3"
        placeholder="SearchForm restaurants..."
      />
      <button className="m-4 rounded-md bg-emerald-700 p-3 text-lg font-medium text-white">
        Find Food
      </button>
    </form>
  );
};
