import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GenreDetailComponent } from '../genre-detail/genre-detail.component';
import { DirectorDetailComponent } from '../director-detail/director-detail.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{
  user: any={};
  favoriteMovies : any[] =[];
  allMovies: any[] = [];
  isEditing = false;
  userData: any = {username: '', name: '', email:'', birthday: ''};

  /**
   * Creates an instance of UserProfileComponent.
   * @param fetchApiData - API data fetching service.
   * @param dialog - Angular Material dialog service.
   * @param snackBar - Angular Material snackbar service.
   * @param router - Angular Router service.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
  ) { }

  /**
   * Lifecycle hook that is called after the component's view has been initialized.
   * Initializes the component by fetching movies and user's data.
   */
  ngOnInit(): void {
    this.loadUserProfile();
    this.getMovies();
  }

  /**
   * Fetches the user's details
   */
  loadUserProfile(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.username) {
      this.userData.username = user.username;
      this.userData.name = user.name;
      this.userData.email = user.email;
      this.userData.birthday = user.birthday.slice(0, 10);
    } else {
      console.error('No user data found in localStorage.');
    }
  }

  /**
   * Fetches all the movies and run filterFavouriteMovies() function
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.allMovies = resp;
      this.filterFavouriteMovies();
    });
  }

  /**
   * Filters the list of all movies to include only the user's favorite movies
   */
  filterFavouriteMovies(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const favoriteMovieIds = user.favoriteMovies || [];
    this.favoriteMovies =  this.allMovies.filter(movie => favoriteMovieIds.includes(movie._id));
  }

  /**
   * Update the user's profile information
   */
  editUser(): void {
    const username = JSON.parse(localStorage.getItem('user') || '{}').username;
    this.fetchApiData.editUser(username).subscribe(result => {
      this.user = {...this.userData};
      this.snackBar.open('Profile updated successfully', 'OK', {duration: 2000});
      this.isEditing = false;
    }, error => {
      this.snackBar.open('Failed to update profile', 'OK', {duration: 2000});
    });
  }

  /**
   * Delete the user's account after confirmation
   */
  deleteUser(): void {
    const username = JSON.parse(localStorage.getItem('user') || '{}').username;
    if (confirm('Are you sure you want to delete your account?')) {
      this.fetchApiData.deleteUser(username).subscribe((result) => {
        this.snackBar.open('Account successfully deleted.', 'Success', {duration: 2000,})
      });
      this.router.navigate(['welcome']);
      localStorage.clear();
    }
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
   * Deletes a movie from the user's favorite movie list
   * @param movieId - The ID of the movie to remove
   */
  deleteFavoriteMovie(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovie(movieId).subscribe(() => {
      this.favoriteMovies = this.favoriteMovies.filter((movie: any) => {
        return movie._id !== movieId;
      })
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
        return 'Null';
      }
      if (dateString) {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
      }
      return 'Unknown';
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
