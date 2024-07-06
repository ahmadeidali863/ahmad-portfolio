import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftTechLoginComponent } from './gift-tech-login.component';

describe('GiftTechLoginComponent', () => {
  let component: GiftTechLoginComponent;
  let fixture: ComponentFixture<GiftTechLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ GiftTechLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftTechLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
