import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Dimensions,
  PanResponder,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import { CALENDAR_API_SERVER } from "../../Config";

import CategoryBottomSheet from "../CategoryBottomSheet";
import Close3 from "../../assets/images/ic_close_333.png";
import Trash3 from "../../assets/images/ic_trash_333.png";
import DeleteBottomSheet from "../DeleteBottomSheet";

const TodoBottomSheet = ({
  visible,
  setVisible,
  create,
  onClose,
  date,
  todo,
  category,
}) => {
  const [categoryBottomSheetVisible, setCategoryBottomSheetVisible] =
    useState(false);
  const [deleteBottomSheetVisible, setDeleteBottomSheetVisible] =
    useState(false);

  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

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
      if (onClose) onClose();
      setContent("");
      setSelectedCategory(null);
      setVisible(false);
    });
  };

  useEffect(() => {
    if (todo) {
      setContent(todo.todoContent);
      setSelectedCategory(category);
    }
  }, [todo]);

  const onSubmitHandler = async () => {
    // Create a new to-do
    if (create) {
      if (content === "") {
        console.log("Content is empty.");
        return;
      }
      if (selectedCategory === null) {
        console.log("Category not selected.");
        return;
      }

      try {
        const x_auth = await AsyncStorage.getItem("authToken");
        const url = `${CALENDAR_API_SERVER}/todo`;

        await axios({
          method: "post",
          url: url,
          headers: { Authorization: `Bearer ${x_auth}` },
          data: {
            todoDate: `${date.getFullYear()}-${String(
              date.getMonth() + 1
            ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
            todoContent: content,
            categoryId: selectedCategory.categoryId,
          },
        })
          .then((response) => {
            if (response.status === 200) {
              closeModal();
            }
          })
          .catch((error) => {
            console.error("Error creating calendar's todo:", error);
          });
      } catch (error) {
        // Handle errors related to AsyncStorage or other issues here
        console.error("Error in onSubmitHandler (Create) function:", error);
      }
    } else {
      // update todo from BE
      try {
        const x_auth = await AsyncStorage.getItem("authToken");
        const url = `${CALENDAR_API_SERVER}/todo`;

        await axios({
          method: "put",
          url: url,
          headers: { Authorization: `Bearer ${x_auth}` },
          data: {
            todoId: todo.todoId,
            todoDate: todo.todoDate,
            todoContent: content,
            categoryId: selectedCategory.categoryId,
          },
        })
          .then((response) => {
            if (response.status === 200) {
              closeModal();
            }
          })
          .catch((error) => {
            console.error("Error updating calendar's todo:", error);
          });
      } catch (error) {
        // Handle errors related to AsyncStorage or other issues here
        console.error("Error in onSubmitHandler (Update) function:", error);
      }
    }
  };

  const onDeleteHandler = async () => {
    // delete todo from BE
    try {
      const x_auth = await AsyncStorage.getItem("authToken");
      const url = `${CALENDAR_API_SERVER}/todo/${todo.todoId}`;

      await axios({
        method: "delete",
        url: url,
        headers: { Authorization: `Bearer ${x_auth}` },
      })
        .then((response) => {
          if (response.status === 200) {
            closeModal();
          }
        })
        .catch((error) => {
          console.error("Error deleting calendar's todo:", error);
        });
    } catch (error) {
      // Handle errors related to AsyncStorage or other issues here
      console.error("Error in onDeleteHandler function:", error);
    }
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
              onPress={
                create
                  ? closeModal
                  : () => {
                      setDeleteBottomSheetVisible(true);
                    }
              }
              style={{ position: "absolute", top: 28, right: 35, zIndex: 1 }}
              activeOpacity={0.5}
            >
              <Image
                style={{ width: 22, height: 22 }}
                source={create ? Close3 : Trash3}
              />
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
                  value={content}
                  onChangeText={(text) => setContent(text)}
                  style={{
                    width: content === "" ? 80 : 290,
                    marginRight: 20,
                    fontSize: 14,
                  }}
                />
                {!content && (
                  <Text style={{ fontSize: 11, color: "#FF5154" }}>
                    * 할 일을 입력해주세요.
                  </Text>
                )}
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
                  onPress={() => setCategoryBottomSheetVisible(true)}
                  style={{
                    width: 80,
                    paddingVertical: 4.5,
                    marginRight: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 6,
                    backgroundColor:
                      selectedCategory === null
                        ? "#f4f4f4"
                        : selectedCategory.categoryColor,
                  }}
                  activeOpacity={0.8}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      color: selectedCategory === null ? "#aaa" : "black",
                    }}
                  >
                    {selectedCategory === null
                      ? "없음"
                      : selectedCategory.categoryName}
                  </Text>
                </TouchableOpacity>
                {selectedCategory === null ? (
                  <Text style={{ fontSize: 12, color: "#FF5154" }}>
                    * 카테고리를 선택해주세요.
                  </Text>
                ) : null}
              </View>
            </View>
            <View style={{ marginTop: 30, paddingHorizontal: 29 }}>
              <TouchableOpacity
                onPress={onSubmitHandler}
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

      <CategoryBottomSheet
        visible={categoryBottomSheetVisible}
        setVisible={setCategoryBottomSheetVisible}
        setSelected={setSelectedCategory}
      />
      <DeleteBottomSheet
        visible={deleteBottomSheetVisible}
        setVisible={setDeleteBottomSheetVisible}
        text={"할 일을 삭제하시겠습니까?"}
        func={onDeleteHandler}
      />
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
