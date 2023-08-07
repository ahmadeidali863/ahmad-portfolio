import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoJavascriptComponent } from './info-javascript.component';

describe('InfoJavascriptComponent', () => {
  let component: InfoJavascriptComponent;
  let fixture: ComponentFixture<InfoJavascriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ InfoJavascriptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoJavascriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
