import {
  TrainingAction,
  AVAILABLE_EXERCISES,
  FINISHED_EXERCISES,
  START_EXERCISE,
  STOP_EXERCISE
} from "./training-action";
import { IExercise } from "./exercise.model";
import * as fromRoot from "../app-reducer.module";
import { createSelector, createFeatureSelector } from "@ngrx/store";

export interface TrainingState {
  AvailableExercise: IExercise[];
  FinishedExercise: IExercise[];
  ActiveExercise: IExercise;
}

export interface State extends fromRoot.State {
  trainings: TrainingState;
}

const initialState: TrainingState = {
  AvailableExercise: [],
  FinishedExercise: [],
  ActiveExercise: null
};

export function trainingReducer(state = initialState, action: TrainingAction) {
  switch (action.type) {
    case AVAILABLE_EXERCISES:
      return {
        ...state,
        AvailableExercise: action.payload
      };
    case FINISHED_EXERCISES:
      return {
        ...state,
        FinishedExercise: action.payload
      };
    case START_EXERCISE:
      return {
        ...state,
        ActiveExercise: {
          ...state.AvailableExercise.find(
            exercise => exercise.id === action.payload
          )
        }
      };
    case STOP_EXERCISE:
      return {
        ...state,
        ActiveExercise: null
      };
    default: {
      return state;
    }
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>(
  "training"
);
export const getAvailableExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.AvailableExercise
);
export const getFinishedExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.FinishedExercise
);
export const getActiveExercise = createSelector(
  getTrainingState,
  (state: TrainingState) => state.ActiveExercise
);
export const IsActiveExercise = createSelector(
  getTrainingState,
  (state: TrainingState) => state.ActiveExercise != null
);
