import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomePageComponent } from './welcome-page.component';

describe('WelcomePageComponent', () => {
  let component: WelcomePageComponent;
  let fixture: ComponentFixture<WelcomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelcomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'animeEiga-Angular-Client'`, () => {
    const fixture = TestBed.createComponent(WelcomePageComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('AnimeEiga');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(WelcomePageComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Welcome to AnimeEiga!');
  });

});
