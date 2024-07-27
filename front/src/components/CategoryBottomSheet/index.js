import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Image,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  PanResponder,
  ScrollView,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { CALENDAR_API_SERVER } from "../../Config";

import SettingA from "../../assets/images/ic_setting_aaa.png";
import CategorySettingBottomSheet from "../CategorySettingBottomSheet";

const CategoryBottomSheet = ({ visible, setVisible, setSelected }) => {
  const [categories, setCategories] = useState([]);
  const [
    categorySettingBottomSheetVisible,
    setCategorySettingBottomSheetVisible,
  ] = useState(false);

  const getCategories = async () => {
    // get categories from BE
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

          // Format Categories to [nx3]
          var formattedCategories = [];
          for (var i = 0; i < categoryList.length; i += 3) {
            var tmp = [];
            for (var j = 0; j < 3; j++) {
              if (i + j < categoryList.length) {
                tmp.push(categoryList[i + j]);
              } else {
                tmp.push(null);
              }
            }

            formattedCategories.push(tmp);
          }

          setCategories(formattedCategories);
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
    // [BE] GET /calendar/category
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
              //   paddingHorizontal: 40,
              paddingTop: 26,
            }}
          >
            <TouchableOpacity
              onPress={() => setCategorySettingBottomSheetVisible(true)}
              style={{ position: "absolute", top: 24, right: 35, zIndex: 1 }}
              activeOpacity={0.5}
            >
              <Image style={{ width: 22, height: 22 }} source={SettingA} />
            </TouchableOpacity>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 14,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "800" }}>카테고리</Text>
            </View>
            <ScrollView
              style={{
                flex: 2,
                // backgroundColor: "tomato",
                marginBottom: 28,
              }}
              showsVerticalScrollIndicator={false}
            >
              {categories.map((catRow, ir) => {
                return (
                  <View
                    key={ir}
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {catRow.map((cat, i) => {
                      return (
                        <TouchableOpacity
                          key={i}
                          onPress={() => {
                            setSelected(cat);
                            closeModal();
                          }}
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
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </Animated.View>
      </View>

      <CategorySettingBottomSheet
        visible={categorySettingBottomSheetVisible}
        setVisible={setCategorySettingBottomSheetVisible}
        onClose={getCategories}
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
    height: 210,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
  },
  categoryBtn: {
    width: 90,
    paddingVertical: 6,
    // marginRight: 20,
    marginHorizontal: 11,
    marginVertical: 5.5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#f4f4f4",
  },
});

export default CategoryBottomSheet;
