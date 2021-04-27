import { Component, OnInit, Input } from '@angular/core';
import { Employer } from '@gql';

@Component({
  selector: 'gmu-employer-card',
  templateUrl: './employer-card.component.html',
  styleUrls: ['./employer-card.component.scss']
})
export class EmployerCardComponent implements OnInit
{
  @Input() ordinal: number;
  @Input() employer: Employer;


  constructor() { }

  ngOnInit(): void
  {
  }

}
