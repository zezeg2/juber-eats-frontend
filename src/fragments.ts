import { gql } from '@apollo/client';

export const RESTAURANT_FRAGMENT = gql`
  fragment RestaurantParts on Restaurant {
    id
    name
    category {
      name
    }
    coverImage
    isPromoted
    address
  }
`;

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryParts on Category {
    id
    name
    coverImage
    slug
    restaurantCount
  }
`;
