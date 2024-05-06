import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-video-embed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-embed.component.html',
  styleUrl: './video-embed.component.css'
})
export class VideoEmbedComponent implements OnInit{
  @Input() key: string | null = null;

  videoUrl: SafeResourceUrl = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + this.key
    );
  }

}
