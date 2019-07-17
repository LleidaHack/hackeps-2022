import { TestBed } from '@angular/core/testing';

import { FirebaeService } from './firebae.service';

describe('FirebaeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaeService = TestBed.get(FirebaeService);
    expect(service).toBeTruthy();
  });
});
