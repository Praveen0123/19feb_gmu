import { Component, OnInit, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { NavigationService } from '@app/core/services/navigation/navigation.service';
import { Observable } from 'rxjs';
import { Coach, Pathway, Student, StudentInput } from '@gql';
import { StudentFacadeService } from '@app/root-store/student-store/student-facade.service';
import { PathwayFacadeService } from '@app/root-store/pathway-store/pathway-facade.service';
import { ActivatedRoute } from '@angular/router';
import { CoachFacadeService } from '@app/root-store/coach-store/coach-facade.service';
import { map, take } from 'rxjs/operators';


@Component({
  selector: 'gmu-manage-student-details',
  templateUrl: './manage-student-details.component.html',
  styleUrls: ['./manage-student-details.component.scss']
})
export class ManageStudentDetailsComponent implements OnInit, OnDestroy, OnChanges
{
  studentID: string;
  pathwayList$: Observable<Pathway[]>;
  student$: Observable<Student>;
  coachList$: Observable<Coach[]>;
  constructor(
    private navigationService: NavigationService,
    private pathwayFacadeService: PathwayFacadeService,
    private studentFacadeService: StudentFacadeService,
    private coachFacadeService: CoachFacadeService,
    private route: ActivatedRoute
  ) { }



  ngOnInit(): void
  {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    this.init();
  }

  init()
  {
    this.pathwayList$ = this.pathwayFacadeService.getPathwayList();
    this.student$ = this.studentFacadeService.getStudent();
    this.coachList$ = this.coachFacadeService.getCoachList();
  }

  ngOnDestroy(): void
  {
    this.studentFacadeService.requestClearSelectedStudents();
  }

  // ON FORM SUBMIT SEND STUDENT DETAILS TO SERVER
  onStudentFormSubmit(student: StudentInput)
  {
    this.studentFacadeService.requestToSaveStudentForm(student);
  }

  // SEARCH FOR STUDENT DETAILS
  onStudentSearch(searchTerm: string)
  {
    this.navigationService.goToManageStudentDetailsPage(searchTerm);
  }


}
