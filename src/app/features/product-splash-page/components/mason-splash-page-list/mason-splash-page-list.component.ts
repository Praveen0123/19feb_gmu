import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CONFIG } from '@env/config';
import { ConnectWithVpInput } from '@gql';
import { GetToKnowPopupComponent } from '../get-to-know-popup/get-to-know-popup.component';
import { MasonSplashPageVideoComponent } from '../mason-splash-page-video/mason-splash-page-video.component';

export interface dataModel
{
  imgPath?: string;
  Lable?: string;
  Description: string;
}

@Component({
  selector: 'gmu-mason-splash-page-list',
  templateUrl: './mason-splash-page-list.component.html',
  styleUrls: ['./mason-splash-page-list.component.scss']
})
export class MasonSplashPageListComponent implements OnInit
{
  @Output('onButtonClick') splashPageClickEventEmitter = new EventEmitter<string>();
  @Output('onFormSubmit') formSubmitEventEmitter = new EventEmitter<ConnectWithVpInput>();
  videoUrl: string = CONFIG.MESSAGING.HOME.WELCOME_VIDEO_URL;

  novaIcon: string;
  gmuIcon: string;
  vpIcon: string;
  bgIcon: string;
  digitalSkill: string;
  advancedLogo: string;
  academicPathway: string;
  topSkillIcon: string;
  careerPathwayIcon: string;
  stellarSkillIcon: string;
  degreeMapIcon: string;
  skillMappingIcon: string;
  computerSkillIcon: string;
  skillfocusBg: string;
  planningIcon: string;
  roadmapIcon: string;
  skillTranscript: string;
  integrationIcon: string;
  milestoneIcon: string;
  digital_wallet: string;
  student_skill: string;
  learning: string;
  student_inside: string;
  novaIconNColor: string;
  gmuLogoColor: string;
  vpIconColor: string;
  novaIconColor: string;
  gmuLogoNColor: string;
  vpIconNColor: string;
  bgIconColor: string;
  bgIconNColor: string;

  detailsList: string[] = [];
  platforms: string[] = [];
  coaching: dataModel[] = [];
  futures: dataModel[] = [];
  skillFocus: dataModel[] = [];


  constructor(private dialog: MatDialog) { }

  ngOnInit(): void
  {

    this.novaIcon = CONFIG.IMAGES.SPLASH_PAGE.NOVA_ICON;
    this.novaIconNColor = this.novaIcon;


    this.gmuIcon = CONFIG.IMAGES.SPLASH_PAGE.GMU_ICON;
    this.gmuLogoNColor = this.gmuIcon;

    this.vpIcon = CONFIG.IMAGES.SPLASH_PAGE.VP_LOGO;
    this.vpIconNColor = this.vpIcon;

    this.bgIcon = CONFIG.IMAGES.SPLASH_PAGE.BG_LOGO;
    this.bgIconNColor = this.bgIcon;

    this.novaIconColor = CONFIG.IMAGES.SPLASH_PAGE.NOVA_COLOR;
    this.gmuLogoColor = CONFIG.IMAGES.SPLASH_PAGE.GMU_COLOR;
    this.vpIconColor = CONFIG.IMAGES.SPLASH_PAGE.VP_COLOR;
    this.bgIconColor = CONFIG.IMAGES.SPLASH_PAGE.BG_COLOR;
    this.digitalSkill = CONFIG.IMAGES.SPLASH_PAGE.DIGITAL_SKILL;
    this.advancedLogo = CONFIG.IMAGES.SPLASH_PAGE.ADVANCED_LOGO;
    this.academicPathway = CONFIG.IMAGES.SPLASH_PAGE.ACADEMIC_PATHWAY;
    this.topSkillIcon = CONFIG.IMAGES.SPLASH_PAGE.TOP_SKILLS;
    this.careerPathwayIcon = CONFIG.IMAGES.SPLASH_PAGE.CAREER_PATHWAY;
    this.stellarSkillIcon = CONFIG.IMAGES.SPLASH_PAGE.STELLAR_SKILLS;
    this.computerSkillIcon = CONFIG.IMAGES.SPLASH_PAGE.COMPUTER_SKILL;
    this.degreeMapIcon = CONFIG.IMAGES.SPLASH_PAGE.DEGREE_MAP;
    this.skillMappingIcon = CONFIG.IMAGES.SPLASH_PAGE.SKILL_MAPPING;
    this.skillfocusBg = CONFIG.IMAGES.SPLASH_PAGE.SKILL_FOCUS_BG;
    this.planningIcon = CONFIG.IMAGES.SPLASH_PAGE.PLANNING;
    this.milestoneIcon = CONFIG.IMAGES.SPLASH_PAGE.MILESTONES;
    this.roadmapIcon = CONFIG.IMAGES.SPLASH_PAGE.ROADMAP;
    this.skillTranscript = CONFIG.IMAGES.SPLASH_PAGE.SKILL_TRANSCRIPT;
    this.integrationIcon = CONFIG.IMAGES.SPLASH_PAGE.INTEGRATION;
    this.student_skill = CONFIG.IMAGES.SPLASH_PAGE.STUDENT_SKILL;
    this.digital_wallet = CONFIG.IMAGES.SPLASH_PAGE.DIGITAL_WALLET;
    this.learning = CONFIG.IMAGES.SPLASH_PAGE.LEARNING;
    this.student_inside = CONFIG.IMAGES.SPLASH_PAGE.STUDENT_INSIGHT;
    this.buildDetails();
  }

  private buildDetails()
  {


    this.detailsList = [
      'Relate your academic programs to the labor market',
      'Translate Courses into Skills ',
      'Digitally Confer Skills and Credentials',
      'Help Student Plan and Persist',
      'Provide Academic Coaching'
    ];

    this.platforms = [
      'Human Interaction + AI to transform and manage courses and skills',
      'Personalized student skills roadmap and skills transcript',
      'Student preparation for internships and post-graduate interviews',
      'Tools for students to help plan and encourage persistence',
      'Enablement of academic coaching'
    ];

    this.coaching = [
      { Lable: 'Engage', Description: 'Academic coaches are enabled to visually track and engage with students about key program milestones.' },
      { Lable: 'Assist', Description: 'Coaches and students both have access to a student’s visual course planner to have relevant conversations about courses loads, course requirements, and personal demands to help ensure academic success.' },
      { Lable: 'Encourage', Description: 'Persistence is encouraged visually with the Skills Roadmap, empowering coaches to encourage students to continue toward their academic goals and career aspirations.' },
      { Lable: 'Guide', Description: 'The Skills Transcript provides a list of skills and definitions acquired through course work, aiding Career Coaches counsel toward students’ resume creation and mock-interview sessions.' },
    ];

    this.futures = [
      { imgPath: this.digital_wallet, Description: 'In 2021, we plan to enhance the ADVANCE Toolkit with a blockchain infrastructure. We will provide our students and graduates a Learning and Employment Record (LER)-compliant wallet enabling a foundation for lifelong learning.' },
      { imgPath: this.student_skill, Description: 'Students: With each completed course, students acquire trusted skills, digitally signed by George Mason or NOVA.' },
      { imgPath: this.learning, Description: 'Promote lifelong learning through micro-credentials, using nudges and notifications geared toward our graduates, encouraging them keep their skills current through micro-credentials and tailored courses.' },
      { imgPath: this.student_inside, Description: 'Industry: Trusted insight into student’s abilities conferred by George Mason or NOVA.' }
    ];

    this.skillFocus = [
      { imgPath: this.computerSkillIcon, Description: 'Skill management is accomplished through Artificial Intelligence and faculty curation.' },
      { imgPath: this.degreeMapIcon, Description: 'Our platform consumes degree maps, course descriptions, and course syllabi to extract and present relevant in demand skills.' },
      { imgPath: this.skillMappingIcon, Description: 'Faculty can modify skill mappings and skill definitions in real-time, creating expert-verified course to skill mappings.' },

    ];
  }

  onLearnMoreClick(el: HTMLElement)
  {
    // GOOGLE ANALYTICS
    const eventType: string = 'Learn More';
    this.splashPageClickEventEmitter.emit(eventType);

    el.scrollIntoView();
  }

  onGetToKnowUsClick()
  {
    // GOOGLE ANALYTICS
    const eventType: string = 'Get To Know Us';
    this.splashPageClickEventEmitter.emit(eventType);

    // OPEN GET TO KNOW POP-UP
    const dialogRef = this.dialog.open(GetToKnowPopupComponent, {
      panelClass: 'get_to_know_popup',
      autoFocus: false
    }).afterClosed().subscribe(
      (connectWithVP: ConnectWithVpInput) =>
      {
        if (connectWithVP)
        {
          this.formSubmitEventEmitter.emit(connectWithVP);
        }
      }
    );
  }

  onConnectWithUsClick()
  {
    // GOOGLE ANALYTICS
    const eventType: string = 'Connect With Us';
    this.splashPageClickEventEmitter.emit(eventType);

    // OPEN GET TO KNOW POP-UP
    const dialogRef = this.dialog.open(GetToKnowPopupComponent, {
      panelClass: 'get_to_know_popup',
      autoFocus: false
    }).afterClosed().subscribe(
      (connectWithVP: ConnectWithVpInput) =>
      {
        if (connectWithVP)
        {
          this.formSubmitEventEmitter.emit(connectWithVP);
        }
      }
    );
  }

  onExploreClick()
  {
    // GOOGLE ANALYTICS
    const eventType: string = 'Explore Advance';
    this.splashPageClickEventEmitter.emit(eventType);

    window.open('https://acat.advancesuccess.gmu.edu/');
  }

  onWatchVideoClick()
  {
    // GOOGLE ANALYTICS
    const eventType: string = 'Watch Video';
    this.splashPageClickEventEmitter.emit(eventType);

    const dialogRef1 = this.dialog.open(MasonSplashPageVideoComponent, {
      data: this.videoUrl,
      panelClass: 'splash_page_video',
    });
  }


}
