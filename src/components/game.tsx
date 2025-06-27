import { currentGuessState, handleGuessInput, handleNewGameBtn, handleUserGuess } from "../guessReducer";
export default function GuessGameUI () {
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
                <input type="text" 
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