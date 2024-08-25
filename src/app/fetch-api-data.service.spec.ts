import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { FetchApiDataService } from './fetch-api-data.service';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('FetchApiDataService', () => {
  let service: FetchApiDataService;
  let httpMock: HttpTestingController;
  const apiUrl = 'https://anime-eiga-84a0980bd564.herokuapp.com/'; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FetchApiDataService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(FetchApiDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user', () => {
    const userDetails = { username: 'testuser', name: 'Test User', password: 'password123', email: 'test@example.com', birthday: '2000-01-01' };
    const mockResponse = { success: true };

    service.userRegistration(userDetails).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}users`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should log in a user', () => {
    const userDetails = { username: 'testuser', password: 'password123' };
    const mockResponse = { token: 'fake-token' };
  
    service.userLogin(userDetails).subscribe({
      next: (response) => {
        expect(response).toEqual(mockResponse);
      },
      error: (error) => {
        fail('Request failed with error: ' + error.message);
      }
    });
  
    const req = httpMock.expectOne(`${apiUrl}login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(userDetails);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush(mockResponse);
  });

  it('should get all movies', () => {
    const token = 'fake-token';
    const mockMovies = [{ Name: 'Movie 1' }, { Name: 'Movie 2' }];

    spyOn(localStorage, 'getItem').and.returnValue(token);

    service.getAllMovies().subscribe(movies => {
      expect(movies).toEqual(mockMovies);
    });

    const req = httpMock.expectOne(`${apiUrl}anime`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer ' + token);
    req.flush(mockMovies);
  });

  it('should get one movie by name', () => {
    const token = 'fake-token';
    const movieName = 'Movie 1';
    const mockMovie = { Name: 'Movie 1' };

    spyOn(localStorage, 'getItem').and.returnValue(token);

    service.getOneMovie(movieName).subscribe(movie => {
      expect(movie).toEqual(mockMovie);
    });

    const req = httpMock.expectOne(`${apiUrl}anime/${movieName}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer ' + token);
    req.flush(mockMovie);
  });

  it('should get a director by name', () => {
    const token = 'fake-token';
    const directorName = 'Director 1';
    const mockDirector = { Name: 'Director 1' };

    spyOn(localStorage, 'getItem').and.returnValue(token);

    service.getDirector(directorName).subscribe(director => {
      expect(director).toEqual(mockDirector);
    });

    const req = httpMock.expectOne(`${apiUrl}anime/director/${directorName}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer ' + token);
    req.flush(mockDirector);
  });

  it('should get a genre by name', () => {
    const token = 'fake-token';
    const genreName = 'Action';
    const mockGenre = { Name: 'Action' };

    spyOn(localStorage, 'getItem').and.returnValue(token);

    service.getGenre(genreName).subscribe(genre => {
      expect(genre).toEqual(mockGenre);
    });

    const req = httpMock.expectOne(`${apiUrl}genre/${genreName}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer ' + token);
    req.flush(mockGenre);
  });

  it('should get user by username', () => {
    const token = 'fake-token';
    const username = 'testuser';
    const mockUser = { username: 'testuser' };

    spyOn(localStorage, 'getItem').and.returnValue(token);

    service.getUser(username).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${apiUrl}users/${username}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer ' + token);
    req.flush(mockUser);
  });

  it('should get favorite movies for a user', () => {
    const username = 'testuser';
    const mockUser = { favoriteMovies: ['Movie 1', 'Movie 2'] };

    spyOn(service, 'getUser').and.returnValue(of(mockUser));

    service.getFavoriteMovies(username).subscribe(favoriteMovies => {
      expect(favoriteMovies).toEqual(['Movie 1', 'Movie 2']);
    });
  });

  it('should add a movie to favorite movies', () => {
    const token = 'fake-token';
    const username = 'testuser';
    const movieId = '1235';
    const mockUser = {
      username: username,
      favoriteMovies: ['135456', '54489']
    };
    const mockResponse = { success: true };  

    // Mock localStorage
    spyOn(localStorage, 'getItem').and.callFake((key) => {
      if (key === 'token') {
        return token;
      } else if (key === 'user') {
        return JSON.stringify(mockUser);
      }
      return null;
    });

    // Mock localStorage setItem
    spyOn(localStorage, 'setItem');  
      service.addFavoriteMovie(movieId).subscribe(response => {
        expect(response).toEqual(mockResponse);
    });
 
    const req = httpMock.expectOne(`${apiUrl}users/${username}/${movieId}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer ' + token);
    req.flush(mockResponse);
  });

  it('should edit a user', () => {
    const token = 'fake-token';
    const username = 'testuser';
    const mockResponse = { success: true };

    spyOn(localStorage, 'getItem').and.returnValue(token);

    service.editUser(username).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}users/${username}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe('Bearer ' + token);
    req.flush(mockResponse);
  });

  it('should delete a user', () => {
    const token = 'fake-token';
    const username = 'testuser';
    const mockResponse = { success: true };

    spyOn(localStorage, 'getItem').and.returnValue(token);

    service.deleteUser(username).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}users/${username}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe('Bearer ' + token);
    req.flush(mockResponse);
  });

  it('should delete a movie from favorite movies', () => {
    const token = 'fake-token';
    const username = 'testuser';
    const movieId = '123';
    const mockUser = { 
      username: username,
      favoriteMovies: ['123414', '35359']
    };
    const mockResponse = {success: true};

    spyOn(localStorage, 'getItem').and.callFake((key) => {
      if (key === 'token') {
        return token;
      } else if (key === 'user') {
        return JSON.stringify(mockUser);
      }
      return null;
    });

    spyOn(localStorage, 'setItem');

    service.deleteFavoriteMovie(movieId).subscribe(response => {
    expect(response).toEqual(mockResponse);

    // Check that the movie was removed from favoriteMovies
    expect(mockUser.favoriteMovies).not.toContain(movieId);

    // Check that localStorage was updated correctly
    expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockUser));
  });

  const req = httpMock.expectOne(`${apiUrl}users/${username}/${movieId}`);
  expect(req.request.method).toBe('DELETE');
  expect(req.request.headers.get('Authorization')).toBe('Bearer ' + token);
  req.flush(mockResponse);
  });
});
