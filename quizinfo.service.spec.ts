import { TestBed } from '@angular/core/testing';

import { QuizinfoService } from './quizinfo.service';

describe('QuizinfoService', () => {
  let service: QuizinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
