import { Component, OnInit } from '@angular/core';
import { Brain } from './brain';

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
  title = '';
  brain: Brain;
  constructor() {
    this.brain = new Brain(33, 5, 0.01, 5);
  }

  ngOnInit() { }

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
    this.brain.inputToSenses([...fFox]);
    this.consoleOutput('hear f see fox');
    this.brain.inputToSenses([...oFox]);
    this.consoleOutput('hear o see fox');
    this.brain.inputToSenses([...xFox]);
    this.consoleOutput('hear x see fox');
    this.brain.inputToSenses([...aApple]);
    this.consoleOutput('hear a see apple');
    this.brain.inputToSenses([...pApple]);
    this.consoleOutput('hear p see apple');
    this.brain.inputToSenses([...pApple]);
    this.consoleOutput('hear p see apple');
    this.brain.inputToSenses([...lApple]);
    this.consoleOutput('hear l see apple');
    this.brain.inputToSenses([...eApple]);
    this.consoleOutput('hear e see apple');
    this.brain.inputToSenses([...sSun]);
    this.consoleOutput('hear s see sun');
    this.brain.inputToSenses([...uSun]);
    this.consoleOutput('hear u see sun');
    this.brain.inputToSenses([...nSun]);
    this.consoleOutput('hear n see sun');
    this.brain.inputToSenses([...f]);
    this.consoleOutput('f');
    this.brain.inputToSenses([...green]);
    this.consoleOutput('green');
    this.brain.inputToSenses([...red]);
    this.consoleOutput('red');
    this.brain.inputToSenses([...f]);
    this.consoleOutput('f');
    this.brain.inputToSenses([...p]);
    this.consoleOutput('p');
    this.brain.inputToSenses([...fFox]);
    this.consoleOutput('hear f see fox');
    this.brain.inputToSenses([...oFox]);
    this.consoleOutput('hear o see fox');
    this.brain.inputToSenses([...xFox]);
    this.consoleOutput('hear x see fox');
    this.brain.inputToSenses([...f]);
    this.consoleOutput('f');
    this.brain.inputToSenses([...o]);
    this.consoleOutput('o');
    this.brain.inputToSenses([...x]);
    this.consoleOutput('x');


    console.log(this.brain);

  }

  consoleOutput(message: string) {
    console.log('xxxxxxxxxxxxx ', message, ' xxxxxxxxxxxxxxxxxxxxxxx');
    for (const inputs of this.brain.anticipatedInputs) {
      for (const input of inputs) {
        if (input.value > 0) {
          console.log(Senses[input.senseId], input.value);
        }
      }

      console.log('--------');
    }
  }
}
