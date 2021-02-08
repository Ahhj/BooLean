import React, { useState, createContext, useContext, useEffect } from "react";

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

      const exercises = ["Squat", "Bench Press", "Deadlift", "Something Else"];

      setState({ ...state, data, exercises, loaded: true });
    })();
  }, []);

  return <Context.Provider value={state}>{children}</Context.Provider>;
}
