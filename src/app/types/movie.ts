export type Movie = {
  id: number;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
  revenue?:number;
  runtime?:string;
  status?:string;
  genres?:Genre[];
  spoken_languages?:Languages[];
};

export type MoviesDTO = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type Genre = {
  id:string;
  name:string;
}

export type GenreDto = {
  genres : Genre[];
}

export type Languages ={
  iso_639_1:string;
  name: string;
}
