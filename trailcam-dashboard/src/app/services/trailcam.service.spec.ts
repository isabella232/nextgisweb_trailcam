import { TestBed, inject } from '@angular/core/testing';

import { TrailcamService } from './trailcam.service';

describe('TrailcamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrailcamService]
    });
  });

  it('should be created', inject([TrailcamService], (service: TrailcamService) => {
    expect(service).toBeTruthy();
  }));
});
