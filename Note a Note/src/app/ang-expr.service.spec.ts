import { TestBed } from '@angular/core/testing';

import { AngExprService } from './ang-expr.service';

describe('AngExprService', () => {
  let service: AngExprService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngExprService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
