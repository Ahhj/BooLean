import React from "react";
import {} from "react-native";

import {} from "@storybook/addon-actions";
import {} from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react-native";

import CenterView from "../CenterView";
import WorkoutSet from "../../../src/components/WorkoutSet";

storiesOf("WorkoutSet", module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add("is editable", () => (
    <WorkoutSet editable={true} weight={100} reps={10} rpe={7} />
  ))
  .add("is not editable", () => (
    <WorkoutSet editable={false} weight={100} reps={10} rpe={7} />
  ));
