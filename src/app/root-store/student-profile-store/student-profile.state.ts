export const studentProfileFeatureKey = 'student-profile';

export interface StudentProfileSkillsModel
{
  id: string;
  areaOfStudy: string;
  associateDegree: associateDegreeModel;
  bachelorDegree: bachelorDegreeModel;
}


export interface associateDegreeModel
{
  id: string;
  name: string;
  courses: coursesListModel[];
  earnedCredits: number;
}

export interface bachelorDegreeModel
{
  id: string;
  name: string;
  courses: coursesListModel[];
  earnedCredits: number;
}

export interface coursesListModel
{
  semester: string;
  year: number;
  courseHeading: string;
  credits: number;
  courseDetails: courseDetailsModel[];
}

export interface courseDetailsModel
{
  code: string;
  name: string;
  plannedStatus: boolean;
  completedStatus: boolean;
}

export interface studentSkillsTranscriptModel
{
  yearCompleted: number;
  courseCode: string;
  courseName: string;
  skillsDetails: skillsDetailsModel[];
}

export interface skillsDetailsModel
{
  skillName: string;
  skillDefinition: string;
}



export interface StudentProfileState
{
  studentProfileSkillList: StudentProfileSkillsModel;
  studentSkillsTranscriptList: studentSkillsTranscriptModel[];
  error: any;
}

export const initialStudentProfileState: StudentProfileState = {
  studentProfileSkillList: undefined,
  studentSkillsTranscriptList: undefined,
  error: null
};