import { TestBed } from '@angular/core/testing';

import { TeamFinderServiceService } from './team-finder-service.service';

describe('TeamFinderServiceService', () => {
  let service: TeamFinderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamFinderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
