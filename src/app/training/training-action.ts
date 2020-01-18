import { Action } from "@ngrx/store";
import { IExercise } from "./exercise.model";

export const AVAILABLE_EXERCISES = "AVAILABLE_EXERCISES";
export const FINISHED_EXERCISES = "FINISHED_EXERCISES";
export const START_EXERCISE = "START_EXERCISE";
export const STOP_EXERCISE = "STOP_EXERCISE";

export class SetAvailableExercises implements Action {
  readonly type = AVAILABLE_EXERCISES;

  constructor(public payload: IExercise[]) {}
}

export class SetFinishedExercises implements Action {
  readonly type = FINISHED_EXERCISES;

  constructor(public payload: IExercise[]) {}
}

export class SetStartExercise implements Action {
  readonly type = START_EXERCISE;

  constructor(public payload: string) {}
}

export class SetStopExercise implements Action {
  readonly type = STOP_EXERCISE;

  //constructor(public payload: IExercise) {}
}

export type TrainingAction =
  | SetAvailableExercises
  | SetFinishedExercises
  | SetStartExercise
  | SetStopExercise;
