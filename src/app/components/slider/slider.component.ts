import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { MovieService } from "../../services/movie.service";
import { imagesBaseUrl } from "../../constants/images-size";
import { animate, transition, trigger, state, style } from "@angular/animations";


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

  constructor(private movieService: MovieService) {}

  movies$ = this.movieService.fetchData('popular');

  imagesBaseUrl = imagesBaseUrl;

  slideIndex = 0;

  ngOnInit() {
    this.changeSlide();
  }

  changeSlide() {
    setInterval(() => {
      this.slideIndex += 1;
      if (this.slideIndex > 10) {
        this.slideIndex = 0;
      }
    }, 5000);
  }
}



