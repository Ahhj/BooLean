import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { saveObject, loadObject, removeItem } from "../storage";

const WorkoutContext = createContext(null);

/**
 * Maintains workout state and makes available to children.
 */
export default function WorkoutContextProvider({
  templateId,
  sessionId,
  sessionName,
  children,
}) {
  const [active, setActive] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [shouldSave, setShouldSave] = useState(false);

  const save = () => setShouldSave(true);
  const remove = useCallback(() => {
    setLoaded(false);
    removeItem(templateId);
  });

  /**
   * Load the exercises from storage.
   */
  const reload = useCallback(
    () =>
      loadObject(templateId)
        .then((loaded) => {
          var { exercises } = loaded;

          if (!exercises) {
            exercises = [];
          }

          if (!exercises.length) {
            exercises = [...defaultExercises[0]];
            if (templateId === 2) {
              exercises = [...defaultExercises[1]];
            }
          }

          setExercises(exercises);
          setLoaded(true);
        })
        .catch((e) => {
          setExercises([]);
          setLoaded(true);
        }),
    []
  );

  useEffect(() => {
    if (!loaded) {
      reload();
    }
  }, [loaded]);

  /**
   * Persist the state variables after the render
   * if the shouldSave flag is set to true.
   */
  useEffect(() => {
    if (shouldSave) {
      saveObject(templateId, { exercises });
    }
    setShouldSave(false);
  }, [shouldSave]);

  const toggleActive = useCallback(() => {
    setActive((active) => !active);
  });

  return (
    <WorkoutContext.Provider
      value={{
        templateId,
        exercises,
        active,
        reload,
        remove,
        setExercises,
        toggleActive,
        save,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

/**
 * Hook to access workout context state. Call in children
 * of WorkoutContextProvider
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

const defaultExercises = [
  [
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
  ],
  [
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
  ],
];
