import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragments';
import { category, categoryVariables } from '../../__api__/category';
import { SearchForm } from '../../components/search-form';
import { Paragraph } from '../../components/paragraph';
import { Helmet } from 'react-helmet-async';
import { Restaurant } from '../../components/restaurant';
import { PageNavigator } from '../../components/page-navigator';

const CATEGORY_QUERY = gql`
  query category($input: GetCategoryInput!) {
    getCategoryBySlug(input: $input) {
      isOK
      error
      totalCount
      totalPage
      result {
        ...CategoryParts
        restaurants {
          ...RestaurantParts
        }
      }
    }
  }
  ${CATEGORY_FRAGMENT}
  ${RESTAURANT_FRAGMENT}
`;

interface ICategoryParams {
  slug: string;
}

export const Category = () => {
  const { slug } = useParams<ICategoryParams>();
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<category, categoryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: { page, slug },
      },
    },
  );

  let restaurants;
  if (data?.getCategoryBySlug.result?.restaurants) {
    restaurants = data.getCategoryBySlug.result.restaurants;
  }
  return (
    <div>
      <Helmet>
        <title>Category:{slug} | Juber Eats</title>
      </Helmet>
      <SearchForm />
      <div className="layout">
        <Paragraph
          title={`${
            data ? data.getCategoryBySlug.result?.name : ''
          } delivery in Province`}
        />
        <hr className="my-10" />
        <div className="grid lg:grid-cols-2">
          {restaurants
            ? restaurants.map((restaurant) => (
                <Restaurant
                  key={restaurant.id}
                  id={restaurant.id + ''}
                  coverImage={restaurant.coverImage}
                  name={restaurant.name}
                  address={restaurant.address}
                  categoryName={restaurant.category?.name}
                />
              ))
            : undefined}
        </div>
        <PageNavigator
          totalPage={data ? data.getCategoryBySlug.totalPage : null}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};
