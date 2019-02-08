import { TestBed, inject } from '@angular/core/testing';

import { MapquestService } from './mapquest.service';

describe('MapquestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapquestService]
    });
  });

  it('should be created', inject([MapquestService], (service: MapquestService) => {
    expect(service).toBeTruthy();
  }));
});
