import { Brain } from 'src/app/brain';
import { Square } from './drawing/square';
import { SeleniumServer } from 'selenium-webdriver/remote';
import { Senses } from './Senses';
import { Input } from '@angular/core';
import { Food } from './food';

export class Creature {
    brain: Brain;
    body: Square;
    fullness = 0;
    damage = 0;
    // idealInputs: SenseInput[] = [
    //     {
    //         senseId: Senses.Fullness,
    //         value: 100
    //     }
    // ];
    idealFullness = 100;
    anticipatedFullness = 0;

    constructor(brain: Brain, body: Square) {
        this.brain = brain;
        this.body = body;
    }

    eat(potentialFood: Food[]) {
        for (const food of potentialFood) {
            const isHorizontallyOverlapping = this.body.x + this.body.size > food.body.x && this.body.x < food.body.x + food.body.size;
            const isVerticallyOverlapping = this.body.y + this.body.size > food.body.y && this.body.y < food.body.y + food.body.size;

            if (isHorizontallyOverlapping && isVerticallyOverlapping) {
                this.fullness += food.nutrition;
                this.damage += food.poison;
                if (food.body.size > 2) {
                    food.body.size--;
                } else {
                    const index = potentialFood.indexOf(food);
                    potentialFood.splice(index, 1);
                }
            }
        }
        return [
            {
                senseId: Senses.Fullness,
                value: this.fullness
            },
            {
                senseId: Senses.Damage,
                value: this.damage
            }
        ];
    }

    moveLeft() {
        this.body.moveLeft();
        return [
            {
                senseId: Senses.Left,
                value: 0.1
            }
        ];
    }

    moveRight() {
        this.body.moveRight();
        return [
            {
                senseId: Senses.Right,
                value: 0.1
            }
        ];
    }

    moveUp() {
        this.body.moveUp();
        return [
            {
                senseId: Senses.Up,
                value: 0.1
            }
        ];
    }

    moveDown() {
        this.body.moveDown();
        return [
            {
                senseId: Senses.Down,
                value: 0.1
            }
        ];
    }

    stayStill() {
        return [
            {
                senseId: Senses.Stay,
                value: 0.1
            }
        ];
    }

    lookAround(up: number, right: number, down: number, left: number) {
        return [
            {
                senseId: Senses.FoodUp,
                value: up
            },
            {
                senseId: Senses.FoodRight,
                value: right
            },
            {
                senseId: Senses.FoodDown,
                value: down
            },
            {
                senseId: Senses.FoodLeft,
                value: left
            }
        ];
    }

    // chooseToMove() {
    //     let best: SenseInput[];
    //     let bestDifference = null;
    //     let dontCare = true;
    //     if (this.brain.anticipatedInputs && this.brain.anticipatedInputs.length > 0) {
    //         for (const input of this.brain.anticipatedInputs) {
    //             console.log('in loop');

    //             if (!best || best.length === 0) {
    //                 best = input;
    //             }
    //             const difference = Math.abs(this.idealFullness -
    //                 (this.fullness + input.filter(b => b.senseId === Senses.Fullness)[0].value))
    //                 + Math.abs((this.damage + input.filter(b => b.senseId === Senses.Damage)[0].value));

    //             if (bestDifference === null) {
    //                 bestDifference = difference;
    //             } else {
    //                 if (difference < bestDifference) {
    //                     bestDifference = difference;
    //                     best = input;
    //                 }
    //                 if (difference !== bestDifference) {
    //                     dontCare = false;
    //                     console.log('do care');

    //                 }
    //             }
    //         }


    //         const anticipatedFullness = best.filter(b => b.senseId === Senses.Fullness)[0].value;
    //         if (anticipatedFullness > 0) {
    //             this.anticipatedFullness = anticipatedFullness;
    //         }

    //         const directionPredictions = best.filter(b =>
    //             [Senses.Up, Senses.Down, Senses.Left, Senses.Right, Senses.Stay].includes(b.senseId));
    //         directionPredictions.sort((a, b) => {
    //             return a.value - b.value;
    //         });


    //         const nonZeroDirections = directionPredictions.filter(d => d.value > 0);

    //         let choice: SenseInput = null;
    //         if (nonZeroDirections.length > 0 && dontCare === false) {
    //             choice = nonZeroDirections.reduce((a, b) => {
    //                 return b.value > a.value ? b : a;
    //             });
    //         } else {
    //             return this.moveRandomly();
    //         }


    //         console.log('choice', choice);


    //         switch (choice.senseId) {
    //             case Senses.Up: {
    //                 return this.moveUp();
    //             }
    //             case Senses.Right: {
    //                 return this.moveRight();
    //             }
    //             case Senses.Down: {
    //                 return this.moveDown();
    //             }
    //             case Senses.Left: {
    //                 return this.moveLeft();
    //             }
    //             case Senses.Stay: {
    //                 return this.stayStill();
    //             }
    //         }
    //     }

    //     return [];
    // }

    chooseToMove() {

        const moveUpScore = {
            key: Senses.Up,
            score: this.getAnticipatedScore(Senses.Up, Senses.Fullness) - this.getAnticipatedScore(Senses.Up, Senses.Damage)
        };
        const moveRightScore = {
            key: Senses.Right,
            score: this.getAnticipatedScore(Senses.Right, Senses.Fullness) - this.getAnticipatedScore(Senses.Right, Senses.Damage)
        };
        const moveDownScore = {
            key: Senses.Down,
            score: this.getAnticipatedScore(Senses.Down, Senses.Fullness) - this.getAnticipatedScore(Senses.Down, Senses.Damage)
        };
        const moveLeftScore = {
            key: Senses.Left,
            score: this.getAnticipatedScore(Senses.Left, Senses.Fullness) - this.getAnticipatedScore(Senses.Left, Senses.Damage)
        };
        const stayStillScore = {
            key: Senses.Stay,
            score: this.getAnticipatedScore(Senses.Stay, Senses.Fullness) - this.getAnticipatedScore(Senses.Stay, Senses.Damage)
        };


        const best = [moveUpScore, moveRightScore, moveDownScore, moveLeftScore, stayStillScore]
            .reduce((l, e) => e.score > l.score ? e : l).key;

        switch (best) {
            case Senses.Up: {
                return this.moveUp();
            }
            case Senses.Right: {
                return this.moveRight();
            }
            case Senses.Down: {
                return this.moveDown();
            }
            case Senses.Left: {
                return this.moveLeft();
            }
            default: {
                return this.stayStill();
            }
        }
    }


    private getAnticipatedScore(idToInput: Senses, idToOutput: Senses) {
        if (this.brain.currentSenseInputs && this.brain.currentSenseInputs.length > 0) {
            const joinedInputs = [
                ...this.brain.currentSenseInputs.filter(c => c.senseId !== idToInput),
                {
                    senseId: idToInput,
                    value: 1
                }

            ];
            const anticipatedInput = this.brain.getAnticipatedInputForInputs(joinedInputs).filter(i => i.senseId === idToOutput)[0];
            if (anticipatedInput) {
                return anticipatedInput.value;
            }
        }
        return 0;
    }

    moveRandomly() {
        const rand = Math.floor(Math.random() * 5);
        switch (rand) {
            case 0: {
                return this.moveUp();
            }
            case 1: {
                return this.moveRight();
            }
            case 2: {
                return this.moveDown();
            }
            case 3: {
                return this.moveLeft();
            }
            case 4: {
                return this.stayStill();
            }
        }
    }
}
