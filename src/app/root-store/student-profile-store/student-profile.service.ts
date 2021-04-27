import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StudentProfileSkillsModel, studentSkillsTranscriptModel } from './student-profile.state';
import { map, filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StudentProfileService
{

  constructor() { }


  getStudentProfileSkillsList(): Observable<StudentProfileSkillsModel>
  {
    return of(this.fakeStudentSkillsData())
      .pipe
      (
        map((results: StudentProfileSkillsModel) =>
        {
          const list: StudentProfileSkillsModel = results as StudentProfileSkillsModel;
          return list;
        }
        ));
  };

  getStudentSkillsTranscriptList(): Observable<studentSkillsTranscriptModel[]>
  {

    return of(this.fakeStudentSkillsTranscriptData())
      .pipe
      (
        map((studentSkillsTranscriptResult: studentSkillsTranscriptModel[]) =>
        {
          if (studentSkillsTranscriptResult) 
          {
            const list: studentSkillsTranscriptModel[] = [];

            studentSkillsTranscriptResult.map(item => 
            {
              const student: studentSkillsTranscriptModel = item as studentSkillsTranscriptModel;
              list.push(student);
            });
            return list;
          }
        })
      );

  };




  private fakeStudentSkillsData()
  {

    const studentProfileSkillsList: StudentProfileSkillsModel =
    {

      id: "2d1b2be8-806c-4ad0-8644-b4e5e3b510c1",
      areaOfStudy: "Health Sciences & Nursing",
      associateDegree: {
        id: "467b1b85-6b8f-4b3c-9992-0d473df292b6",
        name: "A.S. Science",
        courses: [
          {
            semester: 'Summer',
            year: 2018,
            courseHeading: "SDV",
            credits: 3,
            courseDetails: [
              {
                code: "SDV",
                name: "Orientation to Healh Care",
                plannedStatus: true,
                completedStatus: true
              }
            ]
          },
          {
            semester: 'Spring',
            year: 2020,
            courseHeading: "ENG 111",
            credits: 3,
            courseDetails: [
              {
                code: "ENG 111",
                name: "College Composition |",
                plannedStatus: true,
                completedStatus: true
              }
            ]
          },
          {
            semester: 'Fall',
            year: 2019,
            courseHeading: "CST Course",
            credits: 3,
            courseDetails: [
              {
                code: "CST Course",
                name: "Introduction to Communication",
                plannedStatus: true,
                completedStatus: false
              }
            ]
          },
          {
            semester: 'Spring',
            year: 2020,
            courseHeading: "BIO 141",
            credits: 3,
            courseDetails: [
              {
                code: "BIO 141",
                name: "Anatomy and Physiology |",
                plannedStatus: false,
                completedStatus: false
              }
            ]
          },
          {
            semester: 'Summer',
            year: 2019,
            courseHeading: "BIO 142",
            credits: 3,
            courseDetails: [
              {
                code: "BIO 142",
                name: "Anatomy and Physiology ||",
                plannedStatus: false,
                completedStatus: true
              }
            ]
          },
          {
            semester: 'Fall',
            year: 2021,
            courseHeading: "HTL 141",
            credits: 3,
            courseDetails: [
              {
                code: "HTL 141",
                name: "Introduction to Medical Terminology",
                plannedStatus: false,
                completedStatus: false
              }
            ]
          },
          {
            semester: 'Summer',
            year: 2022,
            courseHeading: "RTH120",
            credits: 3,
            courseDetails: [
              {
                code: "RTH120",
                name: "Fundamental Theory of Respiratory Care",
                plannedStatus: true,
                completedStatus: true
              }
            ]
          },
          {
            semester: 'Spring',
            year: 2020,
            courseHeading: "Humanities/Fine Arts",
            credits: 3,
            courseDetails: [
              {
                code: "ART 101",
                name: "History and Appreciation of Art |",
                plannedStatus: false,
                completedStatus: false
              },
              {
                code: "ART 102",
                name: "History and Appreciation of Art ||",
                plannedStatus: false,
                completedStatus: true
              },
              {
                code: "CST 130",
                name: "Intorduction to Theatre",
                plannedStatus: true,
                completedStatus: false
              },
              {
                code: "CST 151",
                name: "Film Appreciation |",
                plannedStatus: true,
                completedStatus: true
              }
            ]
          },
          {
            semester: 'Fall',
            year: 2020,
            courseHeading: "RTH 102",
            credits: 3,
            courseDetails: [
              {
                code: "RTH 102",
                name: "Integrated Science for Respiratory Care ||",
                plannedStatus: true,
                completedStatus: true
              }
            ]
          },
          {
            semester: 'Summer',
            year: 2021,
            courseHeading: "RTH 111",
            credits: 3,
            courseDetails: [
              {
                code: "RTH 111",
                name: "Anatomy and Physiology of the Cardiopulmonary System",
                plannedStatus: false,
                completedStatus: false
              }
            ]
          },
          {
            semester: 'Fall',
            year: 2019,
            courseHeading: "RTH 145",
            credits: 3,
            courseDetails: [
              {
                code: "RTH 145",
                name: "Pharmacology for Respiratory Care |",
                plannedStatus: true,
                completedStatus: false
              }
            ]
          }
        ],
        earnedCredits: 15
      },
      bachelorDegree: {
        id: "ca196b62-3460-409b-bbd9-1d3696f1165a",
        name: "B.S. Medical Laboratory Science",
        courses: [
          {
            semester: 'Spring',
            year: 2021,
            courseHeading: "Core Requirements",
            credits: 3,
            courseDetails: [
              {
                code: "BAS 300",
                name: "Building Professional Competencies",
                plannedStatus: true,
                completedStatus: false
              }
            ]
          },
          {
            semester: 'Summer',
            year: 2020,
            courseHeading: "Core Requirements",
            credits: 3,
            courseDetails: [
              {
                code: "SOCW 200",
                name: "Introduction to Social Work",
                plannedStatus: true,
                completedStatus: true
              }
            ]
          },
          {
            semester: 'Fall',
            year: 2019,
            courseHeading: "Core Requirements",
            credits: 3,
            courseDetails: [
              {
                code: "GCH 205",
                name: "Global Health",
                plannedStatus: false,
                completedStatus: false
              }
            ]
          },
          {
            semester: 'Spring',
            year: 2021,
            courseHeading: "Gen Ed: Quantitative Reasoning",
            credits: 3,
            courseDetails: [
              {
                code: "MATH 106",
                name: "Quantitative Reasoning",
                plannedStatus: true,
                completedStatus: true
              }
            ]
          },
          {
            semester: 'Summer',
            year: 2022,
            courseHeading: "Gen Ed: Literature",
            credits: 3,
            courseDetails: [
              {
                code: "Approved Literature Course",
                name: "",
                plannedStatus: false,
                completedStatus: false
              }
            ]
          },
          {
            semester: 'Fall',
            year: 2020,
            courseHeading: "Additional Conc. Requirements",
            credits: 3,
            courseDetails: [
              {
                code: "Additional Concentration Requirement",
                name: "",
                plannedStatus: true,
                completedStatus: true
              }
            ]
          },
          {
            semester: 'Spring',
            year: 2023,
            courseHeading: "Core Requirements",
            credits: 3,
            courseDetails: [
              {
                code: "NURUS 434",
                name: "Vulnerable Populations",
                plannedStatus: true,
                completedStatus: false
              }
            ]
          },
          {
            semester: 'Summer',
            year: 2021,
            courseHeading: "Gen Ed: Written Communication(UL)",
            credits: 3,
            courseDetails: [
              {
                code: "ENGH 302",
                name: "Advanced Composition",
                plannedStatus: true,
                completedStatus: true
              }
            ]
          },
          {
            semester: 'Spring',
            year: 2021,
            courseHeading: "Gen Ed: Natural lab Science",
            credits: 3,
            courseDetails: [
              {
                code: "Approved Natural lab Science Course",
                name: "",
                plannedStatus: true,
                completedStatus: false
              }
            ]
          },
          {
            semester: 'Fall',
            year: 2020,
            courseHeading: "Core Requirements",
            credits: 3,
            courseDetails: [
              {
                code: "BAS 490",
                name: "Inroduction to Research Methods",
                plannedStatus: true,
                completedStatus: true
              }
            ]
          },
        ],
        earnedCredits: 10
      }
    };

    return (studentProfileSkillsList);
  };

  private fakeStudentSkillsTranscriptData()
  {
    const studentSkillsTranscriptList: studentSkillsTranscriptModel[] =
      [
        {
          yearCompleted: 2020,
          courseCode: 'ENG 111',
          courseName: 'College Composition |',
          skillsDetails: [
            {
              skillName: 'Leadership',
              skillDefinition: "If you have a strongly held opinion that goes against the conventional wisdom of your industry or discipline, you are a prime candidate for some counter-narrative thought leadership content."
            },
            {
              skillName: 'Researching',
              skillDefinition: "If you’re doing to do content research right, you’ll need to the right apps, services, and resources at your disposal. Here are some that we recommend (and that will make applying the advice in this post easier)."
            },
            {
              skillName: 'Communication',
              skillDefinition: "The role of content in communication has seen astonishing growth in recent years. Separating itself from the basic production of articles, it now includes creating pieces that are visually pleasing, easy to understand and promote engagement with the audience."
            }
          ]
        },
        {
          yearCompleted: 2019,
          courseCode: 'PSY 230',
          courseName: 'Developmental Psycology',
          skillsDetails: [
            {
              skillName: 'Skills 1',
              skillDefinition: "Looking back to 1997 when our founder and CEO David Pembroke was exploring the idea of using content to communicate, he was met with some confusion."
            },
            {
              skillName: 'Skills 2',
              skillDefinition: "Our aim is to help the government and public sector strengthen communities and the well-belling of citizens through effective content communications."
            }
          ]
        },
        {
          yearCompleted: 2021,
          courseCode: 'BIO 141',
          courseName: 'Anatomy and Physiology |',
          skillsDetails: [
            {
              skillName: 'Leadership',
              skillDefinition: "It’s safe to say the 1990s weren’t the most technologically advanced, especially when you consider where we are today. But it was then that game changing moments were happening which would redesign how society functions."
            },
            {
              skillName: 'Skills 1',
              skillDefinition: "We saw the introduction Google, designed to replace encyclopedias; Amazon introduced online shopping, putting bookstores out of business globally."
            },
            {
              skillName: 'Skills 2',
              skillDefinition: "While the mammoth companies that built these industries found themselves stubbornly resisting change, thinking they were invincible, they let the goliath companies of today takeover."
            }
          ]
        },
        {
          yearCompleted: 2020,
          courseCode: 'SDV_',
          courseName: 'College Success Skills',
          skillsDetails: [
            {
              skillName: 'Skills 1',
              skillDefinition: 'Some of the most memorable blunders include Blockbuster laughing Netflix out the door saying the concept would never work, Yahoo refusing to buy Google for a measly million dollars and also failing to increase their billion-dollar bid for Facebook.'
            },
            {
              skillName: 'Skills 2',
              skillDefinition: 'It’s important to take these events into consideration – imagine which companies wouldn’t have gone bankrupt, and those who may still be flourishing if they had an accurate vision of the future.'
            },
            {
              skillName: 'Skills 3',
              skillDefinition: 'Instead they became satisfied with the idea they had the monopoly, without even considering the technology growing around them. The result of this was seeing the rug pulled out from under them.'
            }
          ]
        },
        {
          yearCompleted: 2020,
          courseCode: 'PHI 227',
          courseName: 'Biomedical Ethics',
          skillsDetails: [
            {
              skillName: 'Skills 1',
              skillDefinition: 'Into the 1990s and 2000s we saw the same thing happen with communications and the way we interacted with each other.'
            },
            {
              skillName: 'Skills 2',
              skillDefinition: 'While we have seen governments start to embrace technology and provide gateways for citizens to access their services (gov.au for example), they have, in ways, missed the mark. Across the internet there are millions of .gov URLs.'
            }
          ]
        }
      ];

    return (studentSkillsTranscriptList);
  }


}
