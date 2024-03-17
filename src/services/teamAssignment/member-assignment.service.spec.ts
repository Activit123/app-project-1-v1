import { TestBed } from '@angular/core/testing';

import { MemberAssignmentService } from './member-assignment.service';

describe('MemberAssignmentService', () => {
  let service: MemberAssignmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberAssignmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
