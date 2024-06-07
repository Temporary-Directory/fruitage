import { View } from "react-native";

function Toggle({ color, marginRight }) {
  return (
    <View
      style={{
        marginRight: marginRight !== null ? marginRight : 0,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            width: 2,
            height: 2,
            backgroundColor: color,
            border: 90,
            margin: 1,
          }}
        ></View>
        <View
          style={{
            width: 2,
            height: 2,
            backgroundColor: color,
            border: 90,
            margin: 1,
          }}
        ></View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 2,
            height: 2,
            backgroundColor: color,
            border: 90,
            margin: 1,
          }}
        ></View>
        <View
          style={{
            width: 2,
            height: 2,
            backgroundColor: color,
            border: 90,
            margin: 1,
          }}
        ></View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 2,
            height: 2,
            backgroundColor: color,
            border: 90,
            margin: 1,
          }}
        ></View>
        <View
          style={{
            width: 2,
            height: 2,
            backgroundColor: color,
            border: 90,
            margin: 1,
          }}
        ></View>
      </View>
    </View>
  );
}

export default Toggle;
