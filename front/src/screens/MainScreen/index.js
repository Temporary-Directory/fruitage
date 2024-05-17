import { Text, View } from "react-native";

function MainScreen() {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <Text style={{ textAlign: "center" }}>Main Screen</Text>
    </View>
  );
}

export default MainScreen;
