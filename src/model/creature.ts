import { Brain } from 'src/app/brain';
import { Square } from './drawing/square';

export class Creature {
    brain: Brain;
    body: Square;

    constructor(brain: Brain, body: Square) {
        this.brain = brain;
        this.body = body;
    }

    moveLeft() {
        this.body.moveLeft();
        this.brain.inputToSenses([
            {
                senseId: 1,
                value: 1
            }
        ]);
        console.log(this.brain.anticipatedInputs);
    }

    moveRight() {
        this.body.moveRight();
        this.brain.inputToSenses([
            {
                senseId: 2,
                value: 1
            }
        ]);
        console.log(this.brain.anticipatedInputs);
    }

    moveUp() {
        this.body.moveUp();
        this.brain.inputToSenses([
            {
                senseId: 3,
                value: 1
            }
        ]);
        console.log(this.brain.anticipatedInputs);
    }

    moveDown() {
        this.body.moveDown();
        this.brain.inputToSenses([
            {
                senseId: 4,
                value: 1
            }
        ]);
        console.log(this.brain.anticipatedInputs);
    }

    stayStill() {
        this.brain.inputToSenses([
            {
                senseId: 5,
                value: 1
            }
        ]);
        console.log(this.brain.anticipatedInputs);
    }

    lookAround(up: number, right: number, down: number, left: number) {
        this.brain.inputToSenses([
            {
                senseId: 6,
                value: up
            },
            {
                senseId: 7,
                value: right
            },
            {
                senseId: 8,
                value: down
            },
            {
                senseId: 9,
                value: left
            }
        ]);
        console.log(this.brain.anticipatedInputs);
    }
}
