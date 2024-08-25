import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-detail',
  templateUrl: './director-detail.component.html',
  styleUrl: './director-detail.component.scss'
})
export class DirectorDetailComponent {
  data = inject(MAT_DIALOG_DATA);
}
