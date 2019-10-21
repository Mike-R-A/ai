export class Brain {
  currentSenseInputs: SenseInput[] = new Array(this.noOfSenses);
  currentState: Association[] = [];
  anticipatedStates: Association[][] = [];
  anticipatedInputs: SenseInput[][];
  shortTermMemory: Association[][] = [];

  constructor(private noOfSenses = 11, private previousStateWeighting = 5,
              private similarityBelow = 0.01, private howManyAnticipatedStates = 5) {
    this.currentState = this.getEmptyAssociations(this.noOfSenses);
  }

  inputToSenses(senseInputs: SenseInput[]) {
    this.currentSenseInputs = this.getCompleteSenseInputs(senseInputs);
    this.currentState = this.getUpdatedCurrentState(this.currentSenseInputs, this.currentState);
    this.anticipatedStates = this.getXmostSimilarAssociations(
      this.howManyAnticipatedStates, this.currentState, this.shortTermMemory);
    this.anticipatedInputs = this.anticipatedStates.map(a => {
      return this.getAnticipatedInputs(this.currentSenseInputs, a);
    });
    const mostAnticipatedState = this.anticipatedStates[0];
    const similarAssociations = this.getSimilarAssociations(this.currentState, this.shortTermMemory, this.similarityBelow);

    if (similarAssociations.length === 0) {
      // console.log('nothing similar');

      this.shortTermMemory = [...this.shortTermMemory, this.currentState];

    } else {
      // console.log('found similar');
      const associationInMemory = this.shortTermMemory.filter(s => s === similarAssociations[0])[0];
      const mergedMemory = this.getMergedAssociations(associationInMemory, this.currentState);
      this.shortTermMemory.splice(this.shortTermMemory.indexOf(associationInMemory), 1);
      this.shortTermMemory = [...this.shortTermMemory, mergedMemory];
    }
  }

  getAnticipatedInputForInputs(inputs: SenseInput[]) {
    const completeInputs = this.getCompleteSenseInputs(inputs);
    const state = this.getUpdatedCurrentState(completeInputs, this.currentState);
    const anticipatedStates = this.getXmostSimilarAssociations(
      this.howManyAnticipatedStates, state, this.shortTermMemory);
    return this.getAnticipatedInputs(completeInputs, anticipatedStates[0]);
  }

  getCompleteSenseInputs(senseInputs: SenseInput[]): SenseInput[] {
    const completeSenseInputs = [] as SenseInput[];
    for (let i = 0; i < this.noOfSenses; i++) {
      const input = senseInputs.filter(s => s.senseId === i)[0];
      completeSenseInputs.push({
        senseId: i,
        value: input ? input.value : 0
      });
    }
    return completeSenseInputs;
  }

  getUpdatedCurrentState(senseInputs: SenseInput[], currentState: Association[]) {
    const currentInputAssociations = this.getAssociationsBetweenCurrentInputs(senseInputs);
    const currentStateCopy = this.getMergedAssociations(currentInputAssociations, currentState);

    return this.getNormalisedAssociations(currentStateCopy);
  }

  private getMergedAssociations(associations1: Association[], associations2: Association[]) {
    const merged = [] as Association[];
    for (const inputAssociation of associations1) {
      const associationForUpdate = {
        ...this.getAssociationBySenseIds(associations2, inputAssociation.senseIds[0], inputAssociation.senseIds[1])
      };
      associationForUpdate.strength = (this.previousStateWeighting * associationForUpdate.strength
        + inputAssociation.strength) / (this.previousStateWeighting + 1);
      merged.push(associationForUpdate);
    }
    return merged;
  }

  getAssociationsBetweenCurrentInputs(senseInputs: SenseInput[]) {
    const unNormalisedAssociations = this.getEmptyAssociations(this.noOfSenses);
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
      return { ...u, strength: sum > 0 ? u.strength / sum : 0 } as Association;
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

  getMostSimilarAssociations(associations: Association[], associationPool: Association[][]) {
    let mostSimilarAssociation: Association[] = null;
    if (associationPool && associationPool.length > 0) {
      const associationsWithSimilarity = associationPool.map(a => {
        return {
          associations: a,
          similarity: this.getSimilarity(associations, a),
        };
      });
      mostSimilarAssociation = associationsWithSimilarity.reduce((x, y) => {
        return x.similarity < y.similarity ? x : y;
      }).associations;
    }
    return mostSimilarAssociation;
  }

  getXmostSimilarAssociations(x: number, associations: Association[], associationPool: Association[][]) {
    const pool = [...associationPool];
    const similarAssociations: Association[][] = [];
    for (let i = 0; i < x; i++) {
      if (pool && pool.length > 0) {
        const mostSimilarAssociations = this.getMostSimilarAssociations(associations, pool);
        similarAssociations.push(mostSimilarAssociations);
        pool.splice(pool.indexOf(mostSimilarAssociations, 1));
      } else {
        break;
      }
    }
    return similarAssociations;
  }

  getAnticipatedInputs(actualInputs: SenseInput[], associations: Association[]) {
    const anticipatedInputs = [] as SenseInput[];
    const inputs = this.getCompleteSenseInputs(actualInputs);
    if (associations) {
      for (const input of inputs) {
        const id = input.senseId;
        const thisIdsAssociations = associations.filter(a => a.senseIds.includes(id));
        const inputsStrengthsToAverage = [] as number[];
        for (const association of thisIdsAssociations) {
          const otherInputId = association.senseIds.filter(a => a !== id)[0];
          const inputForAverage = association.strength *
            inputs.filter(a => a.senseId === otherInputId)[0].value;
          inputsStrengthsToAverage.push(inputForAverage);
        }
        const length = inputsStrengthsToAverage.length;
        const sum = inputsStrengthsToAverage.reduce((x, y) => {
          return x + y;
        });
        const average = sum / length;
        anticipatedInputs.push({
          senseId: id,
          value: average
        });
      }
    }

    anticipatedInputs.sort((x, y) => {
      return y.value - x.value;
    });
    return anticipatedInputs;
  }
}
