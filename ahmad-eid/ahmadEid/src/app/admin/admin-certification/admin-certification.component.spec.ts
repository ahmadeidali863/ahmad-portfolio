import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCertificationComponent } from './admin-certification.component';

describe('AdminCertificationComponent', () => {
  let component: AdminCertificationComponent;
  let fixture: ComponentFixture<AdminCertificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AdminCertificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
