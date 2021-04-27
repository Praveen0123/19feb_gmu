import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { DegreeDetailsSkillDefinitionComponent } from '../degree-details-skill-definition/degree-details-skill-definition.component';
import { SkillTypeEnum } from '@app/root-store/pathway-store/pathway.state';
import { Pathway, Skill } from '@gql';
import { PathwayService } from '@app/root-store/pathway-store/pathway.service';


@Component({
  selector: 'gmu-degree-details-top-skills',
  templateUrl: './degree-details-top-skills.component.html',
  styleUrls: ['./degree-details-top-skills.component.scss']
})
export class DegreeDetailsTopSkillsComponent implements OnInit, OnChanges
{
  @Input() pathway: Pathway;

  essentialSkillList: Skill[];
  technicalSkillList: Skill[];

  constructor
    (
      private bottomSheet: MatBottomSheet
    ) { }

  ngOnInit(): void
  {
    this.buildSkillLists();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if (changes.pathway && !changes.pathway.firstChange)
    {
      this.buildSkillLists();
    }
  }

  openBottomSheet(skillModel: Skill): void
  {
    this.bottomSheet.open(DegreeDetailsSkillDefinitionComponent,
      {
        data: skillModel,
        panelClass: 'skill-definition-bottom-sheet'
      });
  }

  private buildSkillLists()
  {
    if (this.pathway && this.pathway.skills)
    {
      this.essentialSkillList = PathwayService.findSkillsBySkillType(this.pathway.skills, SkillTypeEnum.Essential);
      this.technicalSkillList = PathwayService.findSkillsBySkillType(this.pathway.skills, SkillTypeEnum.Technical);
    }
  }
}
