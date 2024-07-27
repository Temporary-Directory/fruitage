import { useEffect, useState, useRef } from "react";
import {
  View,
  Image,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, MaterialIcons, FontAwesome6 } from "@expo/vector-icons";

import { USER_API_SERVER } from "../../Config";

import MangoSteen from "../../assets/images/fruits/mangosteen.png";
import Close3 from "../../assets/images/ic_close_333.png";
import Edit3 from "../../assets/images/ic_edit_333.png";
import Save3 from "../../assets/images/ic_save_333.png";
import Check2 from "../../assets/images/ic_check_29.png";

function DictionaryScreen({ visible, setVisible }) {
  const [edit, setEdit] = useState(false);

  // temporary state
  const [fruits, setFruits] = useState([]);
  const [changed, setChanged] = useState([]);

  const getFruitInfo = async () => {
    // get fruits from BE
    try {
      const x_auth = await AsyncStorage.getItem("authToken");
      const url = `${USER_API_SERVER}/fruit/info`;

      await axios({
        method: "get",
        url: url,
        headers: { Authorization: `Bearer ${x_auth}` },
      })
        .then((response) => {
          if (response.status === 200) {
            setFruits(response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching user's fruit info:", error);
        });
    } catch (error) {
      // Handle errors related to AsyncStorage or other issues here
      console.error("Error in getFruitInfo function:", error);
    }
  };

  const saveFruits = async () => {
    // save new selected fruits to BE
    try {
      const x_auth = await AsyncStorage.getItem("authToken");
      const url = `${USER_API_SERVER}/fruit`;

      await axios({
        method: "post",
        url: url,
        headers: { Authorization: `Bearer ${x_auth}` },
        data: { fruitIdList: changed },
      })
        .then((response) => {
          if (response.status === 200) {
            setChanged([]);
            setEdit(false);
          }
        })
        .catch((error) => {
          console.error("Error saving user's fruits:", error);
        });
    } catch (error) {
      // Handle errors related to AsyncStorage or other issues here
      console.error("Error in saveFruits function:", error);
    }
  };

  useEffect(() => {
    if (visible) getFruitInfo();
  }, [visible]);

  const onPressFruit = (index) => {
    var newFruits = [...fruits];
    newFruits[index].fruitIsSelected = !newFruits[index].fruitIsSelected;

    if (changed.includes(newFruits[index].fruitId)) {
      const newed = [];

      changed.forEach((e) => {
        if (e !== newFruits[index].fruitId) {
          newed.push(e);
        }
      });

      setChanged(newed);
    } else {
      setChanged([...changed, newFruits[index].fruitId]);
    }
    setFruits(newFruits);
  };

  const onPressEdit = () => {
    if (edit) {
      var cnt = 0;
      fruits.forEach((f) => {
        if (f.fruitIsSelected) {
          cnt += 1;
        }
      });

      if (cnt <= 0) {
        Alert.alert("최소 1개 이상의 과일을 선택해야 합니다!");
      } else {
        if (changed.length > 0) {
          saveFruits();
        } else {
          setEdit(false);
        }
      }
    } else {
      setEdit(true);
    }
  };

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
    duration: 300,
    useNativeDriver: true,
  });

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
      <Animated.View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={closeModal} activeOpacity={0.5}>
            {/* <AntDesign name="close" size={30} color="black" /> */}
            {!edit && (
              <Image style={{ width: 20, height: 20 }} source={Close3} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressEdit} activeOpacity={0.5}>
            {/* <MaterialIcons
              name={edit ? "save" : "edit"}
              size={24}
              color="black"
            /> */}
            {edit ? (
              <Image style={{ width: 22, height: 22 }} source={Save3} />
            ) : (
              <Image style={{ width: 22, height: 22 }} source={Edit3} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <View style={styles.titleView}>
            <Text style={styles.titleTxt}>과일 도감</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {fruits.map((f, i) => {
              return i % 2 === 0 ? (
                <View key={i} style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    key={i}
                    onPress={edit ? () => onPressFruit(i) : null}
                    style={styles.card}
                    activeOpacity={0.8}
                  >
                    <View
                      style={{
                        width: "100%",
                        paddingHorizontal: 20,
                        alignItems: "flex-end",
                      }}
                    >
                      {/* <FontAwesome6
                        name="check"
                        size={20}
                        color={f.fruitIsSelected ? "black" : "transparent"}
                      /> */}
                      {f.fruitIsSelected ? (
                        <Image
                          style={{ width: 20, height: 20 }}
                          source={Check2}
                        />
                      ) : (
                        <View style={{ width: 20, height: 20 }}></View>
                      )}
                    </View>
                    <View style={styles.cardView}>
                      <Image
                        source={{ uri: f.fruitImage }}
                        style={styles.img}
                      />
                      <Text style={styles.fruitName}>{f.fruitName}</Text>
                    </View>
                  </TouchableOpacity>
                  {i + 1 < fruits.length ? (
                    <TouchableOpacity
                      key={i + 1}
                      onPress={edit ? () => onPressFruit(i + 1) : null}
                      style={styles.card}
                      activeOpacity={0.8}
                    >
                      <View
                        style={{
                          width: "100%",
                          paddingHorizontal: 20,
                          alignItems: "flex-end",
                        }}
                      >
                        {/* <FontAwesome6
                          name="check"
                          size={20}
                          color={
                            fruits[i + 1].selected ? "black" : "transparent"
                          }
                        /> */}
                        {fruits[i + 1].fruitIsSelected ? (
                          <Image
                            style={{ width: 20, height: 20 }}
                            source={Check2}
                          />
                        ) : (
                          <View style={{ width: 20, height: 20 }}></View>
                        )}
                      </View>
                      <View style={styles.cardView}>
                        <Image
                          source={{ uri: fruits[i + 1].fruitImage }}
                          style={styles.img}
                        />
                        <Text style={styles.fruitName}>
                          {fruits[i + 1].fruitName}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : null}
                </View>
              ) : null;
            })}
          </ScrollView>
        </View>
      </Animated.View>
    </Modal>
  );
}

export default DictionaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    // backgroundColor: "tomato",
  },
  body: {
    flex: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "pink",
  },
  titleView: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  titleTxt: {
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: 1,
  },
  card: {
    width: 166,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#f4f4f4",
    margin: 8,
  },
  cardView: {
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
  fruitName: {
    fontSize: 18,
  },
});
