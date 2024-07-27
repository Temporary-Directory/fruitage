import { useState, useEffect, useRef } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome6 } from "@expo/vector-icons";

import { USER_API_SERVER } from "../../Config";

import Bear from "../../assets/images/character-bear.png";
import Tiger from "../../assets/images/character-tiger.png";
import Check2 from "../../assets/images/ic_check_29.png";

function CharacterScreen({ setFlag }) {
  const [character, setCharacter] = useState(1); // 1: bear, 2: tiger

  const onSubmitCharacter = async () => {
    try {
      const x_auth = await AsyncStorage.getItem("authToken");
      const url = `${USER_API_SERVER}/character`;

      await axios({
        method: "post",
        url: url,
        headers: { Authorization: `Bearer ${x_auth}` },
        data: { characterType: character },
      })
        .then((response) => {
          if (response.status == 200) {
            // console.log(typeof response.status);
            setFlag(false);
          }
        })
        .catch((error) => {
          console.error("Error putting user's character:", error);
        });
    } catch (error) {
      // Handle errors related to AsyncStorage or other issues here
      console.error("Error in onSubmitCharacter function:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.body}>
        <View style={styles.titleView}>
          <Text style={styles.titleTxt}>캐릭터를</Text>
          <Text style={styles.titleTxt}>선택해주세요.</Text>
        </View>

        <View style={styles.options}>
          <TouchableOpacity
            onPress={() => setCharacter(1)}
            activeOpacity={0.8}
            style={{
              ...styles.checkCard,
              backgroundColor: character === 1 ? "#f4f4f4" : "transparent",
            }}
          >
            <View style={styles.checkCardView}>
              <Image source={Bear} style={styles.img} />
              {character === 1 ? (
                //   <FontAwesome6 name="check" size={24} />
                <Image style={{ width: 24, height: 24 }} source={Check2} />
              ) : (
                // <FontAwesome6 name="check" size={24} color="black" />
                <View style={{ width: 24, height: 24 }}></View>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCharacter(2)}
            activeOpacity={0.8}
            style={{
              ...styles.checkCard,
              backgroundColor: character === 2 ? "#f4f4f4" : "transparent",
            }}
          >
            <View style={styles.checkCardView}>
              <Image source={Tiger} style={styles.img} />
              {character === 2 ? (
                // <FontAwesome6 name="check" size={24} color="black" />
                <Image style={{ width: 24, height: 24 }} source={Check2} />
              ) : (
                <View style={{ width: 24, height: 24 }}></View>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={onSubmitCharacter}
          activeOpacity={0.8}
          style={styles.btnSave}
        >
          <Text style={styles.btnTxt}>저장</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={{ color: "#666" }}>설정 {">"} 캐릭터에서</Text>
        <Text style={{ color: "#666" }}>변경할 수 있습니다.</Text>
      </View>
    </View>
  );
}

export default CharacterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 0.8,
    backgroundColor: "yellow",
  },
  body: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flex: 1,
    justifyContent: "center",
  },
  titleView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleTxt: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 1,
  },
  options: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 38,
  },
  checkCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 6,
    paddingVertical: 10,
    borderRadius: 18,
  },
  checkCardView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  img: {
    width: 85,
    height: 150,
    resizeMode: "contain",
    marginVertical: 6,
  },
  btnCheck: {
    width: 24,
    height: 24,
  },
  btnSave: {
    width: 100,
    height: 36,
    paddingVertical: 6,
    backgroundColor: "#292929",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 23,
  },
  btnTxt: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
