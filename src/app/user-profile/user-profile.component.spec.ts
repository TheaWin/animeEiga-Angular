import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { of } from 'rxjs';

class MockFetchApiDataService {
  getUserProfile() {
    return of({ id: 1, name: 'John Doe' }); // Mocked response for getUserProfile
  }

  getAllMovies() {
    return of([]); // Mocked response for getAllMovies, returning an empty array
  }
}

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      imports: [MatSnackBarModule, MatCardModule],
      providers: [
        provideRouter([{ path: 'profile', component: UserProfileComponent }]),
        provideHttpClientTesting(),
        { provide: FetchApiDataService, useClass: MockFetchApiDataService } // Use Mock Service
      ]
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController); // Initialize HttpTestingController
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
