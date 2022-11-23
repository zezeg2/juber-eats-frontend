import React from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from '../../__api__/restaurantsPageQuery';

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
      }
    }
  }
`;
export const Restaurants = () => {
  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });
  console.log(data);
  return (
    <div>
      <form className="mb-10 flex w-full items-center justify-center bg-gray-800 py-40">
        <input
          type="Search"
          className="input w-1/3 rounded-md border-0"
          placeholder="Search restaurants..."
        />
        <button className="m-4 rounded-md bg-emerald-700 p-3 text-lg font-medium text-white">
          Find Food
        </button>
      </form>
      <div className="mx-auto w-full max-w-screen-2xl">
        <h1 className="mb-4 text-4xl font-bold">Providence Food Delivery</h1>
        <p>
          Have your favorite Providence restaurant food delivered to your door
          with Uber Eats. Whether you want to order breakfast, lunch, dinner, or
          a snack, Uber Eats makes it easy to discover new and nearby places to
          eat in Providence. Browse tons of food delivery options, place your
          order, and track it by the minute.
        </p>
        <hr className="my-10" />
        <h1 className="mb-10 text-4xl font-bold">Explore by category</h1>
        {!loading && (
          <div className="flex justify-center">
            {data?.allCategories.categories?.map((category) => (
              <div className=" mr-auto flex h-20 w-40 cursor-pointer rounded-lg bg-orange-100 p-2 text-lg shadow hover:bg-lime-100">
                {category.name}
                <img
                  className="w-20"
                  src={category.coverImage ? category.coverImage : undefined}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
};
