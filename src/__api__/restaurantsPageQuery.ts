/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AllRestaurantsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: restaurantsPageQuery
// ====================================================

export interface restaurantsPageQuery_allCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  coverImage: string | null;
  slug: string;
  restaurantCount: number;
}

export interface restaurantsPageQuery_allCategories {
  __typename: "AllCategoriesOutput";
  isOK: boolean;
  categories: restaurantsPageQuery_allCategories_categories[] | null;
}

export interface restaurantsPageQuery_allRestaurants_result_category {
  __typename: "Category";
  name: string;
}

export interface restaurantsPageQuery_allRestaurants_result {
  __typename: "Restaurant";
  id: number;
  name: string;
  category: restaurantsPageQuery_allRestaurants_result_category | null;
  coverImage: string;
  isPromoted: boolean;
  address: string;
}

export interface restaurantsPageQuery_allRestaurants {
  __typename: "AllRestaurantsOutput";
  isOK: boolean;
  error: string | null;
  totalPage: number | null;
  totalCount: number | null;
  result: restaurantsPageQuery_allRestaurants_result[] | null;
}

export interface restaurantsPageQuery {
  allCategories: restaurantsPageQuery_allCategories;
  allRestaurants: restaurantsPageQuery_allRestaurants;
}

export interface restaurantsPageQueryVariables {
  input: AllRestaurantsInput;
}
