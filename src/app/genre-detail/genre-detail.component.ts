import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component to display details about genre.
 * 
 * This component is used within a dialog to show the genre details.
 */
@Component({
  selector: 'app-genre-detail',
  templateUrl: './genre-detail.component.html',
  styleUrl: './genre-detail.component.scss'
})
export class GenreDetailComponent {
  /**
   * Genre's details passed into the component
   */
  data = inject(MAT_DIALOG_DATA);
}
