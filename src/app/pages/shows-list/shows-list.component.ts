import {Component, OnInit} from '@angular/core';
import {MovieService} from "../../services/movie.service";
import {TvshowsService} from "../../services/tvshows.service";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {map, Observable} from "rxjs";
import {Movie, MoviesDTO} from "../../types/movie";
import {ShowItemComponent} from "../../components/show-item/show-item.component";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule, PaginatorState} from 'primeng/paginator';
import {FormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {mapToMoviesDTO} from "../../types/tvshow";

@Component({
  selector: 'app-shows-list',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    ShowItemComponent,
    InputTextModule,
    FormsModule,
    PaginatorModule,
  ],
  providers: [MovieService,TvshowsService],
  templateUrl: './shows-list.component.html',
  styleUrl: './shows-list.component.css'
})
export class ShowsListComponent implements OnInit {

  showsList$: Observable<MoviesDTO> | null = null;
  searchValue = "";
  showType: 'tv' | 'movie' = 'movie';

  constructor(
    private route: ActivatedRoute,
              private movieService: MovieService,
              private tvService: TvshowsService
  ) {}

  ngOnInit(): void {
    this.showType = this.route.snapshot.params['type'];
    this.getPagedShows(this.showType,1)

  }
  getPagedShows(
    showType: 'tv' | 'movie',
    page:number,
    searchKey?:string
  ) {
if(showType == 'tv') {

  this.showsList$ = this.tvService.
  searchTvShows(page, searchKey)
    .pipe(
      map(mapToMoviesDTO));

}else if(showType == 'movie') {
  this.showsList$ = this.movieService.
  searchMovie(page, searchKey);
}

  }

  searchChanged() {
    this.getPagedShows(this.showType,1, this.searchValue);
  }

  pageChanged(event: PaginatorState){
    const pageNumber = event.page ? event.page + 1 : 1;
    this.getPagedShows(this.showType,pageNumber, this.searchValue);
  }


}
