import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

import { Occupation, Skill, Pathway } from '@gql';
import { PathwayService } from '@app/root-store/pathway-store/pathway.service';
import { SkillTypeEnum } from '@app/root-store/pathway-store/pathway.state';
import { DegreeDetailsSkillDefinitionComponent } from '@app/features/home/components/degree-details-skill-definition/degree-details-skill-definition.component';
import { CONFIG } from '@env/config';
import { MatBottomSheet } from '@angular/material/bottom-sheet';


@Component({
  selector: 'gmu-roadmap-small',
  templateUrl: './roadmap-small.component.html',
  styleUrls: ['./roadmap-small.component.scss']
})
export class RoadmapSmallComponent implements OnInit
{
  @Input() occupationProfileDetails: Occupation;
  @Input() selectedPathway: Pathway;

  topSkillsDescription: string = CONFIG.MESSAGING.OCCUPATIONS.DESCRIPTIONS.TOP_SKILLS;
  skillListYear1: Skill[];
  skillListYear2: Skill[];
  skillListYear3: Skill[];
  skillListYear4: Skill[];

  constructor
    (
      private bottomSheet: MatBottomSheet
    ) { }

  ngOnInit(): void
  {
    if (!this.selectedPathway && this.occupationProfileDetails && this.occupationProfileDetails.pathways && this.occupationProfileDetails.pathways.length > 0)
    {
      this.selectedPathway = this.occupationProfileDetails.pathways[0];
    }

    this.buildSkillLists();
  }

  ngOnChanges(changes: SimpleChanges): void
  {
    if (changes.selectedPathway && !changes.selectedPathway.firstChange)
    {
      this.buildSkillLists();
    }
  }

  buildSkillLists(): void
  {
    if (this.selectedPathway?.skillsByYear)
    {
      this.skillListYear1 = this.selectedPathway.skillsByYear.find(x => x.year === 1)?.skillList;
      this.skillListYear2 = this.selectedPathway.skillsByYear.find(x => x.year === 2)?.skillList;
      this.skillListYear3 = this.selectedPathway.skillsByYear.find(x => x.year === 3)?.skillList;
      this.skillListYear4 = this.selectedPathway.skillsByYear.find(x => x.year === 4)?.skillList;
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

}
