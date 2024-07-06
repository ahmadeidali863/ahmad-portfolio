import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftTechMainComponent } from './gift-tech-main.component';

describe('GiftTechMainComponent', () => {
  let component: GiftTechMainComponent;
  let fixture: ComponentFixture<GiftTechMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftTechMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftTechMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
