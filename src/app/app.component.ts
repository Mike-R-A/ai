import { Component, OnInit } from '@angular/core';
import { Brain } from './brain';

enum Senses {
  Awake,
  Red,
  Orange,
  Yellow,
  Green,
  Fox,
  Sun,
  Apple,
  AnOrange,
  Grass,
  Pain,
  Pleasure
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
    this.brain = new Brain();
  }

  ngOnInit() { }

  input() {
    const fox = [
      {
        senseId: Senses.Fox,
        value: 3
      },
      {
        senseId: Senses.Red,
        value: 1
      }
    ] as SenseInput[];
    const apple = [
      {
        senseId: Senses.Apple,
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
    const grass = [
      {
        senseId: Senses.Grass,
        value: 3
      },
      {
        senseId: Senses.Green,
        value: 3
      },
    ] as SenseInput[];
    const sun = [
      {
        senseId: Senses.Sun,
        value: 3
      },
      {
        senseId: Senses.Yellow,
        value: 3
      },
    ] as SenseInput[];
    this.brain.inputToSenses([...fox]);
    this.consoleOutput('fox');
    this.brain.inputToSenses([...apple]);
    this.consoleOutput('apple');
    this.brain.inputToSenses([...green]);
    this.consoleOutput('green');
    this.brain.inputToSenses([...red]);
    this.consoleOutput('red');
    this.brain.inputToSenses([...grass]);
    this.consoleOutput('grass');
    this.brain.inputToSenses([...green]);
    this.consoleOutput('green');
    this.brain.inputToSenses([...sun]);
    this.consoleOutput('sun');
    this.brain.inputToSenses([...sun, ...grass]);
    this.consoleOutput('sun and grass');
    this.brain.inputToSenses([...green]);
    this.consoleOutput('green');
    this.brain.inputToSenses([...apple, ...sun, ...grass]);
    this.consoleOutput('apple, sun and grass');
    this.brain.inputToSenses([...apple]);
    this.consoleOutput('apple');
    this.brain.inputToSenses([...green]);
    this.consoleOutput('green');
    this.brain.inputToSenses([...grass]);
    this.consoleOutput('grass');
    this.brain.inputToSenses([...red]);
    this.consoleOutput('red');
    this.brain.inputToSenses([...red, ...green, ...yellow]);
    this.consoleOutput('red, green and yellow');

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
