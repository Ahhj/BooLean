import { useContext } from "react";

import WorkoutTemplateContext from "./context";

export const useWorkoutTemplate = () => {
  const contextValue = useContext(WorkoutTemplateContext);
  if (contextValue === null) {
    throw new Error(
      "useWorkoutTemplate must be used within WorkoutTemplateProvider tag"
    );
  }
  return contextValue;
};
