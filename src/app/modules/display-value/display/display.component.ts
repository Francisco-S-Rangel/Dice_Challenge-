import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Dice } from '../../../models/dice';
import { TypeDiceService } from '../../../services/type-dice.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrl: './display.component.scss'
})
export class DisplayComponent implements OnInit {

  dice$!: Observable<Dice>;
  values: number[] = [];
  total: number = 0;
  color: number = 0;

  constructor(private store: Store<{ diceReducer: Dice }>,private typeDeviceService: TypeDiceService) {}

  ngOnInit() {
    this.dice$ = this.store.select("diceReducer");

    this.dice$.subscribe((dice: Dice) => {

      this.values = dice.values;
      this.total = dice.total;

      this.color = this.typeDeviceService.getCurrentTypeDice();

      console.log(this.color)
    })

  }

}
