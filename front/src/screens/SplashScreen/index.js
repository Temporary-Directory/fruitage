import { View, Text, Image, StyleSheet } from "react-native";
import Splash from "../../assets/images/Splash.png";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image source={Splash} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
