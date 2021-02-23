import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveObject(key, value) {
  const jsonValue = JSON.stringify(value);
  return AsyncStorage.setItem(`@${key}`, jsonValue).catch((e) => {
    e;
  });
}

export async function loadObject(key) {
  return AsyncStorage.getItem(`@${key}`)
    .then((jsonValue) => {
      return !!jsonValue ? JSON.parse(jsonValue) : null;
    })
    .catch((e) => {});
}

export async function removeItem(key) {
  return AsyncStorage.removeItem(`@${key}`)
    .then(() => true)
    .catch((e) => {});
}

export async function listItems() {
  return AsyncStorage.getAllKeys((keys) => keys);
}
