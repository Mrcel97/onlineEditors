import { TestBed, inject } from '@angular/core/testing';

import { StackBlitzService } from './stack-blitz.service';

describe('StackBlitzService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StackBlitzService]
    });
  });

  it('should be created', inject([StackBlitzService], (service: StackBlitzService) => {
    expect(service).toBeTruthy();
  }));
});
