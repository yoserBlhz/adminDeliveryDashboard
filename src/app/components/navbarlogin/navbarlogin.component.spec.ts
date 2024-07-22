import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarloginComponent } from './navbarlogin.component';

describe('NavbarloginComponent', () => {
  let component: NavbarloginComponent;
  let fixture: ComponentFixture<NavbarloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarloginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
