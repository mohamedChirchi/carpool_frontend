import { TestBed } from '@angular/core/testing';

import { CssLoaderService } from './css-loader.service';

describe('CssLoaderService', () => {
  let service: CssLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CssLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
