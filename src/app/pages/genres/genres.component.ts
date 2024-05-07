import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AsyncPipe, CommonModule} from "@angular/common";
import {ShowItemComponent} from "../../components/show-item/show-item.component";
import {HttpClientModule} from "@angular/common/http";
import {MovieService} from "../../services/movie.service";
import {TvshowsService} from "../../services/tvshows.service";
import {Observable} from "rxjs";
import {Genre, Movie} from "../../types/movie";

@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    ShowItemComponent,
    HttpClientModule,
    CommonModule,
  ],
  providers: [MovieService,TvshowsService],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.css'
})
export class GenresComponent implements OnInit {
  genres$: Observable<Genre[]> | null = null;
  shows$: Observable<Movie[]> | null = null;
  genreId = '';

  constructor(
    private mService: MovieService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.genreId = params['genreId'];
      this.shows$ = this.mService.getMovieGenre(this.genreId);
    });
    this.genres$ = this.mService.getMovieGenres();
  }
  findByGenre(genreId: string) {
    // this.shows$ = this.mService.getMoviesByGenre(genreId);
  }

}
