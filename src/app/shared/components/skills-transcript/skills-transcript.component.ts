import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  GoogleAnalyticsService,
  IGoogleAnalyticEvent,
} from '@app/core/services/google-analytics/google-analytics.service';
import { studentSkillsTranscriptModel } from '@app/root-store/student-profile-store/student-profile.state';
import { PlannerCourse, Student } from '@gql';

@Component({
  selector: 'gmu-skills-transcript',
  templateUrl: './skills-transcript.component.html',
  styleUrls: ['./skills-transcript.component.scss'],
})
export class SkillsTranscriptComponent implements OnInit, OnChanges {
  show: boolean = false;
  allArrayValue = new Array();
  @Input() student: Student;
  filteredCourses: PlannerCourse[];
  constructor(private gas: GoogleAnalyticsService) {}

  ngOnInit(): void {
    this.filteredCourses = this.student?.courses?.filter(
      (x) => x.completed && x.skillList?.length > 0
    );
    this.filteredCourses?.sort((x, y) => (x.year > y.year ? 1 : -1));
  }

  ngOnChanges(changes: SimpleChanges) {
    this.filteredCourses = this.student?.courses?.filter(
      (x) => x.completed && x.skillList?.length > 0
    );
    this.filteredCourses?.sort((x, y) =>
      x.year + x.code > y.year + y.code ? 1 : -1
    );
  }
  onPrintClick() {
    // GOOGLE ANALYTICS
    const googleAnalyticEvent: IGoogleAnalyticEvent = {
      eventName: 'event',
      eventCategory: 'Skills Transcript',
      eventAction: 'Print Transcript Button Clicked',
      eventLabel: 'Skills Transcript Page',
      eventValue: null,
    };

    this.gas.emitEvent(googleAnalyticEvent);
  }

  showHide() {
    this.show = !this.show;
  }

  update() {
    let x = document.getElementsByTagName('textarea');

    for (let i = 0; i < x.length; i++) {
      this.allArrayValue[i] = document.getElementsByTagName('textarea')[
        i
      ].value;
    }
    console.log(this.allArrayValue, 'array value');
  }
}
