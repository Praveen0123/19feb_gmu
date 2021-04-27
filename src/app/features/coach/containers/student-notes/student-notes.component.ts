import { Component, OnInit } from '@angular/core';
import { Note } from '@gql';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'gmu-student-notes',
  templateUrl: './student-notes.component.html',
  styleUrls: ['./student-notes.component.scss']
})
export class StudentNotesComponent implements OnInit
{


  notes$: Observable<Note[]>;
  constructor() { }

  ngOnInit(): void
  {
    this.notes$ = of([{ id: '1234', parentId: '12345', body: 'hello world', lastModifiedDate: '2020' },
    { id: '1235', parentId: '12345', body: 'line 2', lastModifiedDate: '2021' }]);
  }

}
