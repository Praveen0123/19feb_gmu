import { CognitoUser } from '@aws-amplify/auth';
import { CognitoAccessToken } from 'amazon-cognito-identity-js';

export const authFeatureKey = 'auth';

export interface UserDetails
{
    userName: string;
    roles?: string[];
    isAdmin?: boolean;
    isStudent?: boolean;
    isCoach?: boolean;
    accessToken: CognitoAccessToken;
}

export interface UserLoginDetails
{
    userName: string;
    password: string;
}

export interface AuthState
{
    isLoggedIn: boolean;
    userDetails: UserDetails;
}

export const fakeAuthState: AuthState = {
    isLoggedIn: true, userDetails: {
        userName: 'testSME',
        roles: [
            'SME',
            'courseusers',
            //        'd0e90abf-6ea7-4e4f-bc57-60086c6dbbfb',
            'GMU_ONLY',
            'admin'
        ],
        isAdmin: true,
        isStudent: false,
        isCoach: false,
        accessToken: {
            getJwtToken: () => 'eyJraWQiOiJMOWxQdjVBNVFTSnVSM2MzNlJRS0NBK0RUQTd2VFJPb3hwMTRSVVJNTGE4PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5MWE1YTAwMy05MjE5LTQyYmMtODdhYy0wNjliODY1YTk5MDciLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbiIsImNvdXJzZXVzZXJzIl0sImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX0ZuQUdHR1c2VyIsInZlcnNpb24iOjIsImNsaWVudF9pZCI6IjJobm4xYjNvOTBna2xzYTRrZzVwcTlrM3N0IiwiZXZlbnRfaWQiOiJlODcyNzhmMC01Y2Y3LTQyY2ItYTZmMC1jYWI2NDY1MjFlZjMiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNjAwMzA1OTgzLCJleHAiOjE2MDAzMDk1ODMsImlhdCI6MTYwMDMwNTk4MywianRpIjoiZWE5M2ZlNzQtNTRjOS00YWNlLTlmODctZDk5ZGZjMTNiNDgwIiwidXNlcm5hbWUiOiJjcm9ydmlnIn0.UGvzzMP6_GD06dgrBxXLMwEQid6683eKM4v69GBLtb79BYDrmxLUfimEssSXpkxkStbb51mmQtihRPl0Jk25Jfd8jo8yQdoAZt2XHcqtZgI0SyMXJ4ZjF7Sa5v1M4ZwZLOp0hNkiyXdLindmEuRU9VwMErLctheBRcfrvYGIbVg4NspwQHW2DpveM8P7AuwTVBQWN3tVTWuqLW26M1-brZE0qtCkOJGftDx5Y_b7aEzahDIB6Mh64idZJLWDlg_kf7chV6CznlmKjANx02XiDW8LHWoXFy1UNYniz0bJD2hUaTYEoyCiNzJMuswj64uxxCr7cUJzfB0KBqcXg7GbYQ',
            getIssuedAt: () => 1598989397,
            getExpiration: () => 1598992997,
            decodePayload: () => ({}),
            payload: {
                sub: '5b8105bc-08e0-4569-a159-b5429aeba639',
                'cognito:groups': [
                    'SME',
                    'courseusers',
                    // 'd0e90abf-6ea7-4e4f-bc57-60086c6dbbfb',
                    'GMU_ONLY'
                ],
                iss: 'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_FnAGGGW6W',
                version: 2,
                client_id: '2hnn1b3o90gklsa4kg5pq9k3st',
                event_id: '4c2c0539-aaa9-4cda-a271-a3b20dea8612',
                token_use: 'access',
                scope: 'aws.cognito.signin.user.admin phone openid profile email',
                auth_time: 1598989397,
                exp: Date.now() + 100000,
                iat: 1598989397,
                jti: '38c559a6-5945-4dfe-9f08-09f785cce531',
                username: 'testSME'
            }
        }
    }
};

export const initialAuthState: AuthState = { isLoggedIn: false, userDetails: undefined };
