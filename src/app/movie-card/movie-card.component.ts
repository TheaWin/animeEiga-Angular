import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { DirectorDetailComponent } from '../director-detail/director-detail.component';
import { GenreDetailComponent } from '../genre-detail/genre-detail.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit{
  /**
   * Array to store all movies.
   */
  movies: any[] = [];

  /**
   * Constructor of the MovieCardComponent class
   * Initializes FetchApiDataService, MatDialog, and MatSnackBar.
   * @param fetchApiData - Service for fetching data from the API
   * @param dialog - Service for opening dialogs.
   * @param snackBar - Service for displaying snack bar notifications.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  /**
   * Lifecycle hook that is called after the component's view has been initialized.
   * Initializes the component by fetching movies.
   */
  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Fetches all movies from the databse.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
   * Checks if the movie is marked as a favorite by the user
   * @param movieId - The ID of the movie to check
   * @returns Returns `true` if the movie is a favorite, otherwise `false`
   */
  isFavorite(movieId: string): boolean {
    return this.fetchApiData.isFavoriteMovies(movieId);
  }

  /**
   * Adds a movie to the user's favorite movie list
   * @param movieId - The ID of the movie to add.
   */
  addFavoriteMovie(movieId: string): void {
    this.fetchApiData.addFavoriteMovie(movieId).subscribe(() => {
      this.snackBar.open('Added to favorites', 'OK', {duration: 2000});
    });
  }

  /**
   * Deletes a movie from the user's favorite movie list
   * @param movieId - The ID of the movie to remove
   */
  deleteFavoriteMovie(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovie(movieId).subscribe(() => {
      this.snackBar.open('Removed from favorites', 'OK', {duration: 2000});
    })
  }

  /**
   * Opens dialog to display movie details
   * @param movie - The name of the movie
   */
  openSypnosis(movie: any): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: {
        name: movie.Name,
        synopsis: movie.Description,
        release: movie.releaseYear
      }
    });
  }

  /**
   * Opens dialog to display director details
   * @param movie - The name of the movie
   */
  openDirector(movie: any): void {
    // Function to format date as YYYY-MM-DD
    const formatDate = (dateString: string | null) => {
      if (dateString === 'null' || dateString === null) {
        return 'Null'; // Return 'Unknown' if dateString is 'null' or actual null
      }
      if (dateString) {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
      }
      return 'Unknown'; // Return 'Unknown' if dateString is empty
    };
  
    this.dialog.open(DirectorDetailComponent, {
      data: {
        name: movie.Director.Name,
        bio: movie.Director.Bio,
        birth: formatDate(movie.Director.Birth),
        death: formatDate(movie.Director.Death),
      }
    });
  }

  /**
   * Opens dialog to display genre details
   * @param movie The name of the movie
   */
  openGenre(movie: any): void {
    this.dialog.open(GenreDetailComponent, {
      data: {
        name: movie.Genre.Name,
        description: movie.Genre.Description
      }
    })
  }
}
