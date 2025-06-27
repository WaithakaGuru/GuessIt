import { useReducer } from "react";
import { guessReducer, initalState } from "../guessReducer";

type GuessState = {
    trials: number,
    userGuess: number | null,
    gameStatus: string,
    playGameOn: boolean
}

export default function GuessGameUI () {

    function handleGuessInput(e: React.ChangeEvent<HTMLInputElement> ){
        dispatch({type:"UPDATE_GUESS", payload: Number(e.target.value)})
    }
        function handleUserGuess(currentGuessState: GuessState) {
        dispatch({type:"CHECK_GUESS", payload: currentGuessState.userGuess})
    }
    
    function handleNewGameBtn() {
        dispatch({type: "START_NEW_GAME"})
    }

    const [currentGuessState, dispatch] = useReducer(guessReducer, initalState);

    return(
        <>
            <header>
                <p className="game-header"><span className="logo">GuessIt</span> Number Guessing Game</p>
               <button className="new-game"
                onClick={handleNewGameBtn}
                disabled={currentGuessState.playGameOn}
                >New Game</button>
            </header>
            <div className="game-container">
                <p>{currentGuessState.trials} Trials Remaining</p>
                <input type="number" 
                className="guess-input" 
                placeholder="Enter your guess number"
                value={currentGuessState.userGuess|| 0}
                onChange={handleGuessInput}
                />
                <p className="game-status">{currentGuessState.gameStatus}</p>
                <button className="guess-btn"
                disabled={!currentGuessState.playGameOn}
                onClick={()=>handleUserGuess(currentGuessState)}
                >Guess</button>
            </div>
        </>
    )
}