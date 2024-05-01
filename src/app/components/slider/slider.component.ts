import {Component, NgModule, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpClientModule} from '@angular/common/http';
import {CommonModule} from "@angular/common";



@Component({

  selector: 'app-slider',
  templateUrl: './slider.component.html',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  styleUrls: ['./slider.component.css']
})


export class SliderComponent implements OnInit {

  movies: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer  eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NGRlNGNlZGVkNDViZTllZmEzYzEyM2IxMGYwNzQ0YiIsInN1YiI6IjY2MjdlOGYzNjNkOTM3MDE2NDczNzM4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-5Bnuc4KAgd97q6HUd-BuCy5jM6-zn3Ue3gul-YBfbc');

    this.http.get<any>('https://api.themoviedb.org/3/trending/movie/day?language=en-US', { headers })
      .subscribe(
        (response) => {
          this.movies = response; // Atribui a resposta aos filmes
          console.log(response); // Exibe a resposta no console
        },
        (error) => {
          console.error('Erro ao buscar dados:', error); // Exibe o erro no console
        }
      );
  }
}



