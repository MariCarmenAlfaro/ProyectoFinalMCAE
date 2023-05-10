import { TestBed } from '@angular/core/testing';

import { ReservationExcService } from './reservation-exc.service';

describe('ReservationExcService', () => {
  let service: ReservationExcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationExcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
