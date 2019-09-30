import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Brain } from './brain';
import { Square } from 'src/model/drawing/square';
import { Creature } from 'src/model/creature';

enum Senses {
  Red,
  Orange,
  Yellow,
  Green,
  Blue,
  a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z,
  Pleasure,
  Pain
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  public food: Square[] = [];
  public creature: Creature;
  title = '';
  timeline: {
    inputs: SenseInput[],
    anticipatedInputs: SenseInput[][]
  }[] = [];

  constructor() {
  }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.creature = new Creature(new Brain(33, 5, 0.01, 5),
      new Square(this.random(this.ctx.canvas.width), this.random(this.ctx.canvas.height), 10, 'blue', this.ctx));
    this.drawSquares(5);

    setInterval(() => {
      this.creature.lookAround(this.getFoodScoreAbove(this.creature),
        this.getFoodScoreRight(this.creature),
        this.getFoodScoreBelow(this.creature),
        this.getFoodScoreLeft(this.creature));
    }, 1000);

    // this.input();
  }

  getDistance(x1: number, y1: number, x2: number, y2: number) {
    const xDiff = x2 - x1;
    const yDiff = y2 - y1;
    return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
  }

  drawSquares(n: number) {
    for (let i = 0; i < n; i++) {
      const x = this.random(this.ctx.canvas.width);
      const y = this.random(this.ctx.canvas.height);
      const square = new Square(x, y, 10, 'red', this.ctx);
      this.food.push(square);
    }
    console.log(this.food);
  }

  getFoodScoreAbove(creature: Creature) {
    let count = 0;
    for (const foodItem of this.food) {
      if (foodItem.y >= creature.body.y) {
        count += 1 / this.getDistance(creature.body.x, creature.body.y, foodItem.x, foodItem.y);
      }
    }
    return count;
  }

  getFoodScoreBelow(creature: Creature) {
    let count = 0;
    for (const foodItem of this.food) {
      if (foodItem.y > creature.body.y) {
        count += 1 / this.getDistance(creature.body.x, creature.body.y, foodItem.x, foodItem.y);
      }
    }
    return count;
  }

  getFoodScoreRight(creature: Creature) {
    let count = 0;
    for (const foodItem of this.food) {
      if (foodItem.x > creature.body.x) {
        count += 1 / this.getDistance(creature.body.x, creature.body.y, foodItem.x, foodItem.y);
      }
    }
    return count;
  }

  getFoodScoreLeft(creature: Creature) {
    let count = 0;
    for (const foodItem of this.food) {
      if (foodItem.x <= creature.body.x) {
        count += 1 / this.getDistance(creature.body.x, creature.body.y, foodItem.x, foodItem.y);
      }
    }
    return count;
  }

  random(max: number, min = 0) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  input() {
    const fFox = [
      {
        senseId: Senses.f,
        value: 3
      },
      {
        senseId: Senses.Red,
        value: 1
      }
    ] as SenseInput[];
    const oFox = [
      {
        senseId: Senses.o,
        value: 3
      },
      {
        senseId: Senses.Red,
        value: 1
      }
    ] as SenseInput[];
    const xFox = [
      {
        senseId: Senses.x,
        value: 3
      },
      {
        senseId: Senses.Red,
        value: 1
      }
    ] as SenseInput[];
    const aApple = [
      {
        senseId: Senses.a,
        value: 3
      },
      {
        senseId: Senses.Green,
        value: 1
      },
      {
        senseId: Senses.Pleasure,
        value: 2
      }
    ] as SenseInput[];
    const pApple = [
      {
        senseId: Senses.p,
        value: 3
      },
      {
        senseId: Senses.Green,
        value: 1
      },
      {
        senseId: Senses.Pleasure,
        value: 2
      }
    ] as SenseInput[];
    const lApple = [
      {
        senseId: Senses.l,
        value: 3
      },
      {
        senseId: Senses.Green,
        value: 1
      },
      {
        senseId: Senses.Pleasure,
        value: 2
      }
    ] as SenseInput[];
    const eApple = [
      {
        senseId: Senses.e,
        value: 3
      },
      {
        senseId: Senses.Green,
        value: 1
      },
      {
        senseId: Senses.Pleasure,
        value: 2
      }
    ] as SenseInput[];
    const green = [
      {
        senseId: Senses.Green,
        value: 3
      }
    ] as SenseInput[];
    const red = [
      {
        senseId: Senses.Red,
        value: 3
      }
    ] as SenseInput[];
    const yellow = [
      {
        senseId: Senses.Yellow,
        value: 3
      }
    ] as SenseInput[];
    const gGrass = [
      {
        senseId: Senses.g,
        value: 3
      },
      {
        senseId: Senses.Green,
        value: 3
      },
    ] as SenseInput[];
    const rGrass = [
      {
        senseId: Senses.r,
        value: 3
      },
      {
        senseId: Senses.Green,
        value: 3
      },
    ] as SenseInput[];
    const aGrass = [
      {
        senseId: Senses.a,
        value: 3
      },
      {
        senseId: Senses.Green,
        value: 3
      },
    ] as SenseInput[];
    const sGrass = [
      {
        senseId: Senses.s,
        value: 3
      },
      {
        senseId: Senses.Green,
        value: 3
      },
    ] as SenseInput[];
    const sSun = [
      {
        senseId: Senses.s,
        value: 3
      },
      {
        senseId: Senses.Yellow,
        value: 3
      },
      {
        senseId: Senses.Pleasure,
        value: 2
      },
    ] as SenseInput[];
    const uSun = [
      {
        senseId: Senses.u,
        value: 3
      },
      {
        senseId: Senses.Yellow,
        value: 3
      },
      {
        senseId: Senses.Pleasure,
        value: 2
      },
    ] as SenseInput[];
    const nSun = [
      {
        senseId: Senses.n,
        value: 3
      },
      {
        senseId: Senses.Yellow,
        value: 3
      },
      {
        senseId: Senses.Pleasure,
        value: 2
      },
    ] as SenseInput[];
    const f = [
      {
        senseId: Senses.f,
        value: 3
      }
    ] as SenseInput[];
    const o = [
      {
        senseId: Senses.o,
        value: 3
      }
    ] as SenseInput[];
    const x = [
      {
        senseId: Senses.x,
        value: 3
      }
    ] as SenseInput[];
    const a = [
      {
        senseId: Senses.a,
        value: 3
      }
    ] as SenseInput[];
    const p = [
      {
        senseId: Senses.p,
        value: 3
      }
    ] as SenseInput[];
    const l = [
      {
        senseId: Senses.l,
        value: 3
      }
    ] as SenseInput[];
    const e = [
      {
        senseId: Senses.e,
        value: 3
      }
    ] as SenseInput[];
    const s = [
      {
        senseId: Senses.s,
        value: 3
      }
    ] as SenseInput[];
    const u = [
      {
        senseId: Senses.u,
        value: 3
      }
    ] as SenseInput[];
    const n = [
      {
        senseId: Senses.n,
        value: 3
      }
    ] as SenseInput[];
    this.creature.brain.inputToSenses([...fFox]);
    this.snapshot();
    this.consoleOutput('hear f see red');
    this.creature.brain.inputToSenses([...oFox]);
    this.snapshot();
    this.consoleOutput('hear o see red');
    this.creature.brain.inputToSenses([...xFox]);
    this.snapshot();
    this.consoleOutput('hear x see red');
    this.creature.brain.inputToSenses([...aApple]);
    this.snapshot();
    this.creature.brain.inputToSenses([...fFox]);
    this.snapshot();
    this.consoleOutput('hear f see red');
    this.creature.brain.inputToSenses([...oFox]);
    this.snapshot();
    this.consoleOutput('hear o see red');
    this.creature.brain.inputToSenses([...xFox]);
    this.snapshot();
    this.consoleOutput('hear x see red');
    this.creature.brain.inputToSenses([...aApple]);
    this.snapshot();
    this.creature.brain.inputToSenses([...fFox]);
    this.snapshot();
    this.consoleOutput('hear f see red');
    this.creature.brain.inputToSenses([...oFox]);
    this.snapshot();
    this.consoleOutput('hear o see red');
    this.creature.brain.inputToSenses([...xFox]);
    this.snapshot();
    this.consoleOutput('hear x see red');
    this.creature.brain.inputToSenses([...aApple]);
    this.snapshot();
    this.creature.brain.inputToSenses([...fFox]);
    this.snapshot();
    this.consoleOutput('hear f see red');
    this.creature.brain.inputToSenses([...oFox]);
    this.snapshot();
    this.consoleOutput('hear o see red');
    this.creature.brain.inputToSenses([...xFox]);
    this.snapshot();
    this.consoleOutput('hear x see red');
    this.creature.brain.inputToSenses([...aApple]);
    this.snapshot();
    this.consoleOutput('hear a see green get pleasure');
    this.creature.brain.inputToSenses([...pApple]);
    this.snapshot();
    this.consoleOutput('hear p see green get pleasure');
    this.creature.brain.inputToSenses([...pApple]);
    this.snapshot();
    this.consoleOutput('hear p see green get pleasure');
    this.creature.brain.inputToSenses([...lApple]);
    this.snapshot();
    this.consoleOutput('hear l see green get pleasure');
    this.creature.brain.inputToSenses([...eApple]);
    this.snapshot();
    this.consoleOutput('hear e see green get pleasure');
    this.creature.brain.inputToSenses([...sSun]);
    this.snapshot();
    this.consoleOutput('hear s see yellow get pleasure');
    this.creature.brain.inputToSenses([...uSun]);
    this.snapshot();
    this.consoleOutput('hear u see yellow get pleasure');
    this.creature.brain.inputToSenses([...nSun]);
    this.snapshot();
    this.consoleOutput('hear n see yellow get pleasure');
    this.creature.brain.inputToSenses([...f]);
    this.snapshot();
    this.consoleOutput('f');
    this.creature.brain.inputToSenses([...green]);
    this.snapshot();
    this.consoleOutput('green');
    this.creature.brain.inputToSenses([...red]);
    this.snapshot();
    this.consoleOutput('red');
    this.creature.brain.inputToSenses([...f]);
    this.snapshot();
    this.consoleOutput('f');
    this.creature.brain.inputToSenses([...p]);
    this.snapshot();
    this.consoleOutput('p');
    this.creature.brain.inputToSenses([...fFox]);
    this.snapshot();
    this.consoleOutput('hear f see red');
    this.creature.brain.inputToSenses([...oFox]);
    this.snapshot();
    this.consoleOutput('hear o see red');
    this.creature.brain.inputToSenses([...xFox]);
    this.snapshot();
    this.consoleOutput('hear x see red');
    this.creature.brain.inputToSenses([...f]);
    this.snapshot();
    this.consoleOutput('f');
    this.creature.brain.inputToSenses([...o]);
    this.snapshot();
    this.consoleOutput('o');
    this.creature.brain.inputToSenses([...x]);
    this.snapshot();
    this.consoleOutput('x');


    console.log(this.creature.brain);

  }

  private snapshot() {
    this.timeline.push({
      inputs: [...this.creature.brain.currentSenseInputs],
      anticipatedInputs: [...this.creature.brain.anticipatedInputs]
    });
  }

  consoleOutput(message: string) {
    console.log('xxxxxxxxxxxxx ', message, ' xxxxxxxxxxxxxxxxxxxxxxx');
    for (const inputs of this.creature.brain.anticipatedInputs) {
      for (const input of inputs) {
        if (input.value > 0) {
          console.log(Senses[input.senseId], input.value);
        }
      }

      console.log('--------');
    }
  }
}
