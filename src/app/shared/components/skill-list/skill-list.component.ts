import { Component, OnInit, Input, Output, EventEmitter, HostBinding, OnChanges, SimpleChanges } from '@angular/core';
import { Skill } from '@gql';
import { PathwayService } from '@app/root-store/pathway-store/pathway.service';


@Component({
  selector: 'gmu-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.scss']
})
export class SkillListComponent implements OnInit, OnChanges
{
  @Input() title: string;
  @Input() subTitle: string;
  @Input() topX: number;
  @Input() skillList: Skill[];
  @Input() acquiredSkills: Set<string>;
  @Output('onClickSkill') skillSlickEventEmitter = new EventEmitter<Skill>();

  @HostBinding('class.has-skills-as-links') @Input() displaySkillsAsLinks: boolean = false;

  skillListToDisplay: Skill[];
  completedSkills: Skill[];
  progressSkills: Skill[];
  gridClass: string;

  constructor() { }

  ngOnInit(): void
  {
    this.displaySkillsAsLinks = (this.displaySkillsAsLinks === undefined) ? false : this.displaySkillsAsLinks;
    this.initGridClasses();
    this.sortSkillList();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if (changes.areSkillsDisplayedInGrid && !changes.areSkillsDisplayedInGrid.firstChange)
    {
      this.initGridClasses();
    }

    if (changes.skillList && !changes.skillList.firstChange)
    {
      this.sortSkillList();
    }
  }

  onClickSkill(skillModel: Skill)
  {
    if (this.skillSlickEventEmitter.observers.length > 0)
    {
      this.skillSlickEventEmitter.emit(skillModel);
    }
  }

  private initGridClasses()
  {
    this.gridClass = (this.displaySkillsAsLinks) ? 'grid-x grid-margin-x' : 'grid-x grid-margin-x grid-margin-y';
  }

  private sortSkillList()
  {
    if (this.skillList)
    {
      const sortedSkillsList: Skill[] = PathwayService.quickSortByDemandLevel(this.skillList);
      this.skillListToDisplay = (this.topX && this.topX > 0) ? sortedSkillsList.slice(0, this.topX) : sortedSkillsList;
      if (this.acquiredSkills != null)
      {
        this.completedSkills = this.skillListToDisplay.filter(x => this.acquiredSkills.has(x.label));
        this.progressSkills = this.skillListToDisplay.filter(x => !this.acquiredSkills.has(x.label));
      }
    }
    else
    {
      this.skillListToDisplay = undefined;
    }
  }

}
