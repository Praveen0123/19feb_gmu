import { ConnectWithCoach } from '@gql';

export const connectCoachFeatureKey = 'connectWithCoach';



export interface ConnectCoachState
{
  connectWithCoach: ConnectWithCoach;
}

export const initialConnectCoachState: ConnectCoachState =
{
  connectWithCoach: undefined
};
