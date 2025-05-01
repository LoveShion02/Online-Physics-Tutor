import { TestBed } from '@angular/core/testing';

import { LessoninfoService } from './lessoninfo.service';

describe('LessoninfoService', () => {
  let service: LessoninfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessoninfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
