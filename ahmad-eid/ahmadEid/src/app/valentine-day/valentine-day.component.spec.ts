import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValentineDayComponent } from './valentine-day.component';

describe('ValentineDayComponent', () => {
  let component: ValentineDayComponent;
  let fixture: ComponentFixture<ValentineDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ValentineDayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValentineDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
