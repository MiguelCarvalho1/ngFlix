import { Component } from '@angular/core';
import {SliderComponent} from "../../components/slider/slider.component";
import {BannerComponent} from "../../components/banner/banner.component";
import {map, Observable} from "rxjs";
import {Movie} from "../../types/movie";
import {MovieService} from "../../services/movie.service";
import {AsyncPipe, CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {TvshowsService} from "../../services/tvshows.service";
import {mapToMovies} from "../../types/tvshow";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SliderComponent,
    BannerComponent,
    AsyncPipe,HttpClientModule, CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [MovieService, TvshowsService]
})
export class HomeComponent {
  popularMovies$: Observable<Movie[]> = this.movieService.fetchData('popular',12);
  upcomingMovies$: Observable<Movie[]> = this.movieService.fetchData('upcoming',12);
  topRatedMovies$: Observable<Movie[]> = this.movieService.fetchData('top_rated',12);
  popularTvshows$ = this.tvshowsService
    .fetchData('popular', 12)
    .pipe(map(mapToMovies));


  constructor(private movieService: MovieService, private tvshowsService: TvshowsService) {}


}
