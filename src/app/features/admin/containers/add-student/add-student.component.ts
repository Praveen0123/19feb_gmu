import { Component, OnInit } from '@angular/core';
import { PathwayFacadeService } from '@app/root-store/pathway-store/pathway-facade.service';
import { CoachFacadeService } from '@app/root-store/coach-store/coach-facade.service';
import { Coach, Pathway, StudentInput } from '@gql';
import { Observable } from 'rxjs';
import { StudentFacadeService } from '@app/root-store/student-store/student-facade.service';

@Component({
  selector: 'gmu-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit
{

  pathwayList$: Observable<Pathway[]>;
  coachList$: Observable<Coach[]>;

  constructor(
    private pathwayFacadeService: PathwayFacadeService,
    private coachFacadeService: CoachFacadeService,
    private studentFacadeService: StudentFacadeService
  ) { }

  onStudentFormSubmit(studentInput: StudentInput)
  {
    this.studentFacadeService.requestToSaveStudentForm(studentInput);
  }

  ngOnInit(): void
  {
    this.coachFacadeService.requestCoachList();
    this.pathwayList$ = this.pathwayFacadeService.getPathwayList();
    this.coachList$ = this.coachFacadeService.getCoachList();
  }

}
