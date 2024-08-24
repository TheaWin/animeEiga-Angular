import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginFormComponent } from './user-login-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

describe('UserLoginFormComponent', () => {
  let component: UserLoginFormComponent;
  let fixture: ComponentFixture<UserLoginFormComponent>;
  let fetchApiDataSpy: jasmine.SpyObj<FetchApiDataService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<UserLoginFormComponent>>;

  beforeEach(async () => {
    fetchApiDataSpy = jasmine.createSpyObj('FetchApiDataService', ['userLogin']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);


    await TestBed.configureTestingModule({
      imports: [MatCardModule, MatButtonModule, MatFormFieldModule, FormsModule, MatInputModule],
      declarations: [UserLoginFormComponent],
      providers: [
        { provide: FetchApiDataService, useValue: fetchApiDataSpy},
        { provide: MatDialogRef, useValue: dialogRefSpy},
        { provide: MatSnackBar, useValue: snackBarSpy}
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLoginFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
