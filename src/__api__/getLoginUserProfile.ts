/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: getLoginUserProfile
// ====================================================

export interface getLoginUserProfile_getLoginUserProfile_profile {
  __typename: "Profile";
  id: number;
  email: string;
  role: UserRole;
  verified: boolean;
}

export interface getLoginUserProfile_getLoginUserProfile {
  __typename: "LoginUserProfileOutput";
  isOK: boolean;
  profile: getLoginUserProfile_getLoginUserProfile_profile;
}

export interface getLoginUserProfile {
  getLoginUserProfile: getLoginUserProfile_getLoginUserProfile;
}
