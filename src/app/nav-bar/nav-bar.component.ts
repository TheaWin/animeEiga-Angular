import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit{

  ngOnInit(): void {
    
  }

  /**
   * Creates an instance of NavBarComponent
   * @param snackBar - Service for displaying snack bar notifications.
   * @param router - Angular router service
   */
  constructor(
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  /**
   * Navigates to the movies page
   */
  public openMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Navigates to the profile page
   */
  public openProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Cleared the token and user data from local storage
   * Displays a logout confirmation message
   * Navigates to the welcome page
   */
  public logOutUser(): void {
    localStorage.clear();
    this.snackBar.open('You have successfully log out', 'OK', {duration: 2000});
    this.router.navigate(['welcome']);
  }
}
