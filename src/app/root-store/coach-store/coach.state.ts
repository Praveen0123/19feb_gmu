import { Coach } from '@gql';
export const coachFeatureKey = 'coach';
export interface RecentSearchModel
{
  name: string;
  date: Date;
  email: string;
}

export interface CoachState
{
  coachList: Coach[];
  recentSearches?: RecentSearchModel[];
}

export const initialCoachState: CoachState =
{
  coachList: undefined
};

