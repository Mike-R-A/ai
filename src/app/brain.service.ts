import { Injectable } from '@angular/core';

const noOfSenses = 5;
const previousStateWeighting = 5;
const similarityBelow = 0.1;

@Injectable({
  providedIn: 'root'
})
export class BrainService {
  currentSenseInputs: SenseInput[] = new Array(noOfSenses);
  currentState: Association[] = [];
  anticipatedStates: Association[][] = [];
  shortTermMemory: Association[][] = [];

  constructor() {
    this.currentState = this.getEmptyAssociations(noOfSenses);
  }

  inputToSenses(senseInputs: SenseInput[]) {
    this.currentSenseInputs = senseInputs;
    this.currentState = this.getUpdatedCurrentState(senseInputs, this.currentState);
    this.anticipatedStates = this.getSimilarAssociations(this.currentState, this.shortTermMemory, similarityBelow);
    if (this.anticipatedStates.length === 0) {
      this.shortTermMemory = [...this.shortTermMemory, this.currentState];
    }
  }

  getUpdatedCurrentState(senseInputs: SenseInput[], currentState: Association[]) {
    const currentInputAssociations = this.getAssociationsBetweenCurrentInputs(senseInputs);
    const currentStateCopy = this.getMergedAssociations(currentInputAssociations, currentState);

    return this.getNormalisedAssociations(currentStateCopy);
  }

  private getMergedAssociations(associations1: Association[], associations2: Association[]) {
    const merged = [...associations2];
    for (const inputAssociation of associations1) {
      const associationForUpdate = this.getAssociationBySenseIds(merged, inputAssociation.senseIds[0], inputAssociation.senseIds[1]);
      associationForUpdate.strength = (previousStateWeighting * associationForUpdate.strength
        + inputAssociation.strength) / (previousStateWeighting + 1);
    }
    return merged;
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

  getSimilarity(associations1: Association[], associations2: Association[]) {
    const differenceSquareds: number[] = [] as number[];
    for (const association1 of associations1) {
      const association2 = this.getAssociationBySenseIds(associations2, association1.senseIds[0], association1.senseIds[1]);
      const difference = association1.strength - association2.strength;
      differenceSquareds.push(Math.pow(difference, 2));
    }
    const length = differenceSquareds.length;
    const sum = differenceSquareds.reduce((x, y) => {
      return x + y;
    });
    const sd = Math.sqrt(sum / length);
    return sd;
  }

  getSimilarAssociations(associations: Association[], associationPool: Association[][], similaritySdValue: number) {
    let similarAssociations: Association[][] = [];
    for (const associationsForComparison of associationPool) {
      const similarity = this.getSimilarity(associations, associationsForComparison);
      if (similarity < similaritySdValue) {
        similarAssociations = [...similarAssociations, associationsForComparison];
      }
    }

    return similarAssociations;
  }
}
