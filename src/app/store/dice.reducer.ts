import { createReducer, on } from "@ngrx/store";
import { diceActions } from "./dice.actions";
import { Dice } from "../models/dice";

export const initialValueDice: Dice = {
    values: [],
    total: 0
}

export const diceReducer = createReducer(
    initialValueDice,
    on(diceActions.reset, (value) => initialValueDice),
    on(diceActions.addValue, (state, {value}) => {

        const newDiceValue: Dice = {
            values: [...state.values, value],  
            total: state.total + value
        };

        console.log(newDiceValue)

        return newDiceValue;
    } ),
    on(diceActions.addMultiplesValues,  (state, {value}) => {

        const newDiceValue: Dice = {
            values: [...state.values, value],  
            total: 0
        };

        return newDiceValue;
    } ),
    on(diceActions.sumAllTheValues, (state) => {
        const totalSum = state.values.reduce((acc, value) => acc + value, 0);
        
        const newDiceValue: Dice = {
            values: [...state.values],
            total: totalSum
        };

        return newDiceValue;
    })
)