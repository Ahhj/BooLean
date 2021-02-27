import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveObject(key, value) {
  const jsonValue = JSON.stringify(value);
  return AsyncStorage.setItem(`${key}`, jsonValue).catch((e) => {
    e;
  });
}

export async function loadObject(key, defaultValue) {
  return AsyncStorage.getItem(`${key}`)
    .then((jsonValue) => {
      return !!jsonValue ? JSON.parse(jsonValue) : defaultValue;
    })
    .catch((e) => {});
}

export async function removeItem(key) {
  try {
    await AsyncStorage.removeItem(`${key}`);
  } catch (e) {
    // remove error
  }
}

export async function getAllKeys() {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {}
  return keys; // .map((key) => key.split("@")[1]);
}

// export async function mergeItem(key, value) {
//   const jsonValue = JSON.stringify(value);
//   return AsyncStorage.mergeItem(`@${key}`, jsonValue).catch((e) => {
//     e;
//   });
// }
