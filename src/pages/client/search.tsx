import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { gql, useLazyQuery } from '@apollo/client';
import { RESTAURANT_FRAGMENT } from '../../fragments';
import {
  searchRestaurant,
  searchRestaurantVariables,
} from '../../__api__/searchRestaurant';
import { HeaderWithSearch } from '../../components/header-with-search';

const SEARCH_RESTAURANT = gql`
  query searchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      isOK
      error
      totalCount
      totalPage
      result {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;
export const Search = () => {
  const location = useLocation();
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [fetchNow, { loading, data, called }] = useLazyQuery<
    searchRestaurant,
    searchRestaurantVariables
  >(SEARCH_RESTAURANT);
  const [_, query] = location.search.split('?term=');
  useEffect(() => {
    if (!query) return history.replace('/');
    fetchNow({
      variables: {
        input: {
          page,
          query,
        },
      },
    });
  }, [history, location]);

  console.log(loading, data, called);
  return (
    <div>
      <Helmet>
        <title>Search : {query} | Juber Eats</title>
      </Helmet>
      <HeaderWithSearch />
      <div className="layout">
        <h1>Search Page</h1>
      </div>
    </div>
  );
};
