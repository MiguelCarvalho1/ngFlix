import {Component, Input, OnInit} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { MovieService } from "../../services/movie.service";
import { imagesBaseUrl } from "../../constants/images-size";
import { animate, transition, trigger, state, style } from "@angular/animations";
import {Movie} from "../../types/movie";


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  imports: [HttpClientModule, CommonModule],
  styleUrls: ['./slider.component.css'],
  providers: [MovieService],
  standalone: true,
  animations: [
    trigger('slideFade', [
      state('void', style({opacity: 0})),
      transition('void <=> *', [animate('1s')]),
    ]),
  ]
})
export class SliderComponent implements OnInit {

  @Input() slides : Movie[] = [];
  @Input() isHeader = false;

  constructor() {}





  slideIndex = 0;

  ngOnInit() {
    if(!this.isHeader) {
      this.changeSlide();
    }

  }

  changeSlide() {
    setInterval(() => {
      this.slideIndex += 1;
      if (this.slideIndex > 10) {
        this.slideIndex = 0;
      }
    }, 5000);
  }

  protected readonly imagesBaseUrl = imagesBaseUrl;
}



