import { AreaOfStudy } from '@gql';

export const areaOfStudyFeatureKey = 'areaOfStudy';

export interface AreaOfStudyState
{
  areaOfStudyList: AreaOfStudy[];
  selectedAreaOfStudy: AreaOfStudy;
}

export const initialAreaOfStudyState: AreaOfStudyState =
{
  areaOfStudyList: undefined,
  selectedAreaOfStudy: undefined
};
