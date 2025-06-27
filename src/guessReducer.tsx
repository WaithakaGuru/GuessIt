import React, { useReducer } from "react";
import generateRandomValue from "./utils/random"

type GuessState = {
    trials: number,
    userGuess: number | null,
    gameStatus: string,
    playGameOn: boolean
}

type ReducerAction = {
    type: string,
    payload?: number | null 
}

const SecretGuessNumber =  generateRandomValue();

const initalState: GuessState = {
    trials: 10, userGuess: null, gameStatus: "", playGameOn: false
}

export function handleGuessInput(e: React.ChangeEvent<HTMLInputElement> ){
   dispatch({type:"UPDATE_GUESS", payload: Number(e.target.value)})
}

export function handleUserGuess(currentGuessState: GuessState) {
    dispatch({type:"CHECK_GUESS", payload: currentGuessState.userGuess})
}

export function handleNewGameBtn() {
    dispatch({type: "START_NEW_GAME"})
}

function guessReducer(previousGuessState: GuessState, action: ReducerAction) : GuessState {
    switch(action.type) {
        case "START_NEW_GAME":
            return {...previousGuessState, playGameOn: true,
                gameStatus: "Secret Number generated!! Enter you guess to play🫡"
            }

        case "UPDATE_GUESS":
            if(action.payload)
            return{...previousGuessState, userGuess: action.payload}

        case "CHECK_GUESS": 
            if(previousGuessState.trials > 0){
                if(action.payload === SecretGuessNumber) 
                    return {...previousGuessState, trials: 10,
                    gameStatus: `Victory🏆: Your score is ${previousGuessState.trials * 10} %`}
                if(action.payload! < SecretGuessNumber)
                return {...previousGuessState, trials: previousGuessState.trials - 1,
                    gameStatus:`${action.payload} is less than the secret number`}
                else return {...previousGuessState, trials: previousGuessState.trials - 1,
                    gameStatus: `${action.payload} is greater than the secret number`}
            }else return {...previousGuessState, playGameOn: false,
                 gameStatus: `Failure😓: You ran out of Trials. Secret Number was: ${SecretGuessNumber}`
                }
    }
    return previousGuessState
}

export const [currentGuessState, dispatch] = useReducer(guessReducer, initalState);

