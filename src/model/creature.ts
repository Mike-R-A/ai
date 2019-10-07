import { Brain } from 'src/app/brain';
import { Square } from './drawing/square';
import { SeleniumServer } from 'selenium-webdriver/remote';
import { Senses } from './Senses';
import { Input } from '@angular/core';

export class Creature {
    brain: Brain;
    body: Square;
    fullness = 0;
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

    eat(potentialFood: Square[]) {
        for (const food of potentialFood) {
            const isHorizontallyOverlapping = this.body.x + this.body.size > food.x && this.body.x < food.x + food.size;
            const isVerticallyOverlapping = this.body.y + this.body.size > food.y && this.body.y < food.y + food.size;

            if (isHorizontallyOverlapping && isVerticallyOverlapping) {
                console.log('ate');

                this.fullness += 1;
                console.log(food.size);

                if (food.size > 2) {
                    food.size--;
                } else {
                    console.log('spliced');

                    const index = potentialFood.indexOf(food);
                    potentialFood.splice(index, 1);
                }
            }
        }
        return [
            {
                senseId: Senses.Fullness,
                value: this.fullness
            }
        ];
    }

    moveLeft() {
        this.body.moveLeft();
        return [
            {
                senseId: Senses.Left,
                value: 1
            }
        ];
    }

    moveRight() {
        this.body.moveRight();
        return [
            {
                senseId: Senses.Right,
                value: 1
            }
        ];
    }

    moveUp() {
        this.body.moveUp();
        return [
            {
                senseId: Senses.Up,
                value: 1
            }
        ];
    }

    moveDown() {
        this.body.moveDown();
        return [
            {
                senseId: Senses.Down,
                value: 1
            }
        ];
    }

    stayStill() {
        return [
            {
                senseId: Senses.Stay,
                value: 1
            }
        ];
    }

    lookAround(up: number, right: number, down: number, left: number) {
        return [
            {
                senseId: Senses.Up,
                value: up
            },
            {
                senseId: Senses.Right,
                value: right
            },
            {
                senseId: Senses.Down,
                value: down
            },
            {
                senseId: Senses.Left,
                value: left
            }
        ];
    }

    chooseToMove() {
        let best: SenseInput[];
        let bestDifference = null;
        if (this.brain.anticipatedInputs && this.brain.anticipatedInputs.length > 0) {
            for (const input of this.brain.anticipatedInputs) {
                if (!best || best.length === 0) {
                    best = input;
                }
                let difference = 0;
                // for (const ideal of this.idealInputs) {
                // difference += Math.abs(ideal.value - input.filter(b => b.senseId === ideal.senseId)[0].value);
                // }
                difference = Math.abs(this.idealFullness - (this.fullness + input.filter(b => b.senseId === Senses.Fullness)[0].value));
                if (bestDifference === null) {
                    bestDifference = difference;
                } else {
                    if (difference < bestDifference) {
                        bestDifference = difference;
                        best = input;
                    }
                }
            }


            const anticipatedFullness = best.filter(b => b.senseId === Senses.Fullness)[0].value;
            if (anticipatedFullness > 0) {
                this.anticipatedFullness = anticipatedFullness;
            }

            const directionPredictions = best.filter(b =>
                [Senses.Up, Senses.Down, Senses.Left, Senses.Right, Senses.Stay].includes(b.senseId));
            directionPredictions.sort((a, b) => {
                return a.value - b.value;
            });

            const choice = directionPredictions.reduce((a, b) => {
                return b.value > a.value ? b : a;
            }).senseId;

            switch (choice) {
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
                case Senses.Stay: {
                    return this.stayStill();
                }
                default: {
                    return this.moveRandomly();
                }
            }
        }

        return [];
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
