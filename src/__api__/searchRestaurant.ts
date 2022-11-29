/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchRestaurant
// ====================================================

export interface searchRestaurant_searchRestaurant_result_category {
  __typename: "Category";
  name: string;
}

export interface searchRestaurant_searchRestaurant_result {
  __typename: "Restaurant";
  id: number;
  name: string;
  category: searchRestaurant_searchRestaurant_result_category | null;
  coverImage: string;
  isPromoted: boolean;
  address: string;
}

export interface searchRestaurant_searchRestaurant {
  __typename: "SearchRestaurantOutput";
  isOK: boolean;
  error: string | null;
  totalCount: number | null;
  totalPage: number | null;
  result: searchRestaurant_searchRestaurant_result[] | null;
}

export interface searchRestaurant {
  searchRestaurant: searchRestaurant_searchRestaurant;
}

export interface searchRestaurantVariables {
  input: SearchRestaurantInput;
}
