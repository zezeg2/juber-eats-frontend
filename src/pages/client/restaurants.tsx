import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from '../../__api__/restaurantsPageQuery';
import { Restaurant } from '../../components/restaurant';
import searchBackground from '../../images/search-background.png';

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: AllRestaurantsInput!) {
    allCategories {
      isOK
      categories {
        id
        name
        coverImage
        slug
        restaurantCount
      }
    }
    allRestaurants(input: $input) {
      isOK
      error
      totalPage
      totalCount
      result {
        id
        name
        category {
          name
        }
        address
        isPromoted
        coverImage
      }
    }
  }
`;
export const Restaurants = () => {
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  console.log(data);
  return (
    <div>
      <form
        className="mb-10 flex w-full items-center justify-center bg-gray-800 py-32 md:py-72"
        style={{ backgroundImage: `url(${searchBackground})` }}
      >
        <input
          type="Search"
          className="input w-1/2 rounded-md border-0 md:w-1/3"
          placeholder="Search restaurants..."
        />
        <button className="m-4 rounded-md bg-emerald-700 p-3 text-lg font-medium text-white">
          Find Food
        </button>
      </form>
      <div className="mx-auto w-full max-w-xl md:max-w-screen-2xl">
        <div className="text-center sm:text-left">
          <h1 className="mb-4 text-4xl font-bold">Providence Food Delivery</h1>
          <p className="text-left">
            Have your favorite Providence restaurant food delivered to your door
            with Uber Eats. Whether you want to order breakfast, lunch, dinner,
            or a snack, Uber Eats makes it easy to discover new and nearby
            places to eat in Providence. Browse tons of food delivery options,
            place your order, and track it by the minute.
          </p>
        </div>

        <hr className="my-10" />
        <div className="text-center sm:text-left">
          <h1 className="mb-10 text-4xl font-bold">Explore by category</h1>
        </div>
        {!loading && (
          <div className="content-center justify-center pb-20">
            <div className="ml-16 sm:m-0">
              {data?.allCategories.categories?.map((category) => (
                <div className="m-4 inline-flex h-20 w-40 cursor-pointer rounded-lg bg-orange-100 p-2 text-lg shadow hover:bg-lime-100">
                  {category.name}
                  <img
                    className="w-20"
                    src={category.coverImage ? category.coverImage : undefined}
                  />
                </div>
              ))}
            </div>
            <hr className="my-10" />
            <div className="grid lg:grid-cols-2">
              {data?.allRestaurants.result?.map((restaurant) => (
                <Restaurant
                  id={restaurant.id + ''}
                  coverImage={restaurant.coverImage}
                  name={restaurant.name}
                  address={restaurant.address}
                  categoryName={restaurant.category?.name}
                />
              ))}
            </div>
            <div className="mx-auto mt-10 grid max-w-sm grid-cols-3 items-center text-center">
              {page > 1 ? (
                <button
                  onClick={onPrevPageClick}
                  className="text-lg font-medium hover:text-lime-600 hover:outline-none "
                >
                  &larr;
                </button>
              ) : (
                <div></div>
              )}
              <span>
                Page {page} of {data?.allRestaurants.totalPage}
              </span>
              {page !== data?.allRestaurants.totalPage ? (
                <button
                  onClick={onNextPageClick}
                  className="text-lg font-medium hover:text-lime-600 hover:outline-none "
                >
                  &rarr;
                </button>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
