import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { gql } from '@apollo/client';
import { RESTAURANT_FRAGMENT } from '../../fragments';

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
  useEffect(() => {
    const [_, searchTerm] = location.search.split('?term=');
    console.log(searchTerm);
    if (!searchTerm) return history.replace('/');
  }, []);
  return (
    <div>
      <Helmet>
        <title>Home : Juber Eats</title>
      </Helmet>
      <h1>Search Page</h1>;
    </div>
  );
};
