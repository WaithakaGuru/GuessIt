import { useReducer } from "react";
import { guessReducer, initalState } from "../guessReducer";

type GuessState = {
  trials: number;
  userGuess: string | number | "";
  gameStatus: string;
  playGameOn: boolean;
};

export default function GuessGameUI() {
  function handleUserGuess(currentGuessState: GuessState) {
    const rawGuess = currentGuessState.userGuess;

    const guess =
      rawGuess === ""
        ? ""
        : rawGuess === null
          ? null
          : typeof rawGuess === "string"
            ? Number(rawGuess)
            : rawGuess;

    dispatch({ type: "CHECK_GUESS", payload: guess });
  }

  function handleGuessInput(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: "UPDATE_GUESS",
      payload: e.target.value,
    });
  }

  function handleNewGameBtn() {
    dispatch({ type: "START_NEW_GAME" });
  }

  const [currentGuessState, dispatch] = useReducer(guessReducer, initalState);

  return (
    <>
      <header>
        <p className="game-header">
          <span className="logo">GuessIt</span> Number Guessing Game
        </p>
        <button
          className="new-game"
          onClick={handleNewGameBtn}
          disabled={currentGuessState.playGameOn}
        >
          New Game
        </button>
      </header>
      <div className="game-container">
        {currentGuessState.playGameOn ? (
          <p
            className={currentGuessState.trials === 0 ? "no-trials" : "trials"}
          >
            {currentGuessState.trials} Trials Remaining
          </p>
        ) : (
          <p className="game-instruction">
            Guess a number between 0 to 100 (click 'New Game' to play)
          </p>
        )}
        <input
          type="number"
          className="guess-input"
          value={currentGuessState.userGuess}
          placeholder="Enter your guess number"
          onChange={handleGuessInput}
        />
        <p className={currentGuessState.trials <= 1 ? "no-trials" : "trials"}>
          {currentGuessState.gameStatus}
        </p>
        <button
          className="guess-btn"
          disabled={!currentGuessState.playGameOn}
          onClick={() => handleUserGuess(currentGuessState)}
        >
          Guess
        </button>
      </div>
    </>
  );
}
