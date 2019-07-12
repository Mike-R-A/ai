// export interface Association {
//     senseIds: number[];
//     strength: number;
// }

// export interface SenseInput {
//     senseId: number;
//     value: number;
// }

// const noOfSenses = 5;
// const previousStateWeighting = 1;
// const senseDangerValue = 5;

// export class Brain {
//     currentSenseInputs: SenseInput[] = new Array(noOfSenses);
//     currentState: Association[] = [];
//     anticipatedState: Association[] = [];
//     longTermMemory: Association[][] = [];

//     constructor() {
//         this.currentState = this.getEmptyAssociations(noOfSenses);
//         // for (const association of this.currentState) {
//         //     association.strength = 1;
//         // }
//         // this.currentState = this.getNormalisedAssociations(this.currentState);
//     }

//     inputToSenses(senseInputs: SenseInput[]) {
//         this.currentSenseInputs = senseInputs;
//         this.currentState = this.getUpdatedCurrentState(senseInputs);
//         // if (this.currentSenseInputs.filter(c => c.value > senseDangerValue).length > 0) {
//         //     this.longTermMemory.push(this.currentState);
//         // }
//     }

//     getUpdatedCurrentState(senseInputs: SenseInput[]) {
//         const currentInputAssociations = this.getAssociationsBetweenCurrentInputs(senseInputs);

//         for (const inputAssociation of currentInputAssociations) {
//             const associationForUpdate =
//                 this.getAssociationBySenseIds(currentInputAssociations, inputAssociation.senseIds[0], inputAssociation.senseIds[1]);

//             associationForUpdate.strength = (previousStateWeighting * associationForUpdate.strength
//                 + inputAssociation.strength) / (previousStateWeighting + 1);
//         }

//         return this.getNormalisedAssociations(currentInputAssociations);
//     }

//     getAssociationsBetweenCurrentInputs(senseInputs: SenseInput[]) {
//         const unNormalisedAssociations = this.getEmptyAssociations(noOfSenses);
//         for (let i = 0; i < senseInputs.length; i++) {
//             const senseInput1 = senseInputs[i];
//             const nextIndex = i + 1;
//             if (nextIndex < senseInputs.length) {
//                 for (let j = nextIndex; j < senseInputs.length; j++) {
//                     const senseInput2 = senseInputs[j];
//                     const association = this.getAssociationBySenseIds(unNormalisedAssociations, i, j);
//                     association.strength = senseInput1.value * senseInput2.value;
//                 }
//             }
//         }
//         return this.getNormalisedAssociations(unNormalisedAssociations);
//     }

//     getNormalisedAssociations(unNormalisedAssociations: Association[]) {
//         const sum = unNormalisedAssociations.map(u => u.strength).reduce((total, num) => {
//             return total + num;
//         });

//         const normalisedAssociations = unNormalisedAssociations.map(u => {
//             return { ...u, strength: u.strength / sum } as Association;
//         });

//         return normalisedAssociations;
//     }

//     getEmptyAssociations(numberOfSenses: number) {
//         const associations = [] as Association[];
//         for (let i = 0; i < numberOfSenses; i++) {
//             const nextIndex = i + 1;
//             if (nextIndex < numberOfSenses) {
//                 for (let j = nextIndex; j < numberOfSenses; j++) {
//                     associations.push({
//                         senseIds: [i, j],
//                         strength: 0
//                     } as Association);
//                 }
//             }
//         }
//         return associations;
//     }

//     getAssociationBySenseIds(associations: Association[], id1: number, id2: number) {
//         return associations.filter(a =>
//             a.senseIds.includes(id1) && a.senseIds.includes(id2)
//         )[0];
//     }
// }
