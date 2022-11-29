import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragments';
import { category, categoryVariables } from '../../__api__/category';

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
  const { data, loading } = useQuery<category, categoryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: { page: 1, slug },
      },
    },
  );

  console.log(data);
  return (
    <div>
      <h1>Category</h1>
    </div>
  );
};
