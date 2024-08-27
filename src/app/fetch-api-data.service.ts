import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://anime-eiga-84a0980bd564.herokuapp.com/';

/**
 * Injectable service for fetching data from the API
 */
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  /**
   * Constructs a new FetchApiDataService with the HttpClient injected.
   * @param http - The injected HttpClient.
   */
  constructor(private http: HttpClient) {
  }
  /**
   * Registers a new user
   * @param userDetails - The user details to be registered.
   * @returns An obsesrvable with the response from the API
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Logs in a user
   * @param userDetails - The user's login credentials
   * @returns An observalbe with the response from the API
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post<any>(`${apiUrl}login`, userDetails, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json' // Ensure the correct content type
        })
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Retrieves all movies.
   * @returns An observable with all movies.
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get<Response>(apiUrl+'anime', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData),
        catchError(this.handleError));
  }

  /**
   * Retrieves one specified movie details
   * @param movieName - The title of a movie to retrieve
   * @returns An observable with the movie details
   */
  public getOneMovie(movieName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get<Response>(apiUrl+'anime/'+ movieName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData),
        catchError(this.handleError));
  }

  /**
   * Retrieves director's details
   * @param directorName - The name of the director
   * @returns An observable with the director details
   */
  public getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get<Response>(apiUrl+'anime/' + 'director/' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData),
        catchError(this.handleError));
  }

  /**
   * Retrieves genre's details
   * @param genreName - The name of the genre
   * @returns An observable with the genre details
   */
  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get<Response>(apiUrl+'genre/' + genreName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData),
        catchError(this.handleError));
  }

  /**
   * Retrieves the user details
   * @param username - The username of the user
   * @returns An observable with the user details.
   */
  public getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get<Response>(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData),
        catchError(this.handleError));
  }

  /**
   * Retrieves user's favorite movies
   * @param username - The username of the user.
   * @returns An observable with the user's favorite movies.
   */
  public getFavoriteMovies(username: string): Observable<any> {
    // there is no endpoint for FavMovie in the current API
    // favorite movies were only filtered from the user
    return this.getUser(username).pipe(
      map(user => user.favoriteMovies),
      catchError(this.handleError)
    );
  }

  /**
   * Add a movie to the user's favorite movies list.
   * @param movieId - The movie ID to be added
   * @returns An observable with the response after adding the movie to favorites.
   */
  public addFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.favoriteMovies.push(movieId);
    localStorage.setItem('user', JSON.stringify(user));
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
  
    return this.http
      .post<Response>(`${apiUrl}users/${user.username}/${movieId}`, {}, { headers })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }  

  /**
   * Update user details
   * @param username - The username of the user to be updated
   * @returns An observable with the updated user details.
   */
  public editUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
  
    return this.http
      .put<Response>(`${apiUrl}users/${username}`, {}, { headers }) 
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Deletes a user
   * @param username - The username of the user
   * @returns An observable with the message confirming it has been deleted. 
   */
  public deleteUser(username: string): Observable<void> {
    console.log(username);
    const token = localStorage.getItem('token');
    return this.http
      .delete<void>(`${apiUrl}users/${username}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        })
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Deletes a movie form the user's favorite movie list
   * @param movieId - The ID of the movie to be removed.
   * @returns An observable with the response after deleting the movie from favorites.
   */
  public deleteFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const index = user.favoriteMovies.indexOf(movieId);

    if(index > -1) {
      user.favoriteMovies.splice(index, 1);
    }
    localStorage.setItem('user', JSON.stringify(user));

    return this.http
      .delete<Response>(apiUrl + 'users/' + user.username + '/' + movieId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData),
        catchError(this.handleError));
  } 

  /**
   * Checks if the movie is in the user's favorite movie list
   * @param movieId - The ID of the movie
   * @returns Returns `true` if the movie is a favorite, otherwise `false`
   */
  public isFavoriteMovies(movieId: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user) {
      return user.favoriteMovies.includes(movieId);
    } else {
      return false;
    }
  }

  /**
   * Handles HTTP errors
   * @param error - The HTTP error response
   * @returns An observable with an error message.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  /**
   * Extracts response data from HTTP response
   * @param res - The HTTP response.
   * @returns Extracted response data
   */
  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }
}