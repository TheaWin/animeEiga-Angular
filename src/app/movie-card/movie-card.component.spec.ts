import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieCardComponent } from './movie-card.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { provideHttpClient } from '@angular/common/http';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;
  let fetchApiDataSpy: jasmine.SpyObj<FetchApiDataService>;

  beforeEach(async () => {
    fetchApiDataSpy = jasmine.createSpyObj('FetchApiDataService', ['getAllMovies']);

    await TestBed.configureTestingModule({
      imports: [MatCardModule, MatButtonModule, MatIconModule],
      declarations: [MovieCardComponent],
      providers: [
        provideHttpClient(),
        { provide: FetchApiDataService, useValue: fetchApiDataSpy }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllMovies from FetchApiDataService', () => {
    fetchApiDataSpy.getAllMovies.and.returnValue(of([]));
    fixture.detectChanges();
    expect(fetchApiDataSpy.getAllMovies).toHaveBeenCalled();
  });
});