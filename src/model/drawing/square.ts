export class Square {
    private color = 'red';
    public x = 0;
    public y = 0;
    public size = 30;

    constructor(x: number, y: number, z: number, color: string, private ctx: CanvasRenderingContext2D) {
        this.x = x;
        this.y = y;
        this.size = z;
        this.color = color;
    }

    moveRight(distance = 1) {
        this.x += distance;
        this.draw();
    }

    moveLeft(distance = 1) {
        this.x -= distance;
        this.draw();
    }

    moveUp(distance = 1) {
        this.y += distance;
        this.draw();
    }

    moveDown(distance = 1) {
        this.y -= distance;
        this.draw();
    }

    stayStill() {
        this.draw();
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}
