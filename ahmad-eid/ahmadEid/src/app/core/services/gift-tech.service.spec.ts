import { TestBed } from '@angular/core/testing';

import { GiftTechService } from './gift-tech.service';

describe('GiftTechService', () => {
  let service: GiftTechService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiftTechService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
