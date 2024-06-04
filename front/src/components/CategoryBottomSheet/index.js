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
import SettingA from "../../assets/images/ic_setting_aaa.png";

const CategoryBottomSheet = ({ visible, setVisible, setSelected }) => {
  const [categories, setCategories] = useState([]);

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
    ];

    var formattedCategories = [];
    for (var i = 0; i < retList.length; i += 3) {
      var tmp = [];
      for (var j = 0; j < 3; j++) {
        if (i + j < retList.length) {
          tmp.push(retList[i + j]);
        } else {
          tmp.push(null);
        }
      }

      formattedCategories.push(tmp);
    }

    setCategories(formattedCategories);
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
              //   onPress={closeModal}
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
