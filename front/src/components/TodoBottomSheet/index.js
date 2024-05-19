import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Dimensions,
  PanResponder,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const TodoBottomSheet = ({ visible, setVisible, create, onClose, date }) => {
  const screenHeight = Dimensions.get("screen").height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 400,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (visible) {
      resetBottomSheet.start();
    }
  }, [visible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setVisible(false);
    });
  };

  return (
    <Modal
      visible={visible}
      animationType={"fade"}
      transparent
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            ...styles.bottomSheetContainer,
            transform: [{ translateY: translateY }],
          }}
          {...panResponders.panHandlers}
        >
          <View
            style={{ width: "100%", paddingHorizontal: 35, paddingTop: 30 }}
          >
            <TouchableOpacity
              onPress={create ? closeModal : onClose}
              style={{ position: "absolute", top: 28, right: 35, zIndex: 1 }}
              activeOpacity={0.5}
            >
              {create ? (
                <AntDesign name="close" size={24} color="black" />
              ) : (
                <Ionicons name="trash" size={24} color="black" />
              )}
            </TouchableOpacity>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 29,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "800" }}>
                {create ? "새로운 " : ""}할 일
              </Text>
            </View>
            <View stlye={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 15, fontWeight: "700" }}>날짜</Text>
              <Text
                style={{ marginTop: 10, fontSize: 14 }}
              >{`${date.getFullYear()}년 ${date.getMonth() + 1 < 10 ? 0 : ""}${
                date.getMonth() + 1
              }월 ${date.getDate() < 10 ? 0 : ""}${date.getDate()}일`}</Text>
              <Text style={{ marginTop: 24, fontSize: 15, fontWeight: "700" }}>
                내용
              </Text>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TextInput
                  placeholder="할 일"
                  style={{
                    width: 80,
                    marginRight: 20,
                    fontSize: 14,
                  }}
                />
                <Text style={{ fontSize: 11, color: "#FF5154" }}>
                  * 할 일을 입력해주세요.
                </Text>
              </View>
              <Text style={{ marginTop: 24, fontSize: 15, fontWeight: "700" }}>
                카테고리
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 80,
                    paddingVertical: 4.5,
                    marginRight: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 6,
                    backgroundColor: "#f4f4f4",
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={{ fontSize: 12, color: "#aaa" }}>없음</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 12, color: "#FF5154" }}>
                  * 카테고리를 선택해주세요.
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 30, paddingHorizontal: 29 }}>
              <TouchableOpacity
                style={{
                  paddingVertical: 8.5,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 6,
                  backgroundColor: "#f4f4f4",
                }}
                activeOpacity={0.8}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "700", color: "#aaa" }}
                >
                  저장
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  background: {
    flex: 1,
  },
  bottomSheetContainer: {
    height: 360,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
  },
});

export default TodoBottomSheet;
