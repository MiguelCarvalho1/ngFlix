import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MoviesDTO } from "../types/movie";
import {map, Observable} from 'rxjs';

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
}
