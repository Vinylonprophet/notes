import { TestBed } from '@angular/core/testing';

import { GetNameResolver } from './get-name.resolver';

describe('GetNameResolver', () => {
  let resolver: GetNameResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GetNameResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
