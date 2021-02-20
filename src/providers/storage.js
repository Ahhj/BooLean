import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveObject(key, value) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(`@${key}`, jsonValue);
  } catch (e) {
    // saving error
  }
}

export async function loadObject(key) {
  try {
    const jsonValue = await AsyncStorage.getItem(`@${key}`);
    return !!jsonValue ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // read error
  }
}
