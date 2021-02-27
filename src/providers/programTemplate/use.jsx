import { useContext } from "react";

import ProgramTemplateContext from "./context";

export const useProgramTemplate = () => {
  const contextValue = useContext(ProgramTemplateContext);
  if (contextValue === null) {
    throw new Error(
      "useProgramTemplate must be used within ProgramTemplateProvider tag"
    );
  }
  return contextValue;
};
