import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {

  /**
   * Object holding user data for login
   * @property {string} username -The user's username
   * @property {string} password - The user's password
   */
  @Input() userData={username: '', password: '' };

  /**
   * Creates an instance of UserLoginFormComponent
   * @param fetchApiData - API data fetching service
   * @param dialogRef - Angular Material dialog reference.
   * @param snackBar - Angular Material snackbar service.
   * @param router - Angular Router service.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}
    

    ngOnInit(): void {
    }
    
    /**
     * Logs in the user by sending the user data to the backend
     * 200: Stores user's data and token in local storage, closes the modal dialog, shows a success message, and navigates to the movies page.
     * 400: Shows an error message.
     */
    loginUser(): void {
        this.fetchApiData.userLogin(this.userData).subscribe((result) => {
          const user = {
            _id: result.user._id,
            username: result.user.username,
            name: result.user.name,
            email: result.user.email,
            birthday: result.user.birthday,
            favoriteMovies: result.user.favoriteMovies
          }
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', result.token);
          console.log(localStorage.getItem('user'));
          console.log(localStorage.getItem('token'));
          this.dialogRef.close();
          this.snackBar.open('Login successful!', 'OK', {
            duration: 2000
          });
          this.router.navigate(['movies'])
        }, (result) => {
          this.snackBar.open('Login failed', 'OK', {
            duration: 2000
          });
        }); 
      }    
      }
