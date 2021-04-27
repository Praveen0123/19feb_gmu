import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

import { Skill } from '@gql';


@Component({
  selector: 'gmu-degree-details-skill-definition',
  templateUrl: './degree-details-skill-definition.component.html',
  styleUrls: ['./degree-details-skill-definition.component.scss']
})
export class DegreeDetailsSkillDefinitionComponent implements OnInit
{
  constructor
    (
      @Inject(MAT_BOTTOM_SHEET_DATA) public data: Skill,
      private bottomSheetRef: MatBottomSheetRef<DegreeDetailsSkillDefinitionComponent>
    ) { }

  ngOnInit(): void
  {
  }

  // FOR CLOSING THE BOTTOMSHEET
  afterCloseSheet(event: MouseEvent): void
  {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
