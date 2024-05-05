import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

import MangoSteen from "../../assets/images/fruits/mangosteen.png";

function NewFruitScreen() {
  const onClose = () => {
    console.log("Close button is pressed!");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} activeOpacity={0.5}>
          <AntDesign name="close" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.titleView}>
          <Text style={styles.titleTxt}>새로운 과일</Text>
        </View>
        <View style={styles.cardBack}>
          <LinearGradient
            style={styles.card}
            start={[0, 0]}
            end={[1, 1]}
            colors={["rgba(255, 255, 255, 0.7)", "rgba(255, 255, 255, 0) 100%"]}
          >
            <View style={styles.cardView}>
              <Image source={MangoSteen} style={styles.img} />
              <Text style={styles.fruitName}>망고스틴</Text>
            </View>
          </LinearGradient>
        </View>

        <Text style={styles.txtGet}>획득</Text>
      </View>
      <View style={styles.footer}>
        <Text style={{ fontSize: 12, marginTop: -20 }}>
          설정 {">"} 과일 도감에서
        </Text>
        <Text style={{ fontSize: 12 }}>표시할 과일을 선택할 수 있습니다.</Text>
      </View>
    </View>
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

    marginVertical: 57,
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
  img: {
    width: 175,
    height: 175,
    resizeMode: "contain",
    marginBottom: 29,
  },
  fruitName: {
    fontSize: 22,
  },
  txtGet: {
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 1,
  },
});
