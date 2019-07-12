import { Injectable } from '@angular/core';

const noOfSenses = 5;
const previousStateWeighting = 5;

@Injectable({
  providedIn: 'root'
})
export class BrainService {
  currentSenseInputs: SenseInput[] = new Array(noOfSenses);
  currentState: Association[] = [];
  anticipatedState: Association[] = [];
  shortTermMemory: Association[][] = [];

  constructor() {
    this.currentState = this.getEmptyAssociations(noOfSenses);
  }

  inputToSenses(senseInputs: SenseInput[]) {
    this.currentSenseInputs = senseInputs;
    this.currentState = this.getUpdatedCurrentState(senseInputs, this.currentState);
  }

  getUpdatedCurrentState(senseInputs: SenseInput[], currentState: Association[]) {
    const currentInputAssociations = this.getAssociationsBetweenCurrentInputs(senseInputs);
    const currentStateCopy = [...currentState];
    for (const inputAssociation of currentInputAssociations) {
      const associationForUpdate =
        this.getAssociationBySenseIds(currentStateCopy, inputAssociation.senseIds[0], inputAssociation.senseIds[1]);

      associationForUpdate.strength = (previousStateWeighting * associationForUpdate.strength
        + inputAssociation.strength) / (previousStateWeighting + 1);
    }

    return this.getNormalisedAssociations(currentStateCopy);
  }

  getAssociationsBetweenCurrentInputs(senseInputs: SenseInput[]) {
    const unNormalisedAssociations = this.getEmptyAssociations(noOfSenses);
    for (let i = 0; i < senseInputs.length; i++) {
      const senseInput1 = senseInputs[i];
      const nextIndex = i + 1;
      if (nextIndex < senseInputs.length) {
        for (let j = nextIndex; j < senseInputs.length; j++) {
          const senseInput2 = senseInputs[j];
          const association = this.getAssociationBySenseIds(unNormalisedAssociations, i, j);
          association.strength = senseInput1.value * senseInput2.value;
        }
      }
    }
    return this.getNormalisedAssociations(unNormalisedAssociations);
  }

  getNormalisedAssociations(unNormalisedAssociations: Association[]) {
    const sum = unNormalisedAssociations.map(u => u.strength).reduce((total, num) => {
      return total + num;
    });

    const normalisedAssociations = unNormalisedAssociations.map(u => {
      return { ...u, strength: u.strength / sum } as Association;
    });

    return normalisedAssociations;
  }

  getEmptyAssociations(numberOfSenses: number) {
    const associations = [] as Association[];
    for (let i = 0; i < numberOfSenses; i++) {
      const nextIndex = i + 1;
      if (nextIndex < numberOfSenses) {
        for (let j = nextIndex; j < numberOfSenses; j++) {
          associations.push({
            senseIds: [i, j],
            strength: 0
          } as Association);
        }
      }
    }
    return associations;
  }

  getAssociationBySenseIds(associations: Association[], id1: number, id2: number) {
    return associations.filter(a =>
      a.senseIds.includes(id1) && a.senseIds.includes(id2)
    )[0];
  }
}
