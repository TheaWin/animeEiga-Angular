import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  /**
   * Holds the user's registration data
   */
  @Input() userData = { username: '',name: '', password: '', email: '', birthday: '' };

  /**
   * Creates an instance of UserRegistrationFormComponent.
   * @param fetchApiData - Service to interact with the API.
   * @param dialogRef - Reference to the dialog opened.
   * @param snackBar - Service to show snack bar notifications.
   */
  constructor(
      public fetchApiData: FetchApiDataService,
      public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
      public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  /**
   * Registers a new user
   */
  registerUser(): void {
      this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
    // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('Sign up successful', 'OK', {
          duration: 2000
      });
      }, (result) => {
        this.snackBar.open('Sign up failed', 'OK', {
          duration: 2000
        });
      });
    }
  }