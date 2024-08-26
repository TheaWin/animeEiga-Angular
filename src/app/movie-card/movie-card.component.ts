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
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  isFavorite(movieId: string): boolean {
    return this.fetchApiData.isFavoriteMovies(movieId);
  }

  addFavoriteMovie(movieId: string): void {
    this.fetchApiData.addFavoriteMovie(movieId).subscribe(() => {
      this.snackBar.open('Added to favorites', 'OK', {duration: 2000});
    });
  }

  deleteFavoriteMovie(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovie(movieId).subscribe(() => {
      this.snackBar.open('Removed from favorites', 'OK', {duration: 2000});
    })
  }

  openSypnosis(movie: any): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: {
        name: movie.Name,
        synopsis: movie.Description,
        release: movie.releaseYear
      }
    });
  }

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

  openGenre(movie: any): void {
    this.dialog.open(GenreDetailComponent, {
      data: {
        name: movie.Genre.Name,
        description: movie.Genre.Description
      }
    })
  }
}
