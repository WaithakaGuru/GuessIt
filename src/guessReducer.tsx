import generateRandomValue from "./utils/random";

export type GuessState = {
  trials: number;
  userGuess: string | number | "";
  gameStatus: string;
  secretNumber: number;
  playGameOn: boolean;
  win?: boolean
};

type ReducerAction = {
  type: string;
  payload?: any;
};

export const initalState: GuessState = {
  trials: 10,
  userGuess: "",
  secretNumber: 0,
  gameStatus: "",
  playGameOn: false,
};

export function guessReducer(
  previousGuessState: GuessState,
  action: ReducerAction,
): GuessState {
  switch (action.type) {
    case "START_NEW_GAME":
      return {
        ...previousGuessState,
        playGameOn: true,
        secretNumber: generateRandomValue(),
        trials: 10,
        userGuess: "",
        gameStatus: "Secret Number generated!! Enter your guess to play🫡",
      };

    case "UPDATE_GUESS":
      return { ...previousGuessState, userGuess: action.payload };

    case "CHECK_GUESS":
      if (previousGuessState.trials >= 1) {
        if (action.payload === previousGuessState.secretNumber)
          return {
            ...previousGuessState,
            playGameOn: false, win: true,
            gameStatus: `Victory🏆: Your score is ${previousGuessState.trials * 10}%`,
          };
        if (action.payload! < previousGuessState.secretNumber)
          return {
            ...previousGuessState,
            trials: previousGuessState.trials - 1,
            gameStatus: `${action.payload} is less than the secret number`,
          };
        else
          return {
            ...previousGuessState,
            trials: previousGuessState.trials - 1,
            gameStatus: `${action.payload} is greater than the secret number`,
          };
      } else
        return {
          ...previousGuessState,
          playGameOn: false,
          userGuess: "",
          gameStatus: `Failure😓: You ran out of Trials. Secret Number was: ${previousGuessState.secretNumber}`,
        };
  }
  return previousGuessState;
}
