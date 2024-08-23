import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://anime-eiga-84a0980bd564.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  //Inject the HttpClient module to the constructor params
  //This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Making the api call for user login
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Making the api call for Get all movies
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

  // Making the api call for Get one movie
  public getOneMovie(movieName: string): Observable<any> {
    console.log(movieName);
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

  // Making the api call for Get director
  public getDirector(directorName: string): Observable<any> {
    console.log(directorName);
    // !!! Need to make changes to director endpoint in API project and database need director infos
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

  // Making the api call for Get genre
  public getGenre(genreName: string): Observable<any> {
    console.log(genreName);
    // !!! Need to make a genre endpoint in API project and update database
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

  // Making the api call for Get user
  public getUser(username: string): Observable<any> {
    console.log(username);
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

  // Making the api call for Get favourite movies for a user
  public getFavouriteMovies(username: string): Observable<any> {
    console.log(username);
    // there is no endpoint for FavMovie in the current API
    // favourite movies were only filtered from the user
    return this.getUser(username).pipe(
      map(user => user.favoriteMovies),
      catchError(this.handleError)
    );
  }

  // Making the api call for Add a movie to favourite Movies
  public addFavouriteMovie(username: string, movieName: string): Observable<any> {
    console.log(username);
    console.log(movieName);
    const token = localStorage.getItem('token');
    return this.http
      .post<Response>(apiUrl + 'users/' + username + '/' + movieName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData),
        catchError(this.handleError));
  } 

  // Making the api call for Edit user
  public editUser(username: string): Observable<any> {
    console.log(username);
    const token = localStorage.getItem('token');
    return this.http
      .put<Response>(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData),
        catchError(this.handleError));
  }

  // Making the api call for Delete user
  public deleteUser(username: string): Observable<any> {
    console.log(username);
    const token = localStorage.getItem('token');
    return this.http
      .delete<Response>(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(map(this.extractResponseData),
        catchError(this.handleError));
  }

  // Making the api call for Delete a movie from the favorite movies
  public deleteFavouriteMovie(username: string, movieName: string): Observable<any> {
    console.log(username);
    console.log(movieName);
    const token = localStorage.getItem('token');
    return this.http
      .delete<Response>(apiUrl + 'users/' + username + '/' + movieName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData),
        catchError(this.handleError));
  } 

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status},` +
        `Error body is: ${error.error}`);
    }
    return throwError(() => new Error(
      'Something bad happened; please try again later.'));
  }

  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }
}