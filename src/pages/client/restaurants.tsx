import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from '../../__api__/restaurantsPageQuery';
import { Restaurant } from '../../components/restaurant';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragments';
import { SearchForm } from '../../components/search-form';
import { Paragraph } from '../../components/paragraph';
import {
  EXPLORE_BY_CATEGORY,
  PROVIDENCE_FOOD_DELIVERY,
  PROVIDENCE_FOOD_DELIVERY_CONTENT,
} from '../../paragraphs';
import { PageNavigator } from '../../components/page-navigator';

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: AllRestaurantsInput!) {
    allCategories {
      isOK
      categories {
        ...CategoryParts
      }
    }
    allRestaurants(input: $input) {
      isOK
      error
      totalPage
      totalCount
      result {
        ...RestaurantParts
      }
    }
  }
  ${CATEGORY_FRAGMENT}
  ${RESTAURANT_FRAGMENT}
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
  return (
    <div>
      <Helmet>
        <title>Home : Juber Eats</title>
      </Helmet>
      <SearchForm />
      <div className="mx-auto w-full max-w-xl md:max-w-screen-2xl">
        <Paragraph
          title={PROVIDENCE_FOOD_DELIVERY}
          content={PROVIDENCE_FOOD_DELIVERY_CONTENT}
        />
        <hr className="my-10" />
        <Paragraph title={EXPLORE_BY_CATEGORY} />
        {!loading && (
          <div className="content-center justify-center pb-20">
            <div className="ml-16 sm:m-0">
              {data?.allCategories.categories?.map((category) => (
                <Link to={`/category/${category.slug}`}>
                  <div
                    key={category.id}
                    className="m-4 inline-flex h-20 w-40 cursor-pointer rounded-lg bg-orange-100 p-2 text-lg shadow hover:bg-lime-100"
                  >
                    {category.name}
                    <img
                      className="w-20"
                      src={
                        category.coverImage ? category.coverImage : undefined
                      }
                    />
                  </div>
                </Link>
              ))}
            </div>
            <hr className="my-10" />
            <div className="grid lg:grid-cols-2">
              {data?.allRestaurants.result?.map((restaurant) => (
                <Restaurant
                  key={restaurant.id}
                  id={restaurant.id + ''}
                  coverImage={restaurant.coverImage}
                  name={restaurant.name}
                  address={restaurant.address}
                  categoryName={restaurant.category?.name}
                />
              ))}
            </div>
            <PageNavigator
              totalPage={data ? data.allRestaurants.totalPage : null}
              page={page}
              setPage={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};
