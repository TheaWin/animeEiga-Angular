import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component to display details about a movie director
 * 
 * This component is used within a dialog to show the director's information
 */
@Component({
  selector: 'app-director-detail',
  templateUrl: './director-detail.component.html',
  styleUrl: './director-detail.component.scss'
})
export class DirectorDetailComponent {
  /**
   * Director's details passed into the component.
   */
  data = inject(MAT_DIALOG_DATA);
}
