import { TestBed } from '@angular/core/testing';

import { FixtureGeneratorService } from './fixture-generator.service';

describe('FixtureGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FixtureGeneratorService = TestBed.get(FixtureGeneratorService);
    expect(service).toBeTruthy();
  });
});
