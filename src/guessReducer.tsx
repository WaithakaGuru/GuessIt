import generateRandomValue from "./utils/random"

export type GuessState = {
    trials: number,
    userGuess: number | null,
    gameStatus: string,
    secretNumber: number
    playGameOn: boolean
}

type ReducerAction = {
    type: string,
    payload?: number | null 
}


export const initalState: GuessState = {
    trials: 10, userGuess: null, secretNumber: 0,
    gameStatus: "", playGameOn: false
}

export function guessReducer(previousGuessState: GuessState, action: ReducerAction) : GuessState {
    switch(action.type) {
        case "START_NEW_GAME":
            return {...previousGuessState, playGameOn: true, 
                secretNumber: generateRandomValue(), trials: 10,
                gameStatus: "Secret Number generated!! Enter you guess to play🫡"
            }

        case "UPDATE_GUESS":
            if(action.payload)
            return{...previousGuessState, userGuess: action.payload}
        break;

        case "CHECK_GUESS": 
            if(previousGuessState.trials > 1){
                if(action.payload === previousGuessState.secretNumber) 
                    return {...previousGuessState, playGameOn: false, userGuess: null,
                    gameStatus: `Victory🏆: Your score is ${previousGuessState.trials * 10} %`}
                if(action.payload! <  previousGuessState.secretNumber)
                return {...previousGuessState, trials: previousGuessState.trials - 1,
                    userGuess: null,
                    gameStatus:`${action.payload} is less than the secret number`}
                else return {...previousGuessState, trials: previousGuessState.trials - 1,
                    userGuess: null,
                    gameStatus: `${action.payload} is greater than the secret number`}
            }else return {...previousGuessState, playGameOn: false,
                 userGuess: null,
                 gameStatus: `Failure😓: You ran out of Trials. Secret Number was: ${ previousGuessState.secretNumber}`
                }
    }
    return previousGuessState
}