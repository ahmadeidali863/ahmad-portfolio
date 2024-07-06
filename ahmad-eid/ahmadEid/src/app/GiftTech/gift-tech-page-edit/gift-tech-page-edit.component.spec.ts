import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftTechPageEditComponent } from './gift-tech-page-edit.component';

describe('GiftTechPageEditComponent', () => {
  let component: GiftTechPageEditComponent;
  let fixture: ComponentFixture<GiftTechPageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ GiftTechPageEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftTechPageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
