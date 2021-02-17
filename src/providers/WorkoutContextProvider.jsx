import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
} from "react";

const Context = createContext(null);

/* Session data hook
 */
export const useWorkoutContext = () => {
  const contextState = useContext(Context);
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
  sessionId,
  sessionName,
  children,
}) {
  const [state, setState] = useState({
    sessionId,
    sessionName,
    exercises: [],
    loaded: false,
    active: false,
  });

  useEffect(() => {
    (async () => {
      const data = {
        0: [
          {
            headerText: "Reps",
            selectedValue: 2,
            values: [1, 2, 3],
            onValueChange: (itemValue, itemIndex) => {},
          },
          {
            headerText: "RPE",
            selectedValue: 2,
            values: [1, 2, 3],
            onValueChange: (itemValue, itemIndex) => {},
          },
          {
            headerText: "Weight",
            selectedValue: 2,
            values: [1, 2, 3],
            onValueChange: (itemValue, itemIndex) => {},
          },
        ],
      };

      const exercises = [
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

      setState({ ...state, data, exercises, updateExercises, loaded: true });
    })();
  }, []);

  // Used by children to update the exercises
  const updateExercises = useCallback(
    (updated) => {
      setState({ ...state, exercises: updated });
    },
    [state, setState]
  );

  const toggleActive = useCallback(() => {
    setState({ ...state, active: !state.active });
  }, [state, setState]);

  return (
    <Context.Provider value={{ ...state, updateExercises, toggleActive }}>
      {children}
    </Context.Provider>
  );
}
