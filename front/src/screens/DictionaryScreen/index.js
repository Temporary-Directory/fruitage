import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";

import MangoSteen from "../../assets/images/fruits/mangosteen.png";
import { useEffect, useState } from "react";

function DictionaryScreen() {
  const [edit, setEdit] = useState(false);

  // temporary state
  const [fruits, setFruits] = useState([
    { name: "망고스틴", selected: true },
    { name: "블루베리", selected: true },
    { name: "체리", selected: false },
    { name: "복숭아", selected: true },
    { name: "다크체리", selected: false },
    { name: "메론", selected: false },
    { name: "샤인머스켓", selected: true },
  ]);

  const getFruits = async () => {
    // TODO: get available fruits from BE
    // setFruits(respond);
  };

  const saveFruits = async () => {
    // TODO: save new selected fruits to BE
  };

  useEffect(() => {
    // await getFruits();
  }, []);

  const onPressFruit = (index) => {
    var newFruits = [...fruits];
    newFruits[index].selected = !newFruits[index].selected;
    // console.log(newFruits[index].name, newFruits[index].selected);

    setFruits(newFruits);
  };

  const onClose = () => {
    console.log("Close button is pressed!");
  };

  const onPressEdit = () => {
    if (edit) {
      // saveFruits()
      setEdit(false);
    } else {
      setEdit(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} activeOpacity={0.5}>
          <AntDesign name="close" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressEdit} activeOpacity={0.5}>
          <MaterialIcons
            name={edit ? "save" : "edit"}
            size={24}
            color="black"
          />
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
                    <FontAwesome6
                      name="check"
                      size={20}
                      color={f.selected ? "black" : "transparent"}
                    />
                  </View>
                  <View style={styles.cardView}>
                    <Image source={MangoSteen} style={styles.img} />
                    <Text style={styles.fruitName}>{f.name}</Text>
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
                      <FontAwesome6
                        name="check"
                        size={20}
                        color={fruits[i + 1].selected ? "black" : "transparent"}
                      />
                    </View>
                    <View style={styles.cardView}>
                      <Image source={MangoSteen} style={styles.img} />
                      <Text style={styles.fruitName}>{fruits[i + 1].name}</Text>
                    </View>
                  </TouchableOpacity>
                ) : null}
              </View>
            ) : null;
          })}
        </ScrollView>
      </View>
    </View>
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
