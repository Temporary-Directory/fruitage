import { StyleSheet, Text, View } from "react-native";
import SplashScreen from "./src/screens/SplashScreen";
import CharacterScreen from "./src/screens/CharacterScreen";
import LoginScreen from "./src/screens/LoginScreen";
import CharacterSettingScreen from "./src/screens/CharacterSettingScreen";
import NewFruitScreen from "./src/screens/NewFruitScreen";
import DictionaryScreen from "./src/screens/DictionaryScreen";

export default function App() {
  // return <SplashScreen />;
  // return <CharacterScreen />;
  // return <LoginScreen />;
  // return <CharacterSettingScreen />;
  // return <NewFruitScreen />;
  return <DictionaryScreen />;
}
