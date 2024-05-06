import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../../services/movie.service";
import {Observable} from "rxjs";
import {Movie} from "../../types/movie";
import {AsyncPipe, CommonModule, JsonPipe} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-show-detail',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    HttpClientModule, CommonModule
  ],
  providers: [MovieService],
  templateUrl: './show-detail.component.html',
  styleUrl: './show-detail.component.css'
})
export class ShowDetailComponent implements OnInit {

  showId = '';

  show$: Observable<Movie> | null = null;

  constructor(private router: Router, private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit(): void {
    //this.route.params.subscribe(params =>{
    //this.showId = params['id']
   // });
    this.showId = this.route.snapshot.params['id'];

    this.show$ = this.movieService.getMovieById(this.showId)
  }

}
