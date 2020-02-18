import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMovie } from '../models/movies';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private SERVER_URL: string = 'https://my-json-server.typicode.com/ylytvyn/starwars';

  constructor(private http: HttpClient) { }

  public getMoviesList() {
    return this.http.get(`${this.SERVER_URL}/movies`);
  }

  public callMoviesStorage(item: IMovie) {
    let storedMovies: IMovie[] = JSON.parse(localStorage.getItem('newMovies')) || [],
        isExistMovie = false,
        newStoredMovies = [];

    newStoredMovies = storedMovies.map((movie: IMovie) => {
      if (movie.id === item.id) {
        isExistMovie = true;
        return item;
      } else {
        return movie;
      }
    });

    if (!isExistMovie) newStoredMovies.push(item);

    localStorage.setItem('newMovies', JSON.stringify(newStoredMovies));
  }

  public getMoviesFromStorage(): IMovie[] {
    return JSON.parse(localStorage.getItem('newMovies')) || [];
  }
}
