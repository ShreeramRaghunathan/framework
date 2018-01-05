import { TestBed, inject } from '@angular/core/testing';

import { JsonParserService } from './json-parser.service';

describe('JsonParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsonParserService]
    });
  });

  it('should be created', inject([JsonParserService], (service: JsonParserService) => {
    expect(service).toBeTruthy();
  }));
});
