import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftTechPageComponent } from './gift-tech-page.component';

describe('GiftTechPageComponent', () => {
  let component: GiftTechPageComponent;
  let fixture: ComponentFixture<GiftTechPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ GiftTechPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftTechPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
