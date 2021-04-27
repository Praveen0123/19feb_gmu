import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'gmu-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit
{
  @Input() videoUrl: string = '';
  @Input() posterUrl: string = '';
  @ViewChild('videoPlay') private videoPlay: ElementRef;

  playVideo = false;
  safeURL: SafeResourceUrl;
  isYouTubeVideo: boolean = false;

  constructor
    (
      private _sanitizer: DomSanitizer
    )
  {

  }

  ngOnInit(): void
  {
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
    this.isYouTubeVideo = (this.videoUrl) ? this.videoUrl.includes('youtube') : false;
  }

  playVideos()
  {
    this.playVideo = !this.playVideo;

    setTimeout(() =>
    {
      this.playPause();
    }, 1000);
  }

  playPause()
  {
    const video: HTMLVideoElement = this.videoPlay.nativeElement;

    if (video.paused)
    {
      video.play();
    }
    else
    {
      video.pause();
    }
  }

  videoHasEnd()
  {
    this.playVideo = false;
  }
}
