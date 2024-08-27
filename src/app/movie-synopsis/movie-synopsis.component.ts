import { Component, inject} from '@angular/core';
import { MAT_DIALOG_DATA, } from '@angular/material/dialog';

/**
 * Component to display details about a movie
 * 
 * This component is used within a dialog to show the movie's detail
 */
@Component({
  selector: 'app-movie-synopsis',
  templateUrl: './movie-synopsis.component.html',
  styleUrl: './movie-synopsis.component.scss'
})
export class MovieSynopsisComponent {
  /**
   * Movie's details passed into the component.
   */
  data = inject(MAT_DIALOG_DATA);
}
