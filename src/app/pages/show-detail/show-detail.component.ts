import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../../services/movie.service";
import {map, Observable} from "rxjs";
import {Movie} from "../../types/movie";
import {AsyncPipe, CommonModule, JsonPipe, NgOptimizedImage} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {SliderComponent} from "../../components/slider/slider.component";
import {TabViewModule} from "primeng/tabview";
import {IMAGES_SIZES, imagesBaseUrl} from "../../constants/images-size";
import {Video} from "../../types/video";

import {VideoEmbedComponent} from "../../components/video-embed/video-embed.component";
import {Image, ImageModule} from "primeng/image";
import {Images} from "../../types/image";
import {BannerComponent} from "../../components/banner/banner.component";
import {Actor} from "../../types/credits";
import {CarouselModule} from "primeng/carousel";
import {TvshowsService} from "../../services/tvshows.service";
import {mapToMovie, mapToMovies} from "../../types/tvshow";

@Component({
  selector: 'app-show-detail',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    HttpClientModule,
    CommonModule,
    SliderComponent,
    TabViewModule,
    VideoEmbedComponent,
    ImageModule,
    BannerComponent,
    CarouselModule,
    NgOptimizedImage
  ],
  providers: [MovieService,TvshowsService],
  templateUrl: './show-detail.component.html',
  styleUrl: './show-detail.component.css'
})
export class ShowDetailComponent implements OnInit {

  showId = '';
  showType: 'tv' | 'movie' = 'movie';

  show$: Observable<Movie> | null = null;
  showsVideos$: Observable<Video[]> | null = null;
  showImages$: Observable<Images[]> | null = null;
  showCast$: Observable<Actor[]> | null = null;
  similarShows$: Observable<Movie[]> | null = null;

  imagesSizes = IMAGES_SIZES

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private movieService: MovieService,
    private tvService: TvshowsService
  ) {}

  ngOnInit(): void {
    //this.route.params.subscribe(params =>{
    //this.showId = params['id']
   // });


    this.showId = this.route.snapshot.params['id'];
    this.showType = this.route.snapshot.params['type'];

    if (this.showType === 'movie') {
      this.show$ = this.movieService.getMovieById(this.showId);
      this.showsVideos$ = this.movieService.getMovieVideos(this.showId);
      this.showImages$ = this.movieService.getMoviesImages(this.showId);
      this.showCast$ = this.movieService.getMovieCast(this.showId);
      this.similarShows$ = this.movieService.getMovieSimilar(this.showId);

    } else if (this.showType === 'tv') {
      this.show$ = this.tvService
        .getTvShowById(this.showId)
        .pipe(
          map(mapToMovie)
        );
      this.showsVideos$ = this.tvService.getTvShowVideos(this.showId);
      this.showImages$ = this.tvService.getTvShowImages(this.showId);
      this.showCast$ = this.tvService.getTvShowCast(this.showId);
      this.similarShows$ = this.tvService
        .getTvShowSimilar(this.showId)
        .pipe(map(mapToMovies));
    }
  }


}
