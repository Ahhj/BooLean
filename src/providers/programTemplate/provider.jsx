import React, { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  saveObject,
  loadObject,
  removeItem,
  mergeItem,
  getAllKeys,
} from "../../storage";
import ProgramTemplateContext from "./context";

export default function ProgramTemplateProvider(props) {
  const [programTemplateKey, setProgramTemplateKey] = useState(
    props.programTemplateKey
  );
  const [workoutTemplateKeys, setWorkoutTemplateKeys] = useState([]);
  const [numberOfWeeks, setNumberOfWeeks] = useState(0);
  const [tags, setTags] = useState([]);
  const [shouldLoad, setShouldLoad] = useState(true);
  const [shouldSave, setShouldSave] = useState(false);
  //   const [shouldRemove, setShouldRemove] = useState(false);

  useEffect(() => {
    if (shouldLoad) {
      _load();
    }
    if (shouldSave) {
      _save();
    }
  }, [shouldLoad, shouldSave]);

  const _load = useCallback(() => {
    loadObject(programTemplateKey, {
      workoutTemplateKeys,
      numberOfWeeks,
      tags,
    }).then((data) => {
      setWorkoutTemplateKeys(data.workoutTemplateKeys);
      setNumberOfWeeks(data.numberOfWeeks);
      setTags(data.tags);
    });
    setShouldLoad(false);
  }, [programTemplateKey, workoutTemplateKeys, numberOfWeeks, tags]);

  const _save = useCallback(() => {
    saveObject(programTemplateKey, {
      workoutTemplateKeys,
      numberOfWeeks,
      tags,
    });
    setShouldSave(false);
  }, [programTemplateKey, workoutTemplateKeys, numberOfWeeks, tags]);

  const addWorkout = useCallback(
    (key) => {
      if (!workoutTemplateKeys.includes(key)) {
        setWorkoutTemplateKeys([...workoutTemplateKeys, key]);
      }
    },
    [workoutTemplateKeys]
  );

  const removeWorkout = useCallback(
    (workoutTemplateKey) => {
      setWorkoutTemplateKeys([
        ...workoutTemplateKeys.filter((key) => key !== workoutTemplateKey),
      ]);
      // TODO: clear storage
    },
    [workoutTemplateKeys]
  );

  const value = {
    state: { workoutTemplateKeys, numberOfWeeks, tags },
    actions: {
      save: () => setShouldSave(true),
      load: () => setShouldLoad(true),
      addWorkout,
      removeWorkout,
    },
  };

  return (
    <ProgramTemplateContext.Provider value={value}>
      {props.children}
    </ProgramTemplateContext.Provider>
  );
}
