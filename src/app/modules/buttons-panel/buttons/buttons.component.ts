import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { diceActions } from '../../../store/dice.actions';
import { Dice } from '../../../models/dice';
import { TypeDiceService } from '../../../services/type-dice.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss'
})
export class ButtonsComponent implements OnInit {


  multiplier: number = 1;
  dice$!: Observable<Dice>;
  buttons: number[] = [ 4, 6, 8, 10, 12, 20 ];
  loader: boolean = false;
  
  constructor(private store: Store<{ diceReducer: Dice }>,
    private typeDeviceService: TypeDiceService){}

  ngOnInit() {
    this.dice$ = this.store.select("diceReducer");
  }
 
  add(number: number){

    this.loader = true;

    this.restart();
    this.typeDeviceService.setCurrentTypeDice(number);

    let times: number = this.multiplier;

    let value: number = 1;

    if(times === 1){
      value = Math.floor(Math.random() * number) + 1;

      this.store.dispatch(diceActions.addValue({ value }));
      this.loader = false;

    }else {

      let count = 0;

      const addValueWithDelay = () => {

        value = Math.floor(Math.random() * number) + 1;
        this.store.dispatch(diceActions.addMultiplesValues({value}));
        count++;

        if(count < times ){
          setTimeout(addValueWithDelay, 1000);
        }else {
          this.store.dispatch(diceActions.sumAllTheValues());
          this.loader = false;
        }

      };

      addValueWithDelay();

    }

  }

  restart(){
    this.store.dispatch(diceActions.reset());
  }

}
