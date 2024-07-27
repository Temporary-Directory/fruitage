import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  Animated,
} from "react-native";
import { useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

import Close3 from "../../assets/images/ic_close_333.png";

function NewFruitScreen({ visible, setVisible, newFruits, setNewFruits }) {
  const isSmall = newFruits.length > 1;

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
    duration: 250,
    useNativeDriver: true,
  });

  useEffect(() => {
    if (visible) {
      resetBottomSheet.start();
    }
  }, [visible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setNewFruits(null);
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
      <Animated.View
        style={{ ...styles.container, transform: [{ translateY: translateY }] }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={closeModal} activeOpacity={0.5}>
            {/* <AntDesign name="close" size={30} color="black" /> */}
            <Image style={{ width: 24, height: 24 }} source={Close3} />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <View style={styles.titleView}>
            <Text style={styles.titleTxt}>새로운 과일</Text>
          </View>
          <View
            style={{
              marginVertical: 57,
              flexDirection: isSmall ? "row" : "column",
              width: "100%",
              justifyContent: isSmall ? "space-evenly" : "center",
              alignItems: "center",
              paddingHorizontal: isSmall && 14,
            }}
          >
            {newFruits.slice(0, 2).map((f, i) => {
              return (
                <View key={i} style={styles.cardBack}>
                  <LinearGradient
                    style={isSmall ? styles.cardSmall : styles.card}
                    start={[0, 0]}
                    end={[1, 1]}
                    colors={[
                      "rgba(255, 255, 255, 0.7)",
                      "rgba(255, 255, 255, 0) 100%",
                    ]}
                  >
                    <View style={styles.cardView}>
                      <Image
                        source={{ uri: f.fruitImage }}
                        style={isSmall ? styles.imgSmall : styles.img}
                      />
                      <Text
                        style={
                          isSmall ? styles.fruitNameSmall : styles.fruitName
                        }
                      >
                        {f.fruitName}
                      </Text>
                    </View>
                  </LinearGradient>
                </View>
              );
            })}
          </View>

          <Text style={styles.txtGet}>
            {isSmall && "총"} {newFruits.length}개 획득
          </Text>
          <Text style={{ fontSize: 12, marginTop: 12, marginBottom: -12 }}>
            {newFruits.length > 2 ? "최대 2개까지 표시됩니다." : ""}
          </Text>
        </View>
        <View style={styles.footer}>
          <Text style={{ fontSize: 12, marginTop: -20 }}>
            설정 {">"} 과일 도감에서
          </Text>
          <Text style={{ fontSize: 12 }}>모든 과일을 확인할 수 있습니다.</Text>
        </View>
      </Animated.View>
    </Modal>
  );
}

export default NewFruitScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f4f4",
  },
  header: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  body: {
    flex: 7,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  footer: {
    flex: 3,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  titleView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 148,
  },
  titleTxt: {
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: 1,
  },
  cardBack: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 25,
  },
  cardSmall: {
    width: 148,
    height: 185,
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    borderRadius: 16,
    justifyContent: "center",
  },
  card: {
    width: 240,
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    backgroundColor: "#f4f4f4",
  },
  cardView: {
    justifyContent: "center",
    alignItems: "center",
  },
  imgSmall: {
    width: 105,
    height: 105,
    resizeMode: "contain",
    // marginBottom: 29,
  },
  img: {
    width: 175,
    height: 175,
    resizeMode: "contain",
    marginBottom: 29,
  },
  fruitNameSmall: {
    fontSize: 14,
    color: "black",
  },
  fruitName: {
    fontSize: 22,
    color: "black",
  },
  txtGet: {
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 1,
  },
});
