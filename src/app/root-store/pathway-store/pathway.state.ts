import { Pathway, Skill } from '@gql';

export const pathwayFeatureKey = 'pathway';

export interface PathwaySummaryModel
{
  novaCourses: CourseModel[];
  novaClassCount: number;
  novaCredits: number;
  masonCourses: CourseModel[];
  masonClassCount: number;
  masonCredits: number;
}

export enum SkillTypeEnum
{
  Essential = 'BaseLine Skill',
  Technical = 'Specialized Skill'
}

export enum RoadmapMode
{
  Course = 'Course',
  Skill = 'Skill'
}

export interface CourseModel
{
  id: number;
  credits?: number;
  school: string;
  name: string;
  code: string;
  skillList?: Skill[];
  sequenceNumber?: number;
  year?: number;
}


export interface PathwayState
{
  pathwayList: Pathway[];
  pathway: Pathway;
}

export const initialPathwayState: PathwayState =
{
  pathwayList: undefined,
  pathway: undefined
};
