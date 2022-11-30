import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from '../../__api__/restaurantsPageQuery';
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
import { RestaurantList } from '../../components/restaurant-list';
import { CategoryList } from '../../components/category-list';

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
      <div className="layout">
        <Paragraph
          title={PROVIDENCE_FOOD_DELIVERY}
          content={PROVIDENCE_FOOD_DELIVERY_CONTENT}
        />
        <hr className="my-10" />
        <Paragraph title={EXPLORE_BY_CATEGORY} />
        {!loading && (
          <div className="content-layout">
            <CategoryList
              categories={data ? data.allCategories.categories : null}
            />
            <hr className="my-10" />
            <RestaurantList result={data ? data.allRestaurants.result : null} />
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
