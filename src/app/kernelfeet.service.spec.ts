import { TestBed } from '@angular/core/testing';

import { KernelfeetService } from './kernelfeet.service';

describe('KernelfeetService', () => {
  let service: KernelfeetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KernelfeetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
