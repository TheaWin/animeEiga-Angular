import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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

  deleteUser(): void{
    const username = JSON.parse(localStorage.getItem('user') || '{}').username;
    this.fetchApiData.deleteUser(username).subscribe(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.snackBar.open('Account deleted successfully', 'OK', {duration: 2000});
      this.router.navigate(['welcome']);
    }, error => {
      this.snackBar.open('Failed to delete profile', 'OK', {duration: 2000});
    });
  }

  addFavoriteMovie(movieName: string): void {
    const username = JSON.parse(localStorage.getItem('user') || '{}').username;
    this.fetchApiData.addFavouriteMovie(username, movieName).subscribe(() => {
      this.loadUserProfile();
      this.snackBar.open('Movie added to favorites', 'OK', { duration: 2000 });
    }, error => {
      this.snackBar.open('Failed to add movie to favorites', 'OK', { duration: 2000 });
    });
  }

  deleteFavoriteMovie(movieName: string): void {
    const username = JSON.parse(localStorage.getItem('user') || '{}').username;
    this.fetchApiData.deleteFavouriteMovie(username, movieName).subscribe(() => {
      this.loadUserProfile();
      this.snackBar.open('Movie removed from favorites', 'OK', { duration: 2000 });
    }, error => {
      this.snackBar.open('Failed to remove movie from favorites', 'OK', { duration: 2000 });
    });
  }
}
