import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieSynopsisComponent } from './movie-synopsis.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';

describe('MovieSynopsisComponent', () => {
  let component: MovieSynopsisComponent;
  let fixture: ComponentFixture<MovieSynopsisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        NoopAnimationsModule,
        MatCardModule
      ],
      declarations: [ MovieSynopsisComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} } // Provide an empty mock for MAT_DIALOG_DATA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieSynopsisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});