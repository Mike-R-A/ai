import { Component, OnInit } from '@angular/core';
import { BrainService } from './brain.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '';
  constructor(private brain: BrainService) { }

  ngOnInit() { }

  input() {
    const senseInputs1 = [
      {
        senseId: 0,
        value: 1
      },
      {
        senseId: 1,
        value: 0
      },
      {
        senseId: 2,
        value: 0
      },
      {
        senseId: 3,
        value: 0
      },
      {
        senseId: 4,
        value: 1
      }
    ] as SenseInput[];
    const senseInputs2 = [
      {
        senseId: 0,
        value: 1
      },
      {
        senseId: 1,
        value: 1
      },
      {
        senseId: 2,
        value: 0
      },
      {
        senseId: 3,
        value: 0
      },
      {
        senseId: 4,
        value: 0
      }
    ] as SenseInput[];
    const senseInputs3 = [
      {
        senseId: 0,
        value: 1
      },
      {
        senseId: 1,
        value: 2
      },
      {
        senseId: 2,
        value: 0
      },
      {
        senseId: 3,
        value: 0
      },
      {
        senseId: 4,
        value: 2
      }
    ] as SenseInput[];
    const senseInputs4 = [
      {
        senseId: 0,
        value: 1
      },
      {
        senseId: 1,
        value: 2
      },
      {
        senseId: 2,
        value: 0
      },
      {
        senseId: 3,
        value: 2
      },
      {
        senseId: 4,
        value: 2
      }
    ] as SenseInput[];
    const senseInputs5 = [
      {
        senseId: 0,
        value: 1
      },
      {
        senseId: 1,
        value: 0
      },
      {
        senseId: 2,
        value: 0
      },
      {
        senseId: 3,
        value: 0
      },
      {
        senseId: 4,
        value: 1
      }
    ] as SenseInput[];
    this.brain.inputToSenses(senseInputs1);
    this.brain.inputToSenses(senseInputs2);
    this.brain.inputToSenses(senseInputs3);
    this.brain.inputToSenses(senseInputs4);
    this.brain.inputToSenses(senseInputs5);
    console.log(this.brain);
  }
}
