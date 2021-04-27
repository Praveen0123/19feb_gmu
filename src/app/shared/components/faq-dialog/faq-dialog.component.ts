import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'gmu-faq-dialog',
  templateUrl: './faq-dialog.component.html',
  styleUrls: ['./faq-dialog.component.scss']
})
export class FaqDialogComponent implements OnInit
{

  faqList: Faq[] = [
    {
      question: "Why aren't all my courses visible on the course planner?",
      answer: "The ADVANCE Toolkit is still under development.  We currently only display courses that meet the exact planner requirements for a pathway."
    },
    {
      question: "My courses are not showing up on the roadmap",
      answer: "We currently only show courses that have begun after enrollment in the ADVANCE program."
    },
    {
      question: "Why can't I select electives?",
      answer: "The ADVANCE Toolkit is still under development.  We plan on providing full course functionality at a later date."
    }
  ];
  constructor(
    public dialog: MatDialogRef<FaqDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void
  {
  }
  closeDialogBox(event: MouseEvent)
  {
    this.dialog.close();
  }
}

export interface Faq
{
  question: string;
  answer: string;
}