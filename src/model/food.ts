import { Square } from './drawing/square';

export class Food {
    body: Square;
    nutrition: number;
    poison: number;

    constructor(body: Square, nutrition: number, poison: number) {
        this.body = body;
        this.nutrition = nutrition;
        this.poison = poison;
    }
}
