import React, { useState, useEffect } from "react";
import { Animated, Easing, TouchableOpacity, StyleSheet } from "react-native";

const ToggleSwitch = ({ onToggle, isOn }) => {
  const [animatedValue] = useState(new Animated.Value(isOn ? 1 : 0));

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isOn ? 1 : 0,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [isOn, animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 28],
  });

  return (
    <TouchableOpacity
      style={{
        ...styles.toggleContainer,
        backgroundColor: isOn ? "#92DA15" : "#B66FFF",
      }}
      onPress={onToggle}
      activeOpacity={1}
    >
      <Animated.View
        style={{
          ...styles.toggleWheel,
          transform: [{ translateX }],
        }}
      />
    </TouchableOpacity>
  );
};

export default ToggleSwitch;

const styles = StyleSheet.create({
  toggleContainer: {
    width: 52,
    height: 24,
    borderRadius: 90,
    justifyContent: "center",
    backgroundColor: "gray",
  },
  toggleWheel: {
    marginHorizontal: 3,
    width: 18,
    height: 18,
    backgroundColor: "white",
    borderRadius: 90,

    // shadow
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowRadius: 25,
  },
});
