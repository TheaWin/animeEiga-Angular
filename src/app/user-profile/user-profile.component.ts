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

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUserProfile();
    this.getMovies();
  }

  loadUserProfile(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('Loaded User:', user);
    if (user && user.username) {
      this.userData.username = user.username;
      this.userData.name = user.name;
      this.userData.email = user.email;
      this.userData.birthday = user.birthday.slice(0, 10);
    } else {
      console.error('No user data found in localStorage.');
    }
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.allMovies = resp;
      this.filterFavouriteMovies();
    });
  }

  filterFavouriteMovies(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const favoriteMovieIds = user.favoriteMovies || [];
    console.log("id:", favoriteMovieIds);
    this.favoriteMovies =  this.allMovies.filter(movie => favoriteMovieIds.includes(movie._id));
    console.log(this.favoriteMovies);
  }

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

  deleteUser(): void {
    const username = JSON.parse(localStorage.getItem('user') || '{}').username;
    this.fetchApiData.deleteUser(username).subscribe({
      next: () => {
        this.snackBar.open('Account deleted successfully', 'OK', { duration: 2000 });
        this.router.navigate(['welcome']);
        localStorage.clear();
      },
      error: (err) => {
        console.error('Error:', err);  // Log error for debugging
        this.snackBar.open('Failed to delete profile', 'OK', { duration: 2000 });
      }
    });
  }

  isFavorite(movieId: string): boolean {
    return this.fetchApiData.isFavoriteMovies(movieId);
  }

  deleteFavoriteMovie(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovie(movieId).subscribe(() => {
      this.favoriteMovies = this.favoriteMovies.filter((movie: any) => {
        return movie._id !== movieId;
      })
      this.snackBar.open('Removed from favorites', 'OK', {duration: 2000});
      console.log('del fav called');
    })
  }

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
