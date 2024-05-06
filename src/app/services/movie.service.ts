import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Movie, MoviesDTO} from "../types/movie";
import {count, map, Observable} from 'rxjs';
import {VideosDto} from "../types/video";
import {ImagesDto} from "../types/image";
import {CreditsDto} from "../types/credits";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NGRlNGNlZGVkNDViZTllZmEzYzEyM2IxMGYwNzQ0YiIsInN1YiI6IjY2MjdlOGYzNjNkOTM3MDE2NDczNzM4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-5Bnuc4KAgd97q6HUd-BuCy5jM6-zn3Ue3gul-YBfbc';

  constructor(private http: HttpClient) {}

  fetchData(type: string, count = 20): Observable<any> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${this.apiKey}`);

    return this.http.get<MoviesDTO>(`${this.apiUrl}/movie/${type}?api_key=${this.apiKey}`, { headers })
      .pipe(
        map((data) => data.results.slice(0, count))
      );
  }

  getMovieById(id: string ){
    const headers = new HttpHeaders()
    .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${this.apiKey}`);

    return this.http.get<Movie>(`${this.apiUrl}/movie/${id}`, { headers });
  }

  getMovieVideos(id: string ){
    const headers = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${this.apiKey}`);
      return this.http.get<VideosDto>(`${this.apiUrl}/movie/${id}/videos`, { headers })
        .pipe(
          map((data) => data.results));
  }

  getMoviesImages(id: string ){
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${this.apiKey}`);
    return this.http.get<ImagesDto>(`${this.apiUrl}/movie/${id}/images`, { headers })
      .pipe(
        map((data) => data.backdrops));

  }

  getMovieCast(id: string ){
    const headers = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${this.apiKey}`);

    return this.http.get<CreditsDto>(`${this.apiUrl}/movie/${id}/credits`, { headers })
      .pipe(
        map((data) => data.cast)
      );
  }

  getMovieSimilar(id: string ){
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${this.apiKey}`);
    return this.http.get<MoviesDTO>(`${this.apiUrl}/movie/${id}/similar`, { headers })
      .pipe(
        map((data) => data.results.slice(0,12))
      );

  }

}
