import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegistrationFormComponent } from './user-registration-form.component';
import { MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

// To avoid issues related to animations
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UserRegistrationFormComponent', () => {
  let component: UserRegistrationFormComponent;
  let fixture: ComponentFixture<UserRegistrationFormComponent>;
  let fetchApiDataSpy: jasmine.SpyObj<FetchApiDataService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<UserRegistrationFormComponent>>;

  beforeEach(async () => {
    fetchApiDataSpy = jasmine.createSpyObj('FetchApiDataService', ['userRegistration']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [MatCardModule, MatButtonModule, MatFormFieldModule, FormsModule, MatInputModule, NoopAnimationsModule],
      declarations: [UserRegistrationFormComponent],
      providers: [
        { provide: FetchApiDataService, useValue: fetchApiDataSpy},
        { provide: MatDialogRef, useValue: dialogRefSpy},
        { provide: MatSnackBar, useValue: snackBarSpy}
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind form input values to userData', () => {
    // Set the values of the inputs
    const usernameInput = fixture.nativeElement.querySelector('input[name="Username"]');
    const nameInput = fixture.nativeElement.querySelector('input[name="Name"]');
    const passwordInput = fixture.nativeElement.querySelector('input[name="Password"]');
    const emailInput = fixture.nativeElement.querySelector('input[name="Email"]');
    const birthdayInput = fixture.nativeElement.querySelector('input[name="Birthday"]');
  
    // Set the values and dispatch input events
    usernameInput.value = 'testuser';
    nameInput.value = 'Test User';
    passwordInput.value = 'password123';
    emailInput.value = 'test@example.com';
    birthdayInput.value = '2000-01-01';
  
    usernameInput.dispatchEvent(new Event('input'));
    nameInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('input'));
    birthdayInput.dispatchEvent(new Event('input'));
  
    // Trigger change detection
    fixture.detectChanges();
  
    // Verify that the values are bound correctly to userData
    expect(component.userData.username).toBe('testuser');
    expect(component.userData.name).toBe('Test User');
    expect(component.userData.password).toBe('password123');
    expect(component.userData.email).toBe('test@example.com');
    expect(component.userData.birthday).toBe('2000-01-01');
  });

  it('should call userRegistration and handle success', () => {
    const mockResponse = {};
    fetchApiDataSpy.userRegistration.and.returnValue(of(mockResponse));
  
    component.registerUser();
  
    expect(fetchApiDataSpy.userRegistration).toHaveBeenCalledWith(component.userData);
    expect(dialogRefSpy.close).toHaveBeenCalled();
    expect(snackBarSpy.open).toHaveBeenCalledWith('Sign up successful', 'OK', { duration: 2000 });
  });
  
  it('should handle registration failure', () => {
    fetchApiDataSpy.userRegistration.and.returnValue(throwError(() => new Error('Error')));
  
    component.registerUser();
  
    expect(fetchApiDataSpy.userRegistration).toHaveBeenCalledWith(component.userData);
    expect(dialogRefSpy.close).not.toHaveBeenCalled();
    expect(snackBarSpy.open).toHaveBeenCalledWith('Sign up failed', 'OK', { duration: 2000 });
  });
});
