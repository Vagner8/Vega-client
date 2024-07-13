import { TestBed } from '@angular/core/testing';

import { FractalService } from './fractal.service';

describe('FractalService', () => {
  let service: FractalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FractalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
