import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'gmu-mason-splash-page-video',
  templateUrl: './mason-splash-page-video.component.html',
  styleUrls: ['./mason-splash-page-video.component.scss']
})
export class MasonSplashPageVideoComponent implements OnInit
{

  welcomeVideoUrl: string;
  constructor(@Inject(MAT_DIALOG_DATA) private data: string) { }

  ngOnInit(): void
  {
    this.welcomeVideoUrl = this.data;
  }

}
