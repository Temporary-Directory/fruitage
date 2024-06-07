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

import CheckA from "../../assets/images/ic_check_aaa.png";
import TrashA from "../../assets/images/ic_trash_aaa.png";
import CheckF from "../../assets/images/ic_check_fff.png";
import Toggle from "../Toggle";
import DeleteBottomSheet from "../DeleteBottomSheet";

const CategorySettingBottomSheet = ({ visible, setVisible }) => {
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

  useEffect(() => {
    // TODO: [BE] GET /calendar/category
    var retList = [
      { categoryId: 0, categoryName: "Category-0", categoryColor: "#FF9798" },
      { categoryId: 1, categoryName: "Category-1", categoryColor: "#D7F8FD" },
      { categoryId: 2, categoryName: "Category-2", categoryColor: "#CEEE98" },
      { categoryId: 3, categoryName: "Category-3", categoryColor: "#FDCEA0" },
      { categoryId: 4, categoryName: "Category-4", categoryColor: "#DABEF6" },
      { categoryId: 5, categoryName: "Category-5", categoryColor: "#FFE195" },
      { categoryId: 6, categoryName: "Category-6", categoryColor: "#DEF7B2" },
      { categoryId: 7, categoryName: "Category-7", categoryColor: "#AECAB2" },
    ];

    setCategories(retList);
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
                  console.log("Create new category!!");
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
                      if (pressedCategory === null || pressedCategory !== ir) {
                        setPressedCategory(ir);
                        setPressedCategoryText(cat.categoryName);
                      } else {
                        setPressedColor(null);
                        setPressedCategory(null);
                      }
                    }}
                    style={({ pressed }) => [
                      styles.categoryOption,
                      pressed && styles.pressedCategoryOption,
                      pressedCategory === ir && styles.pressedCategoryOption,
                    ]}
                  >
                    {pressedCategory === ir ? (
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
                                onPress={() => setPressedColor(i)}
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
        func={() => console.log("delete category")}
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
