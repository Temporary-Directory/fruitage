import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useState } from "react";

import Bear from "../../assets/images/character-bear.png";
import Tiger from "../../assets/images/character-tiger.png";
import Commit from "../../assets/icons/ic_commit.png";
import CommitCal from "../../assets/icons/ic_commit-cal.png";
import Todo from "../../assets/icons/ic_todo.png";
import TodoUn from "../../assets/icons/ic_todo-un.png";

function MainScreen() {
  const [username, setUsername] = useState("UserName"); // get username from local storage
  const [character, setCharacter] = useState(true); // true: bear
  const [level, setLevel] = useState("포도"); // get current level from BE
  const [score, setScore] = useState(24); // get current score from BE

  const [commit, setCommit] = useState(4); // get the number of today's commit from BE
  const [ndays, setNdays] = useState(4); // get the how many days (commit) from BE
  const [done, setDone] = useState(4); // get today's done-todo from BE
  const [undone, setUndone] = useState(4); // get today's undone-todo from BE

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.body}>
        <View style={styles.titleView}>
          <Text style={styles.titleTxt}>
            {username}님,{"\n"}커밋합시다.
          </Text>
        </View>
        <View style={{ marginBottom: 14 }}>
          <Image
            style={{ width: 220, height: 280, resizeMode: "contain" }}
            source={character ? Bear : Tiger}
          />
        </View>
        <View style={styles.fruitState}>
          <Text style={{ fontSize: 16, fontWeight: "700", marginLeft: -2 }}>
            과일 바구니 상태
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 12 }}>현재과일:</Text>
            <Text style={{ fontSize: 12, color: "#B66FFF" }}>{level}</Text>
          </View>
          <View style={styles.statusBar}></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 10, color: "#606060" }}>
              다음 과일까지:
            </Text>
            <Text style={{ fontSize: 10, fontWeight: "700", color: "#606060" }}>
              {"  "}
              {30 - score}점
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "98%",
            height: 1,
            marginBottom: 14,
            borderRadius: 90,
            backgroundColor: "#e7e7e7",
          }}
        ></View>
        <View style={styles.dailyState}>
          <View style={styles.dailyStateView}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "800",
                marginBottom: 11,
                color: "#292929",
              }}
            >
              커밋
            </Text>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 50,
                }}
              >
                <Image
                  style={{
                    width: 16,
                    height: 16,
                    resizeMode: "contain",
                    marginBottom: 4,
                  }}
                  source={Commit}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "700",
                    color: "#292929",
                    marginBottom: 6,
                  }}
                >
                  {commit}개
                </Text>
                <Text style={{ fontSize: 9, color: "#606060" }}>오늘</Text>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image
                  style={{
                    width: 16,
                    height: 16,
                    resizeMode: "contain",
                    marginBottom: 4,
                  }}
                  source={CommitCal}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "700",
                    color: "#292929",
                    marginBottom: 6,
                  }}
                >
                  {ndays}일
                </Text>
                <Text style={{ fontSize: 9, color: "#606060" }}>연속</Text>
              </View>
            </View>
          </View>
          <View style={styles.dailyStateView}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "800",
                marginBottom: 11,
                color: "#292929",
              }}
            >
              할 일
            </Text>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 50,
                }}
              >
                <Image
                  style={{
                    width: 16,
                    height: 16,
                    resizeMode: "contain",
                    marginBottom: 4,
                  }}
                  source={Todo}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "700",
                    color: "#292929",
                    marginBottom: 6,
                  }}
                >
                  {done}개
                </Text>
                <Text style={{ fontSize: 9, color: "#606060" }}>완료</Text>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image
                  style={{
                    width: 16,
                    height: 16,
                    resizeMode: "contain",
                    marginBottom: 4,
                  }}
                  source={TodoUn}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "700",
                    color: "#292929",
                    marginBottom: 6,
                  }}
                >
                  {undone}개
                </Text>
                <Text style={{ fontSize: 9, color: "#606060" }}>미완료</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default MainScreen;

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
    paddingHorizontal: 25,
  },
  titleView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "left",
    marginBottom: 36,
    // backgroundColor: "skyblue",
  },
  titleTxt: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 1,
  },
  fruitState: {
    width: "100%",
    marginVertical: 14,
    backgroundColor: "#f9f9f9",
    borderRadius: 15,
    paddingHorizontal: 19,
    paddingVertical: 17,
  },
  statusBar: {
    width: 300,
    height: 12,
    marginTop: 8,
    marginBottom: 6,
    borderRadius: 90,
    backgroundColor: "#292929",
  },

  dailyState: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dailyStateView: {
    height: 110,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 39,
    borderRadius: 15,
    backgroundColor: "#f9f9f9",
  },
});
