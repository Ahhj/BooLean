import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { saveObject, loadObject } from "./storage";

const WorkoutContext = createContext(null);

/* Session data hook
 */
export const useWorkoutContext = () => {
  const contextState = useContext(WorkoutContext);
  if (contextState === null) {
    throw new Error(
      "useWorkoutContext must be used within WorkoutContextProvider tag"
    );
  }
  return contextState;
};

/** Responsible for maintaining session state
 */
export default function WorkoutContextProvider({
  templateId,
  sessionId,
  sessionName,
  children,
}) {
  const [state, setState] = useState({
    templateId,
    sessionId,
    sessionName,
    exercises: [],
    loaded: false,
    active: false,
  });

  useEffect(() => {
    loadObject(templateId).then((loaded) => {
      var { exercises } = loaded;

      if (!exercises) {
        exercises = [];
      }

      if (!exercises.length) {
        exercises = [
          {
            key: "exercise-1",
            label: "Squat",
          },
          {
            key: "exercise-2",
            label: "Bench press",
          },
          {
            key: "exercise-3",
            label: "Deadlift",
          },
        ];
        if (templateId === 2) {
          exercises = [
            {
              key: "exercise-4",
              label: "Squat 2",
            },
            {
              key: "exercise-5",
              label: "Bench press 2",
            },
            {
              key: "exercise-6",
              label: "Deadlift 2",
            },
          ];
        }
      }
      setState({ ...state, exercises, loaded: true });
    });
  }, [templateId]);

  // Used by children to update the exercises
  const updateExercises = useCallback(
    (updated) => {
      setState({ ...state, exercises: updated });
      saveObject(templateId, { exercises: updated });
    },
    [state, setState]
  );

  const toggleActive = useCallback(() => {
    setState({ ...state, active: !state.active });
  }, [state, setState]);

  return (
    <WorkoutContext.Provider
      value={{ ...state, updateExercises, toggleActive }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}
