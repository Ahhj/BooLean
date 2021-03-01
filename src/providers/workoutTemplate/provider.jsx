import React, { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { saveObject, loadObject, removeItem } from "../../storage";
import WorkoutTemplateContext from "./context";
import { useProgramTemplate } from "../programTemplate/use";

export default function WorkoutTemplateProvider(props) {
  const [workoutTemplateKey, setWorkoutTemplateKey] = useState(
    props.workoutTemplateKey
  );
  const { actions: programActions } = useProgramTemplate();

  const [sets, setSets] = useState([]);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [shouldSave, setShouldSave] = useState(false);
  const [shouldRemove, setShouldRemove] = useState(false);

  useEffect(() => {
    if (!workoutTemplateKey) {
      const newKey = uuidv4();
      setWorkoutTemplateKey(newKey);
    }

    if (workoutTemplateKey) {
      if (shouldLoad) {
        _load();
      }
      if (shouldSave) {
        _save();
      }
      if (shouldRemove) {
        _remove();
      }
    }
  }, [workoutTemplateKey, shouldLoad, shouldSave, shouldRemove]);

  // Don't call directly: call setShouldLoad(true) instead
  const _load = useCallback(() => {
    loadObject(workoutTemplateKey, { sets }).then(({ sets }) => {
      setSets(sets);
    });
    setShouldLoad(false);
  }, [workoutTemplateKey]);

  // Don't call directly: call setShouldSave(true) instead
  const _save = useCallback(() => {
    saveObject(workoutTemplateKey, { sets })
      .then(() => programActions.addWorkout(workoutTemplateKey))
      .then(() => setShouldSave(false));
  }, [workoutTemplateKey, sets]);

  // Don't call directly: call setShouldRemove(true) instead
  const _remove = useCallback(() => {
    removeItem(workoutTemplateKey)
      .then(() => programActions.removeWorkout(workoutTemplateKey))
      .then(() => setShouldRemove(false));
  }, [workoutTemplateKey]);

  const addSet = useCallback(() => {
    const newSet = {
      setKey: uuidv4(),
    };
    setSets([...sets, newSet]);
  }, [sets]);

  const removeSet = useCallback(
    (setKey) => setSets([...sets.filter((set) => set.setKey !== setKey)]),
    [sets]
  );

  const providerValue = {
    state: {
      workoutTemplateKey,
      sets,
      saving: shouldSave,
      loading: shouldLoad,
      removing: shouldRemove,
    },
    actions: {
      save: () => setShouldSave(true),
      load: () => setShouldLoad(true),
      remove: () => setShouldRemove(true),
      addSet,
      removeSet,
    },
  };

  return (
    <WorkoutTemplateContext.Provider value={providerValue}>
      {props.children}
    </WorkoutTemplateContext.Provider>
  );
}
