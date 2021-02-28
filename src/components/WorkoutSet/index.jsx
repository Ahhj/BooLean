import React from "react";
import { View, Text, TextInput } from "react-native";
import { textStyle, inputStyle } from "./style";

export default function WorkoutSet(props) {
  const { weight, reps, rpe } = props;
  const editable = !!props.editable;

  const getInputProps = (value) => {
    const textValue = `${value ? value : ""}`;
    return editable
      ? { placeholder: textValue }
      : { value: textValue, editable };
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <WeightInput {...getInputProps(weight)} />
      <Text style={textStyle}>{"x"}</Text>
      <RepsInput {...getInputProps(reps)} />
      <Text style={textStyle}>{"@"}</Text>
      <RPEInput {...getInputProps(rpe)} />
    </View>
  );
}

function WeightInput(props) {
  // TODO: validate < 500
  return (
    <View>
      <TextInput
        keyboardType={"numeric"}
        maxLength={5}
        style={{ ...inputStyle, width: 80 }}
        {...props}
      />
    </View>
  );
}

function RPEInput(props) {
  // TODO: only allow .5 increments
  return (
    <TextInput
      keyboardType={"decimal-pad"}
      maxLength={3}
      style={{ ...inputStyle, width: 70 }}
      {...props}
    />
  );
}

function RepsInput(props) {
  return (
    <TextInput
      keyboardType={"number-pad"}
      maxLength={2}
      style={{ ...inputStyle, width: 60 }}
      {...props}
    />
  );
}
