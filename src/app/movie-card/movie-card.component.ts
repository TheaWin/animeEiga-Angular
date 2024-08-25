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
      console.log('Movies loaded: ', this.movies);
      return this.movies;
    });
  }

  isFavorite(movieId: string): boolean {
    return this.fetchApiData.isFavoriteMovies(movieId);
  }

  addFavoriteMovie(movieId: string): void {
    this.fetchApiData.addFavoriteMovie(movieId).subscribe(() => {
      console.log('addFav called');
      this.snackBar.open('Added to favorites', 'OK', {duration: 2000});
    });
  }

  deleteFavoriteMovie(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovie(movieId).subscribe(() => {
      this.snackBar.open('Removed from favorites', 'OK', {duration: 2000});
      console.log('del fav called');
    })
  }
  // getUser(): void {
  //   const userData = localStorage.getItem('user');
  //   if (userData) {
  //     this.user = JSON.parse(userData);
  //     console.log('User data: ', this.user);
  //   }
  // }
  
  // updateUser(): void {
  //     localStorage.setItem('user', JSON.stringify(this.user));
  // }}

  // filterFavouriteMovies(): void {
  //   const user = JSON.parse(localStorage.getItem('user') || '{}');
  //   const favoriteMovieIds = user.favoriteMovies.map((movie: any) => movie._id)  || [];
  //   console.log("id:", favoriteMovieIds);
  //   this.favoriteMovies =  this.movies.filter(movie => favoriteMovieIds.includes(movie._id));
  //   console.log('Filtered favorite movies:', this.favoriteMovies);
  //   this.movies.forEach(movie => {
  //     movie.isFavorite = favoriteMovieIds.includes(movie._id);
  //     if (movie.isFavorite) {
  //       console.log(`Movie marked as favorite: ${movie.Name}`);
  //     }
  //   });
  // }
  

  // toggleFavorite(movie: any): void {
  //   if (movie.isFavorite) {
  //     // Remove from favorites
  //     this.fetchApiData.deleteFavouriteMovie(this.user.username, movie._id).subscribe(() => {
  //       movie.isFavorite = false;
  //       this.favoriteMovies = this.favoriteMovies.filter(id => id !== movie._id); // Update local list
  //     });
  //   } else {
  //     // Add to favorites
  //     this.fetchApiData.addFavouriteMovie(this.user.username, movie._id).subscribe(() => {
  //       movie.isFavorite = true;
  //       this.favoriteMovies.push(movie._id); // Update local list
  //       this.updateUser();
  //     });
  //   }
  // }


  openSypnosis(movie: any): void {
    console.log(movie.Name);
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
  
    // Open the dialog with the director data
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
