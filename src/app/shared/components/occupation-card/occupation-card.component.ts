import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CONFIG } from '@env/config';
import { Occupation, Pathway, Skill } from '@gql';
import { PathwayService } from '@app/root-store/pathway-store/pathway.service';
import { SkillTypeEnum } from '@app/root-store/pathway-store/pathway.state';

@Component({
  selector: 'gmu-occupation-card',
  templateUrl: './occupation-card.component.html',
  styleUrls: ['./occupation-card.component.scss']
})
export class OccupationCardComponent implements OnInit, OnChanges
{
  @Input() occupation: Occupation;
  @Input() pathway: Pathway;
  @Input() showSkills: boolean = false;

  imageUrl: string;
  salary?: number;

  essentialSkillList: Skill[];
  technicalSkillList: Skill[];

  constructor() { }

  ngOnInit(): void
  {
    this.buildDisplayData();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if (changes.occupation && !changes.occupation.firstChange)
    {
      this.buildDisplayData();
    }
  }

  private buildDisplayData()
  {
    this.imageUrl = `${CONFIG.IMAGES.ONET_BASE_URL}${this.occupation.imageName}`;
    this.salary = this.occupation.preferredSalary?.medianSalaryPerYear;
    if (this.showSkills && this.occupation && this.occupation.skills)
    {
      this.essentialSkillList = this.occupation.skills.filter(x => x.type === 'BaseLine Skill');
      this.technicalSkillList = this.occupation.skills.filter(x => x.type === 'Specialized Skill');
    }
  }

}


