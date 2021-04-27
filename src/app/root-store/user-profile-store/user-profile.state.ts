import { CognitoAccessToken } from 'amazon-cognito-identity-js';
export const userProfileFeatureKey = 'userProfile';

export interface UserProfileModel
{
  userId: string;
}

export interface UserLoginModel
{
  userName: string;
  userPassword: string;
}

export interface UserRegistrationModel
{
  emailAddress: string;
  verifyEmailAddress: string;
  password: string;
  verifyPassword: string;
  firstName?: string;
  lastName?: string;
  studentId?: string;
}

export interface UserRegistrationResult
{
  userName: string;
  confirmed: boolean;
}

export interface ResetPasswordRequest
{
  emailAddress: string;
  requestType: RequestType;
  password?: string;
  code?: string;
}

export interface ResetPasswordCodeResult
{
  request: any;
  email: string;
}

export interface ConfirmRegistrationRequest
{
  email: string;
  code: string;
}

export enum RequestType
{
  RESET_PASSWORD,
  REQUEST_CODE
}

export interface UserDetails
{
  userName: string;
  accessToken: CognitoAccessToken;
  roles: string[];
  isAdmin?: boolean;
  isStudent?: boolean;
  isCoach?: boolean;
}

export interface UserProfileState
{
  userProfileModel?: UserProfileModel;
  userLoginModel?: UserLoginModel;
  userRegistration: UserRegistrationResult;
  userDetails?: any;
  passwordResetDetails?: ResetPasswordCodeResult;
}

export const initialConnectCoachState: UserProfileState =
{
  userProfileModel: undefined,
  userLoginModel: undefined,
  userRegistration: undefined,
  userDetails: undefined
};


