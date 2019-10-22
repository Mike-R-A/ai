import { Brain } from 'src/app/brain';
import { Square } from './drawing/square';
import { SeleniumServer } from 'selenium-webdriver/remote';
import { Senses } from './Senses';
import { Input } from '@angular/core';
import { Food } from './food';

export class Creature {
    brain: Brain;
    body: Square;
    fullness = 10;
    damage = 0;
    // idealInputs: SenseInput[] = [
    //     {
    //         senseId: Senses.Fullness,
    //         value: 100
    //     }
    // ];
    idealFullness = 100;
    anticipatedFullness = 0;
    context: CanvasRenderingContext2D;

    constructor(brain: Brain, body: Square, context: CanvasRenderingContext2D) {
        this.brain = brain;
        this.body = body;
        this.context = context;
    }

    eat(potentialFood: Food[]) {
        let result: SenseInput[] = [];
        for (const food of potentialFood) {
            const isHorizontallyOverlapping = this.body.x + this.body.size > food.body.x && this.body.x < food.body.x + food.body.size;
            const isVerticallyOverlapping = this.body.y + this.body.size > food.body.y && this.body.y < food.body.y + food.body.size;

            if (isHorizontallyOverlapping && isVerticallyOverlapping) {
                if (this.damage > food.nutrition) {
                    this.damage -= food.nutrition;
                } else {
                    this.damage = 0;
                    this.fullness += food.nutrition;
                }
                if (this.fullness > food.poison) {
                    this.fullness -= food.poison;
                } else {
                    this.fullness = 0;
                    this.damage += food.poison;
                }
                if (food.body.size > 2) {
                    food.body.size--;
                } else {
                    const index = potentialFood.indexOf(food);
                    potentialFood.splice(index, 1);
                }
                result = result.concat([
                    {
                        senseId: Senses.Eating,
                        value: food.nutrition
                    }
                ]);
            }
        }
        result = result.concat([
            {
                senseId: Senses.Fullness,
                value: this.fullness
            },
            {
                senseId: Senses.Damage,
                value: this.damage
            }
        ]);
        console.log('result', result);

        return result;
    }

    moveLeft() {
        console.log('left');
        this.body.moveLeft();
        return [
            {
                senseId: Senses.Left,
                value: 0.1
            }
        ];
    }

    moveRight() {
        console.log('right');
        this.body.moveRight();
        return [
            {
                senseId: Senses.Right,
                value: 0.1
            }
        ];
    }

    moveUp() {
        console.log('up');
        this.body.moveUp();
        return [
            {
                senseId: Senses.Up,
                value: 0.1
            }
        ];
    }

    moveDown() {
        console.log('down');
        this.body.moveDown();
        return [
            {
                senseId: Senses.Down,
                value: 0.1
            }
        ];
    }

    stayStill() {
        console.log('stay');
        this.body.stayStill();
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
            score: this.body.y < this.context.canvas.height ?
                this.getAnticipatedScore(Senses.Up, Senses.Fullness) - this.getAnticipatedScore(Senses.Up, Senses.Damage)
                : Number.NEGATIVE_INFINITY
        };
        const moveRightScore = {
            key: Senses.Right,
            score: this.body.x < this.context.canvas.width ?
                this.getAnticipatedScore(Senses.Right, Senses.Fullness) - this.getAnticipatedScore(Senses.Right, Senses.Damage)
                : Number.NEGATIVE_INFINITY
        };
        const moveDownScore = {
            key: Senses.Down,
            score: this.body.y > 0 ?
                this.getAnticipatedScore(Senses.Down, Senses.Fullness) - this.getAnticipatedScore(Senses.Down, Senses.Damage)
                : Number.NEGATIVE_INFINITY
        };
        const moveLeftScore = {
            key: Senses.Left,
            score: this.body.x > 0 ?
                this.getAnticipatedScore(Senses.Left, Senses.Fullness) - this.getAnticipatedScore(Senses.Left, Senses.Damage)
                : Number.NEGATIVE_INFINITY
        };
        const stayStillScore = {
            key: Senses.Stay,
            score: this.getAnticipatedScore(Senses.Stay, Senses.Fullness) - this.getAnticipatedScore(Senses.Stay, Senses.Damage)
        };

        console.log('up', moveUpScore, 'right', moveRightScore, 'down', moveDownScore, 'left', moveLeftScore, 'stay', stayStillScore);

        const arrayForCalc = [stayStillScore, moveUpScore, moveRightScore, moveDownScore, moveLeftScore];

        const best = arrayForCalc.reduce((e, l) => e.score > l.score ? e : l).key;

        console.log('best is: ', best);


        if (arrayForCalc.every(x => x === arrayForCalc[0])) {
            return this.moveRandomly();
        }

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
