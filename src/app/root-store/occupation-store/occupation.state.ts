import { Skill, Occupation, AreaOfStudy, Pathway, PreferredSalary } from '@gql';
import { HotSpotModel, GeoSalaryModel } from '@vantage-point/maps';
import { number } from 'ngx-custom-validators/src/app/number/validator';

export const occupationFeatureKey = 'occupation';


export interface EducationLevelFrequency
{
  educationLevelGroupId: number;
  educationLevelGroup: string;
  frequency: number;
  precisionLevel: string;
}

export interface OccupationState
{
  occupationPreview: Occupation;
  occupationModel: Occupation;
  occupationCardList: Occupation[];
  areaOfStudyList: AreaOfStudy[];
  selectedPathway: Pathway;
  error: any;
}

export const initialOccupationState: OccupationState =
{
  occupationPreview: undefined,
  occupationModel: undefined,
  occupationCardList: undefined,
  areaOfStudyList: undefined,
  selectedPathway: undefined,
  error: null
};
