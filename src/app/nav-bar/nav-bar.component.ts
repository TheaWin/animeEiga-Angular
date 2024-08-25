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

  constructor(
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  public openMovies(): void {
    this.router.navigate(['movies']);
  }

  public openProfile(): void {
    this.router.navigate(['profile']);
  }

  public logOutUser(): void {
    localStorage.clear();
    this.snackBar.open('You have successfully log out', 'OK', {duration: 2000});
    this.router.navigate(['welcome']);
  }
}
