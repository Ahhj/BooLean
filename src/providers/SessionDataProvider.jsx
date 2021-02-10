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
export const useSessionData = () => {
  const contextState = useContext(Context);
  if (contextState === null) {
    throw new Error(
      "useSessionData must be used within SessionDataProvider tag"
    );
  }
  return contextState;
};

/** Responsible for maintaining session state
 * TODO: rename to WorkoutProvider (session is confusing)
 */
export default function SessionDataProvider({
  sessionId,
  sessionName,
  children,
}) {
  const [state, setState] = useState({
    sessionId,
    sessionName,
    exercises: [],
    loaded: false,
  });
  // TODO: allow update of context state by children

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

      setState({ ...state, data, exercises, setExercises, loaded: true });
    })();
  }, []);

  const setExercises = useCallback(
    (updated) => {
      setState({ ...state, exercises: updated });
    },
    [state, setState]
  );

  return (
    <Context.Provider value={{ data: state, setExercises }}>
      {children}
    </Context.Provider>
  );
}
