import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '@app/core/services/navigation/navigation.service';

@Component({
  selector: 'gmu-student-not-found',
  templateUrl: './student-not-found.component.html',
  styleUrls: ['./student-not-found.component.scss']
})
export class StudentNotFoundComponent implements OnInit
{

  @Input() route: string;
  constructor(private router: Router, private navigationService: NavigationService) { }

  ngOnInit(): void
  {
  }
  goToSearchStudent()
  {
    if (this.route)
    {
      this.router.navigate([this.route]);
    }
    //GO TO STUDENT SEARCH PAGE
    this.navigationService.goToManageStudentPage();
  }

}
