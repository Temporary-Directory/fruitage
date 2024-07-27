import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Image,
  TextInput,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  PanResponder,
  ScrollView,
  Pressable,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { CALENDAR_API_SERVER } from "../../Config";

import CheckA from "../../assets/images/ic_check_aaa.png";
import TrashA from "../../assets/images/ic_trash_aaa.png";
import CheckF from "../../assets/images/ic_check_fff.png";
import Toggle from "../Toggle";
import DeleteBottomSheet from "../DeleteBottomSheet";

const CategorySettingBottomSheet = ({ visible, setVisible, onClose }) => {
  const [deleteBottomSheetVisible, setDeleteBottomSheetVisible] =
    useState(false);

  const [newCategoryText, setNewCategoryText] = useState("");
  const [categories, setCategories] = useState([]);
  const [pressedCategory, setPressedCategory] = useState(null);
  const [pressedCategoryText, setPressedCategoryText] = useState("");
  const [pressedColor, setPressedColor] = useState(null);

  const colors = [
    "#FE7375",
    "#FEB587",
    "#FED762",
    "#52C47E",
    "#47C4D7",
    "#C58BFE",
    "#FDB3D7",
    "#444444",
  ];

  const createCategory = async () => {
    // Post categories to BE
    try {
      const x_auth = await AsyncStorage.getItem("authToken");
      const url = `${CALENDAR_API_SERVER}/category`;

      await axios({
        method: "post",
        url: url,
        headers: { Authorization: `Bearer ${x_auth}` },
        data: {
          categoryName: newCategoryText,
          categoryColor: "#F4F4F4",
        },
      })
        .then((response) => {
          if (response.status === 200) {
            getCategories();
          }
        })
        .catch((error) => {
          console.error("Error fetching calendar's categories:", error);
        });
    } catch (error) {
      // Handle errors related to AsyncStorage or other issues here
      console.error("Error in getCategories function:", error);
    }
  };

  const updateCategory = async () => {
    // Update categories to BE
    try {
      const x_auth = await AsyncStorage.getItem("authToken");
      const url = `${CALENDAR_API_SERVER}/category`;

      await axios({
        method: "put",
        url: url,
        headers: { Authorization: `Bearer ${x_auth}` },
        data: {
          categoryId: pressedCategory.categoryId,
          categoryName: pressedCategoryText,
          categoryColor:
            pressedColor !== null
              ? colors[pressedColor]
              : pressedCategory.categoryColor,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            setPressedCategory(null);
            setPressedCategoryText(null);
            setPressedColor(null);
            getCategories();
          }
        })
        .catch((error) => {
          console.error("Error updating calendar's category:", error);
        });
    } catch (error) {
      // Handle errors related to AsyncStorage or other issues here
      console.error("Error in updateCategory function:", error);
    }
  };

  const deleteCategory = async () => {
    // Delete categories to BE
    try {
      const x_auth = await AsyncStorage.getItem("authToken");
      const url = `${CALENDAR_API_SERVER}/category/${pressedCategory.categoryId}`;
      console.log(url);

      await axios({
        method: "delete",
        url: url,
        headers: { Authorization: `Bearer ${x_auth}` },
      })
        .then((response) => {
          if (response.status === 200) {
            setDeleteBottomSheetVisible(false);
            getCategories();
          }
        })
        .catch((error) => {
          console.error("Error deleting calendar's category:", error);
        });
    } catch (error) {
      // Handle errors related to AsyncStorage or other issues here
      console.error("Error in deleteCategory function:", error);
    }
  };

  const getCategories = async () => {
    // Get categories from BE
    try {
      const x_auth = await AsyncStorage.getItem("authToken");
      const url = `${CALENDAR_API_SERVER}/category`;

      await axios({
        method: "get",
        url: url,
        headers: { Authorization: `Bearer ${x_auth}` },
      })
        .then((response) => {
          const categoryList = response.data;
          setCategories(categoryList);
        })
        .catch((error) => {
          console.error("Error fetching calendar's categories:", error);
        });
    } catch (error) {
      // Handle errors related to AsyncStorage or other issues here
      console.error("Error in getCategories function:", error);
    }
  };

  useEffect(() => {
    // Get /calendar/category from BE
    getCategories();
  }, []);

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
      onClose();
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
            style={{
              flex: 1,
              width: "100%",
              paddingHorizontal: 20,
              paddingTop: 26,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 14,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "800" }}>
                카테고리 설정
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 7,
                paddingHorizontal: 10,
                backgroundColor: "#f9f9f9",
                borderColor: "#f4f4f4",
                borderWidth: 1,
                borderRadius: 4,
              }}
            >
              <TextInput
                placeholder="새로운 카테고리 생성"
                style={{
                  flex: 1,
                  display: "flex",
                  paddingRight: 6,
                  fontSize: 12,
                }}
                value={newCategoryText}
                onChangeText={setNewCategoryText}
              />
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  createCategory();
                }}
              >
                <Image
                  style={{ width: 15, height: 15, padding: 10 }}
                  source={CheckA}
                />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={{
                marginTop: 10,
                marginBottom: 28,
              }}
              showsVerticalScrollIndicator={false}
            >
              {categories.map((cat, ir) => {
                return (
                  <Pressable
                    key={ir}
                    onPress={() => {
                      if (
                        pressedCategory === null ||
                        (pressedCategory &&
                          pressedCategory.categoryId !== cat.categoryId)
                      ) {
                        setPressedCategory(cat);
                        setPressedCategoryText(cat.categoryName);
                      } else {
                        setPressedColor(null);
                        setPressedCategory(null);
                        setPressedCategoryText(null);
                      }
                    }}
                    style={({ pressed }) => [
                      styles.categoryOption,
                      pressed && styles.pressedCategoryOption,
                      pressedCategory &&
                        pressedCategory.categoryId === cat.categoryId &&
                        styles.pressedCategoryOption,
                    ]}
                  >
                    {pressedCategory &&
                    pressedCategory.categoryId === cat.categoryId ? (
                      <>
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginVertical: 5.5,
                          }}
                        >
                          <Toggle color={"#a5a4a1"} />
                          <TextInput
                            placeholder="카테고리 이름을 입력해주세요."
                            value={pressedCategoryText}
                            onChangeText={setPressedCategoryText}
                            style={{
                              flex: 1,
                              backgroundColor: "white",
                              display: "flex",
                              borderWidth: 1,
                              borderColor: "#e1e1e1",
                              marginHorizontal: 11,
                              paddingHorizontal: 8,
                              paddingVertical: 4,
                              fontSize: 12,
                              borderRadius: 4,
                            }}
                          />
                          <TouchableOpacity
                            onPress={updateCategory}
                            activeOpacity={0.6}
                            style={{ marginRight: 5 }}
                          >
                            <Image
                              style={{ width: 20, height: 20 }}
                              source={CheckA}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              setDeleteBottomSheetVisible(true);
                            }}
                            activeOpacity={0.6}
                          >
                            <Image
                              style={{ width: 20, height: 20 }}
                              source={TrashA}
                            />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            marginTop: 5.5,
                            marginBottom: 8,
                          }}
                        >
                          <Toggle marginRight={11} />
                          {colors.map((c, i) => {
                            return (
                              <Pressable
                                key={i}
                                onPress={() => {
                                  setPressedColor(i);
                                }}
                                activeOpacity={0.8}
                                style={({ pressed }) => [
                                  styles.colorBtn,
                                  { backgroundColor: c },
                                ]}
                              >
                                {pressedColor === i && (
                                  <Image
                                    style={{ width: 12, height: 12 }}
                                    source={CheckF}
                                  />
                                )}
                              </Pressable>
                            );
                          })}
                        </View>
                      </>
                    ) : (
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Toggle color={"#a5a4a1"} />
                          <View
                            style={{
                              ...styles.categoryBtn,
                              backgroundColor:
                                cat !== null ? cat.categoryColor : "",
                            }}
                            disabled={cat !== null ? false : true}
                            activeOpacity={0.8}
                          >
                            <Text
                              style={{
                                fontSize: 10,
                              }}
                            >
                              {cat !== null ? cat.categoryName : ""}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <View
                            style={{
                              width: 2,
                              height: 2,
                              backgroundColor: "#a5a4a1",
                              border: 90,
                              margin: 1,
                            }}
                          ></View>
                          <View
                            style={{
                              width: 2,
                              height: 2,
                              backgroundColor: "#a5a4a1",
                              border: 90,
                              margin: 1,
                            }}
                          ></View>
                          <View
                            style={{
                              width: 2,
                              height: 2,
                              backgroundColor: "#a5a4a1",
                              border: 90,
                              margin: 1,
                            }}
                          ></View>
                        </View>
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </Animated.View>
      </View>

      <DeleteBottomSheet
        visible={deleteBottomSheetVisible}
        setVisible={setDeleteBottomSheetVisible}
        text={"카테고리를 삭제하시겠습니까?"}
        func={deleteCategory}
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
    height: 390,
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
  },
  categoryOption: {
    alignItems: "center",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 0.2,
    marginBottom: 4,
  },
  pressedCategoryOption: {
    backgroundColor: "#f6f6f6",
  },
  categoryBtn: {
    width: 76,
    paddingVertical: 6,
    marginHorizontal: 11,
    marginVertical: 5.5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "#F9F9F9",
  },
  colorBtn: {
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    marginRight: 10,
  },
});

export default CategorySettingBottomSheet;
