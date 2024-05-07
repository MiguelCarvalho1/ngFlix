import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Tvshow, TvshowsDto} from "../types/tvshow";
import {Movie, MoviesDTO} from "../types/movie";
import {VideosDto} from "../types/video";
import {ImagesDto} from "../types/image";
import {CreditsDto} from "../types/credits";

@Injectable({
  providedIn: 'root'
})
export class TvshowsService {

  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NGRlNGNlZGVkNDViZTllZmEzYzEyM2IxMGYwNzQ0YiIsInN1YiI6IjY2MjdlOGYzNjNkOTM3MDE2NDczNzM4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-5Bnuc4KAgd97q6HUd-BuCy5jM6-zn3Ue3gul-YBfbc';

  constructor(private http: HttpClient) {}

  fetchData(type: string, count = 20): Observable<any> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${this.apiKey}`);

    return this.http.get<TvshowsDto>(`${this.apiUrl}/tv/${type}?api_key=${this.apiKey}`, { headers })
      .pipe(
        map((data) => data.results.slice(0, count))
      );
  }
  getTvShowById(id: string ){
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${this.apiKey}`);

    return this.http.get<Tvshow>(`${this.apiUrl}/tv/${id}`, { headers });
  }

  getTvShowVideos(id: string ){
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${this.apiKey}`);
    return this.http.get<VideosDto>(`${this.apiUrl}/tv/${id}/videos`, { headers })
      .pipe(
        map((data) => data.results));
  }

  getTvShowImages(id: string ){
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${this.apiKey}`);
    return this.http.get<ImagesDto>(`${this.apiUrl}/tv/${id}/images`, { headers })
      .pipe(
        map((data) => data.backdrops));

  }

  getTvShowCast(id: string ){
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${this.apiKey}`);

    return this.http.get<CreditsDto>(`${this.apiUrl}/tv/${id}/credits`, { headers })
      .pipe(
        map((data) => data.cast)
      );
  }

  getTvShowSimilar(id: string ){
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${this.apiKey}`);
    return this.http.get<TvshowsDto>(`${this.apiUrl}/tv/${id}/similar`, { headers })
      .pipe(
        map((data) => data.results.slice(0,12))
      );

  }
  searchTvShows(page: number, searchValue?: string ){
    const uri = searchValue ? 'search/tv' : 'tv/popular'
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${this.apiKey}`);
    return this.http.get<TvshowsDto>(`${this.apiUrl}/${uri}?query=${searchValue}&page=${page}`, { headers });

  }
}
