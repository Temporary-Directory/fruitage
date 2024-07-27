import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Bear from "../../assets/images/character-bear.png";
import Tiger from "../../assets/images/character-tiger.png";
import Commit from "../../assets/icons/ic_commit.png";
import CommitCal from "../../assets/icons/ic_commit-cal.png";
import Todo from "../../assets/icons/ic_todo.png";
import TodoUn from "../../assets/icons/ic_todo-un.png";
import { API_SERVER, USER_API_SERVER } from "../../Config";

function MainScreen() {
  const [username, setUsername] = useState("username"); // getUsername(); // get username from local storage
  const [character, setCharacter] = useState(true); // true: bear
  const [level, setLevel] = useState("포도"); // get current level from BE
  const [score, setScore] = useState(24); // get current score from BE

  const [nCommits, setNCommits] = useState(4); // get the number of today's commit from BE
  const [nDays, setNDays] = useState(4); // get the how many days (commit) from BE
  const [complete, setComplete] = useState(4); // get today's done-todo from BE
  const [incomplete, setIncomplete] = useState(4); // get today's undone-todo from BE

  const getUsername = async () => {
    try {
      const x_auth = await AsyncStorage.getItem("authToken");
      const url = `${USER_API_SERVER}/?flag=false`;

      await axios({
        method: "get",
        url: url,
        headers: { Authorization: `Bearer ${x_auth}` },
      })
        .then((response) => {
          if (response.status === 200) {
            setUsername(response.data.userName);
          }
        })
        .catch((error) => {
          console.error("Error fetching user's name:", error);
        });
    } catch (error) {
      // Handle errors related to AsyncStorage or other issues here
      console.error("Error in getUsername function:", error);
    }
  };

  const getTodayCommit = async () => {
    try {
      const x_auth = await AsyncStorage.getItem("authToken");
      const url = `${API_SERVER}/today/commit`;

      await axios({
        method: "get",
        url: url,
        headers: { Authorization: `Bearer ${x_auth}` },
      })
        .then((response) => {
          setNCommits(response.data.commit);
          setNDays(response.data.days);
        })
        .catch((error) => {
          console.error("Error fetching today's commit data:", error);
        });
    } catch (error) {
      // Handle errors related to AsyncStorage or other issues here
      console.error("Error in getTodayCommit function:", error);
    }
  };

  const getTodayTodo = async () => {
    try {
      const x_auth = await AsyncStorage.getItem("authToken");
      const url = `${API_SERVER}/today/todo`;

      await axios({
        method: "get",
        url: url,
        headers: { Authorization: `Bearer ${x_auth}` },
      })
        .then((response) => {
          setComplete(response.data.todoComplete);
          setIncomplete(response.data.todoIncomplete);
        })
        .catch((error) => {
          console.error("Error fetching today's todo data:", error);
        });
    } catch (error) {
      // Handle errors related to AsyncStorage or other issues here
      console.error("Error in getTodayTodo function:", error);
    }
  };

  useEffect(() => {
    getUsername();
    getTodayCommit();
    getTodayTodo();
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Action to perform when the screen is focused
      getUsername();
      getTodayCommit();
      getTodayTodo();

      return () => {
        // Cleanup action if needed
        // action when the screen is unfocused
      };
    }, [])
  );

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
                  {nCommits}개
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
                  {nDays}일
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
                  {complete}개
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
                  {incomplete}개
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
