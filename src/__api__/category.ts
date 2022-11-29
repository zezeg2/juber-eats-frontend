/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetCategoryInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: category
// ====================================================

export interface category_getCategoryBySlug_result_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface category_getCategoryBySlug_result_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  category: category_getCategoryBySlug_result_restaurants_category | null;
  coverImage: string;
  isPromoted: boolean;
  address: string;
}

export interface category_getCategoryBySlug_result {
  __typename: "Category";
  id: number;
  name: string;
  coverImage: string | null;
  slug: string;
  restaurantCount: number;
  restaurants: category_getCategoryBySlug_result_restaurants[] | null;
}

export interface category_getCategoryBySlug {
  __typename: "GetCategoryOutput";
  isOK: boolean;
  error: string | null;
  totalCount: number | null;
  totalPage: number | null;
  result: category_getCategoryBySlug_result | null;
}

export interface category {
  getCategoryBySlug: category_getCategoryBySlug;
}

export interface categoryVariables {
  input: GetCategoryInput;
}
