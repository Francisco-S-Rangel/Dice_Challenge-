import { createAction, props } from "@ngrx/store";

export const RESET = 'Reset';
export const ADDVALUE = 'AddValue';
export const ADDMULTIPLEVALUES = 'AddMultipleValues';
export const SUMALLVALUES = 'SumAllValues';

export const diceActions = {

    //Obj Dice 
    reset: createAction(RESET),
    addValue: createAction(ADDVALUE, props<{value: number}>()),
    addMultiplesValues: createAction(ADDMULTIPLEVALUES, props<{value: number}>()),
    sumAllTheValues: createAction(SUMALLVALUES)

}