import { Component, OnInit } from '@angular/core';
import { NavigationService } from '@app/core/services/navigation/navigation.service';

@Component({
  selector: 'gmu-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.scss']
})
export class ManageStudentComponent implements OnInit
{

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void
  {

  }

  // ON STUDENT SEARCH - GO TO THE MANAGE STUDENT DETAILS PAGE
  onStudentSearch(searchTerm: string)
  {
    this.navigationService.goToManageStudentDetailsPage(searchTerm);
  }

}

