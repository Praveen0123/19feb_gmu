import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Pathway, PlannerGrouping, PlannerCourse, StudentCourseInput, Student } from '@gql';

@Component({
  selector: 'gmu-skills-view',
  templateUrl: './skills-view.component.html',
  styleUrls: ['./skills-view.component.scss']
})
export class SkillsViewComponent implements OnInit, OnChanges
{

  @Output() courseUpdateEventEmitter = new EventEmitter<StudentCourseInput>();
  @Input() courseGroupings: PlannerGrouping[];
  @Input() student: Student;
  @Input() skillType;
  totalCredits: number = 0;
  earnedCredits: number = 0;
  yearList: any[] = [];
  flatCourses: PlannerCourse[];
  degreeName: string;

  cohortYear: number;

  constructor() { }

  ngOnInit(): void
  {
    this.init();
  }


  ngOnChanges(changes: SimpleChanges)
  {
    if (changes.courseGroupings && !changes.courseGroupings.firstChange)
    {
      this.init();
    }
  }

  init()
  {
    //console.log(this.courseGroupings);
    this.cohortYear = parseInt(this.student.cohortYear.substring(0, 4), 10);
    this.flatCourses = this.courseGroupings.reduce((acc, item) => [...acc, ...item?.courseList ?? []], []);
    this.totalCredits = this.flatCourses.filter(x => x.completed || x.planned).reduce((accumulaor, item) => accumulaor + item.credits, 0);
    this.earnedCredits = this.flatCourses.filter(x => x.completed).reduce((accumulaor, item) => accumulaor + item.credits, 0);
    this.getYearList();
    this.degreeName = (this.skillType === 'NOVA') ? this.student?.pathway?.associateDegree?.name : this.student?.pathway?.bachelorDegree?.name;
    //console.log(this.degreeName);
  }
  getYearList()
  {
    this.yearList = [];
    const date = new Date();
    const year = date.getFullYear();
    for (let i = Math.max(year - 4, this.cohortYear, 2018); i < (year + 6); i++)
    {
      this.yearList.push({ year: i });
    }
  }
  getYear(courseGrouping: PlannerGrouping)
  {
    let course = courseGrouping?.courseList?.find(x => x.completed);
    if (!course)
    {
      course = courseGrouping?.courseList?.find(x => x.planned);
    }
    if (!course)
    {
      course = courseGrouping?.courseList?.find(x => x.year != null);
    }
    //console.log(`year: ${course?.year}`);
    return (course?.year) ? parseInt(course.year, 10) : courseGrouping.year + this.getCohortYear() - 1;
  }
  getSemester(courseGrouping: PlannerGrouping)
  {
    return courseGrouping?.courseList?.find(x => x.semester != null)?.semester;
  }
  updateYear(courseGrouping: PlannerGrouping, year)
  {
    console.log(year);
    for (const course of courseGrouping.courseList)
    {
      const input: StudentCourseInput = {
        id: course.plannerId,
        studentId: this.student?.id,
        courseId: course.id,
        groupingId: courseGrouping.id,
        semester: course.semester || 'Fall',
        year: year.value,
        schoolYear: this.setSchoolYear(year.value, course.semester),
        planned: course.planned,
        completed: course.completed
      };
      this.courseUpdateEventEmitter.emit(input);
    }
  }

  updateSemester(courseGrouping: PlannerGrouping, semester)
  {
    //console.log('semester: ' + semester.value);
    for (const course of courseGrouping.courseList)
    {
      const year = this.getSchoolYear(course.year, courseGrouping.year);
      const input: StudentCourseInput = {
        id: course.plannerId,
        studentId: this.student?.id,
        courseId: course.id,
        groupingId: courseGrouping.id,
        semester: semester.value || 'Fall',
        year,
        schoolYear: this.setSchoolYear(year, semester.value),
        planned: course.planned,
        completed: course.completed
      };
      this.courseUpdateEventEmitter.emit(input);
    }
  }

  updateCoursePlan(plannerId: string)
  {
    const grouping = this.courseGroupings.find(group => group.courseList.find(crs => crs.plannerId === plannerId));
    const course = grouping.courseList.find(crs => crs.plannerId === plannerId);
    const year = this.getSchoolYear(course.year, grouping.year);
    const input: StudentCourseInput = {
      id: course.plannerId,
      studentId: this.student?.id,
      courseId: course.id,
      groupingId: grouping.id,
      semester: course.semester || 'Fall',
      year,
      schoolYear: this.setSchoolYear(year, course.semester),
      planned: !(course.planned || false),
      completed: course.completed
    };
    this.courseUpdateEventEmitter.emit(input);
  }

  updateCourseCompleted(plannerId: string)
  {
    //console.log(`called with id ${plannerId}`);
    const grouping = this.courseGroupings.find(group => group.courseList.find(crs => crs.plannerId === plannerId));
    const course = grouping.courseList.find(crs => crs.plannerId === plannerId);
    const year = this.getSchoolYear(course.year, grouping.year);
    const input: StudentCourseInput = {
      id: course.plannerId,
      studentId: this.student?.id,
      courseId: course.id,
      groupingId: grouping.id,
      semester: course.semester || 'Fall',
      year,
      schoolYear: this.setSchoolYear(year, course.semester),
      planned: course.planned,
      completed: !(course.completed || false)
    };
    //console.log(input);
    this.courseUpdateEventEmitter.emit(input);
  }
  getSchoolYear(courseYear, groupingYear)
  {
    return (courseYear != null) ? parseInt(courseYear, 10) : groupingYear + this.getCohortYear() - 1;
  }

  getCohortYear()
  {
    const year = parseInt(this.student?.cohortYear.substring(0, 4), 10);
    return isNaN(year) ? new Date().getFullYear() : year;
  }

  setSchoolYear(courseYear: number, courseSemester: string)
  {
    let schoolYear = courseYear - this.cohortYear;
    if (courseSemester === 'Fall' || !courseSemester)
    {
      schoolYear++;
    }
    return schoolYear;
  }
}
