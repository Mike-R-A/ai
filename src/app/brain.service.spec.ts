import { TestBed } from '@angular/core/testing';

import { BrainService } from './brain.service';

describe('BrainService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BrainService = TestBed.get(BrainService);
    expect(service).toBeTruthy();
  });

  describe('inputToSenses', () => {
    it('should set the currentSenseInputs', () => {
      const service: BrainService = TestBed.get(BrainService);
      const testSenseInputs = [] as SenseInput[];
      service.inputToSenses(testSenseInputs);
      expect(service.currentSenseInputs).toBe(testSenseInputs);
    });
  });

  describe('getUpdatedCurrentState', () => {
    it('should', () => {
      const service: BrainService = TestBed.get(BrainService);
      const testSenseInputs = [] as SenseInput[];
      const result = service.getUpdatedCurrentState(testSenseInputs);

    });
  });

  describe('getAssociationsBetweenCurrentInputs', () => {
    it('should', () => {
      const service: BrainService = TestBed.get(BrainService);
      const testSenseInputs = [] as SenseInput[];
    });
  });
});
