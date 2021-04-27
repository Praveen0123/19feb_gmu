import { Component, OnInit } from '@angular/core';
import { filter, takeWhile, map } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { NavLinkModel } from '@app/features/student-view/models/nav-links';
import { Pathway, Student } from '@gql';
import { PathwayFacadeService } from '@app/root-store/pathway-store/pathway-facade.service';
import { SkillsRoadmapModel } from '@app/root-store/student-skills-roadmap-store/skills-roadmap-state';
import { Observable, of } from 'rxjs';
import { SkillsRoadmapFacadeService } from '@app/root-store/student-skills-roadmap-store/skills-roadmap-facade.service';
import { StudentFacadeService } from '@app/root-store/student-store/student-facade.service';
import { NavigationService } from '@app/core/services/navigation/navigation.service';


@Component({
  selector: 'gmu-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.scss']
})
export class StudentViewComponent implements OnInit
{

  student$: Observable<Student>;
  role$: Observable<string>;

  private alive = true;


  description: string;
  navLinks: NavLinkModel[];

  selectedPathway: Pathway;


  constructor(private router: Router, private pathwayFacadeService: PathwayFacadeService,
    private SkillsRoadmapFacadeService: SkillsRoadmapFacadeService,
    private studentFacadeService: StudentFacadeService,
    private navigationService: NavigationService) { }

  ngOnInit(): void
  {
    this.role$ = of(localStorage.getItem('role'));
    this.student$ = this.studentFacadeService.getStudent();
    //this.skillRoadmap$ = this.SkillsRoadmapFacadeService.getskillRoadmapList();
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeWhile(() => this.alive),
        map((event: NavigationEnd) =>
        {
          this.buildNavLinks();
        })
      ).subscribe();

    this.pathwayFacadeService.getPathway()
      .pipe
      (
        takeWhile(() => this.alive),
        map((item: Pathway) =>
        {
          this.selectedPathway = item;
          this.buildNavLinks();
        })
      ).subscribe();

    this.studentFacadeService.getErrors()
      .pipe
      (
        takeWhile(() => this.alive),
        map((error: string) =>
        {
          if (error)
          {
            console.log('error');
            this.navigationService.goToCoachViewWithErrors();
          }
        })
      ).subscribe();
  }

  ngOnDestroy(): void
  {
    this.alive = false;
  }

  private buildNavLinks(): void
  {
    const skillsTranscriptRoute = '/student-view/student-view-skills-transcript';
    const skillsRoadmapRoute = `/student-view/student-view-skills-roadmap`;
    const skillsProfileRoute = '/student-view/student-view-skills-profile';
    const skillsMilestonesRoute = '/student-view/student-view-skills-milestones';
    const notesRoute = '/coach/notes';

    const navLinks: NavLinkModel[] = [
      {
        label: 'MILESTONES',
        path: skillsMilestonesRoute,
        icon: '',
        message: 'arrow-milestone',
        isActive: (skillsMilestonesRoute.includes(this.router.url))
      },
      {
        label: 'PLANNER',
        path: skillsProfileRoute,
        icon: '',
        message: 'arrow-profile',
        isActive: (skillsProfileRoute.includes(this.router.url))
      },
      {
        label: 'SKILLS ROADMAP',
        path: skillsRoadmapRoute,
        icon: '',
        message: 'arrow-roadmap',
        isActive: (skillsRoadmapRoute.includes(this.router.url))
      },
      {
        label: 'SKILLS TRANSCRIPT',
        path: skillsTranscriptRoute,
        icon: '',
        message: 'arrow-transcript',
        isActive: (skillsTranscriptRoute.includes(this.router.url))
      },
      // {
      //   label: 'NOTES',
      //   path: notesRoute,
      //   icon: '',
      //   message: '',
      //   isActive: (notesRoute.includes(this.router.url))
      // },
    ];

    this.navLinks = navLinks;
  }

  search(searchId: string)
  {
    console.log('searching');
    localStorage.setItem('searchId', searchId.trim());
    this.studentFacadeService.requestStudentDetails(searchId.trim());
  }

}
