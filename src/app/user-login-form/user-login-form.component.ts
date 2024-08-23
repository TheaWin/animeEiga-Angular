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

  @Input() userData={username: '', password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}
    

    ngOnInit(): void {
    }
    
    // This is the function responsible for sending the form inputs to the backend
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
          this.dialogRef.close(); // This will close the modal on success!
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
