import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviFactureComponent } from './suivi-facture.component';

describe('SuiviFactureComponent', () => {
  let component: SuiviFactureComponent;
  let fixture: ComponentFixture<SuiviFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiviFactureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuiviFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
