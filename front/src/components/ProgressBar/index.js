import React from "react";
import { View, StyleSheet } from "react-native";

const ProgressBar = ({ score }) => {
  // Ensure score is between 0 and 100
  const clampedScore = Math.max(0, Math.min(30, score));

  // Calculate the width of the filled portion of the progress bar
  const progressWidth = (clampedScore / 30) * 300;

  return (
    <View style={styles.progressBar}>
      <View style={{ ...styles.progress, width: progressWidth }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    overflow: "hidden",
    width: 300,
    height: 12,
    marginTop: 8,
    marginBottom: 6,
    borderRadius: 90,
    backgroundColor: "#e1e1e1",
  },
  progress: {
    height: "100%",
    backgroundColor: "#292929",
    transition: "width 0.3s ease",
  },
  label: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProgressBar;
