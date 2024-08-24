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

  it('should fetch movies and bind them to the component', () => {
    const mockMovies = [
      { Name: 'Movie 1', Director: { Name: 'Director 1' }, imageURL: 'url1' },
      { Name: 'Movie 2', Director: { Name: 'Director 2' }, imageURL: 'url2' }
    ];
  
    fetchApiDataSpy.getAllMovies.and.returnValue(of(mockMovies));
  
    fixture.detectChanges(); // Trigger ngOnInit and data binding
  
    expect(component.movies.length).toBe(2);
    expect(component.movies).toEqual(mockMovies);
  
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('mat-card-title').length).toBe(2);
    expect(compiled.querySelector('mat-card-title')?.textContent).toContain('Movie 1');
  });

  it('should call getAllMovies from FetchApiDataService', () => {
    fetchApiDataSpy.getAllMovies.and.returnValue(of([]));
    fixture.detectChanges();
    expect(fetchApiDataSpy.getAllMovies).toHaveBeenCalled();
  });

  it('should render Genre, Director, and Synopsis buttons', () => {
    const mockMovies = [
      { Name: 'Movie 1', Director: { Name: 'Director 1' }, imageURL: 'url1' }
    ];
  
    fetchApiDataSpy.getAllMovies.and.returnValue(of(mockMovies));
    fixture.detectChanges();
  
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBe(3);
    expect(buttons[0].textContent).toContain('Genre');
    expect(buttons[1].textContent).toContain('Director');
    expect(buttons[2].textContent).toContain('Synopsis');
  });
});