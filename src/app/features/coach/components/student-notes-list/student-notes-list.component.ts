import { Component, Input, OnInit } from '@angular/core';
import { Note } from '@gql';

@Component({
  selector: 'gmu-student-notes-list',
  templateUrl: './student-notes-list.component.html',
  styleUrls: ['./student-notes-list.component.scss']
})
export class StudentNotesListComponent implements OnInit
{

  @Input() notes: Note[];
  constructor() { }

  ngOnInit(): void
  {
  }

}
