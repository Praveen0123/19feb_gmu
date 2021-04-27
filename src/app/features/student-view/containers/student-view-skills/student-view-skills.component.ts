import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { NavLinkModel } from '../../models/nav-links/nav-links.model';
import { Router } from '@angular/router';

@Component({
  selector: 'gmu-student-view-skills',
  templateUrl: './student-view-skills.component.html',
  styleUrls: ['./student-view-skills.component.scss']
})
export class StudentViewSkillsComponent implements OnInit, OnChanges
{


  @Input() navLinks: NavLinkModel[];
  arrowClass: string;

  constructor(public router: Router) { }

  ngOnInit(): void
  {
    this.arrowClass = this.navLinks.find(x => x.isActive)?.message;
  }

  ngOnChanges(changes: SimpleChanges)
  {
    this.arrowClass = this.navLinks.find(x => x.isActive)?.message;
  }

  trackByFn(index, item)
  {
    return index; // or item.id
  }

}
