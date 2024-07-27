import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ToggleSwitch from "../../components/ToggleSwitch";
import { USER_API_SERVER } from "../../Config";
import CharacterSettingScreen from "../CharacterSettingScreen";
import DictionaryScreen from "../DictionaryScreen";

function SettingScreen({ setSignedIn }) {
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [characterSettingScreenVisible, setCharacterSettingScreenVisible] =
    useState(false);
  const [dictionaryScreenVisible, setDictionaryScreenVisible] = useState(false);

  const [username, setUsername] = useState("username"); // get user-email from local storage
  const [nCommits, setNCommits] = useState(0); // get total number of commits from BE
  const [nComplete, setNComplete] = useState(0); // get total number of done-toto from BE
  const [characterType, setCharacterType] = useState(1); // get selected character name from BE
  const [characterName, setCharacterName] = useState("곰"); // get selected character name from BE
  const [nFruits, setNFruits] = useState(0); // get the number available fruits from BE

  const onCloseCharacterSettingScreen = (nType) => {
    setCharacterType(nType);
    setCharacterName(nType === 1 ? "곰" : "호랑이");
  };

  const onCloseDictionaryScreen = () => {
    console.log("DictionaryScreenVisible Closed!");
  };

  const getUsername = async () => {
    try {
      const x_auth = await AsyncStorage.getItem("authToken");
      const url = `${USER_API_SERVER}?flag=true`;

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
    return "";
  };

  const getUserInfo = async () => {
    try {
      const x_auth = await AsyncStorage.getItem("authToken");
      const url = `${USER_API_SERVER}/info`;

      await axios({
        method: "get",
        url: url,
        headers: { Authorization: `Bearer ${x_auth}` },
      })
        .then((response) => {
          if (response.status === 200) {
            setNCommits(response.data.commit);
            setNComplete(response.data.todo);
          }
        })
        .catch((error) => {
          console.error("Error fetching user's info:", error);
        });
    } catch (error) {
      // Handle errors related to AsyncStorage or other issues here
      console.error("Error in getUserInfo function:", error);
    }
  };

  const getUserFruit = async () => {
    try {
      const x_auth = await AsyncStorage.getItem("authToken");
      const url = `${USER_API_SERVER}/fruit`;

      await axios({
        method: "get",
        url: url,
        headers: { Authorization: `Bearer ${x_auth}` },
      })
        .then((response) => {
          setNFruits(response.data.fruit);
        })
        .catch((error) => {
          console.error("Error fetching today's todo data:", error);
        });
    } catch (error) {
      // Handle errors related to AsyncStorage or other issues here
      console.error("Error in getTodayTodo function:", error);
    }
  };

  const getUserCharacter = async () => {
    try {
      const x_auth = await AsyncStorage.getItem("authToken");
      const url = `${USER_API_SERVER}/character`;

      await axios({
        method: "get",
        url: url,
        headers: { Authorization: `Bearer ${x_auth}` },
      })
        .then((response) => {
          setCharacterType(response.data.characterType);
          setCharacterName(response.data.characterName);
        })
        .catch((error) => {
          console.error("Error fetching user's character:", error);
        });
    } catch (error) {
      // Handle errors related to AsyncStorage or other issues here
      console.error("Error in getUserCharacter function:", error);
    }
  };

  const logoutHandler = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      setSignedIn(false);
    } catch (error) {
      console.error("Error removing the token:", error);
    }
  };

  const onDeleteUser = async () => {
    try {
      const x_auth = await AsyncStorage.getItem("authToken");
      const url = `${USER_API_SERVER}`;

      await axios({
        method: "delete",
        url: url,
        headers: { Authorization: `Bearer ${x_auth}` },
      })
        .then((response) => {
          setSignedIn(false);
        })
        .catch((error) => {
          console.error("Error deleting user's account:", error);
        });
    } catch (error) {
      // Handle errors related to AsyncStorage or other issues here
      console.error("Error in deleteUserHandler function:", error);
    }
  };

  const deleteUserHandler = async () => {
    Alert.alert(
      // 말그대로 Alert를 띄운다
      "정말로 탈퇴하실 건가요?", // 첫번째 text: 타이틀 제목
      "진짜로? 정말로?", // 두번째 text: 그 밑에 작은 제목
      [
        // 버튼 배열
        {
          text: "취소",
          onPress: () => console.log("canceled"), //onPress 이벤트시 콘솔창에 로그를 찍는다
          style: "cancel",
        },
        { text: "네", onPress: () => onDeleteUser() },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    getUsername();
    getUserInfo();
    getUserFruit();
    getUserCharacter();
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Action to perform when the screen is focused
      getUsername();
      getUserInfo();
      getUserFruit();
      getUserCharacter();

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
          <Text style={styles.titleTxt}>설정</Text>
        </View>

        <View style={styles.boxContainer}>
          <Text style={styles.subTitle}>로그인 정보</Text>
          <View style={styles.box}>
            <Text style={styles.halfBoxTitle}>연결된 계정</Text>
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
                <View
                  style={{
                    width: 4,
                    height: 18,
                    marginRight: 10,
                    borderRadius: 90,
                    backgroundColor: "#555555",
                  }}
                ></View>
                <TouchableOpacity
                  onPress={() => setDeleteVisible(!deleteVisible)}
                  style={{ justifyContent: "center", alignItems: "center" }}
                  activeOpacity={0.8}
                >
                  <Text style={{ fontSize: 14, color: "#292929" }}>
                    {username}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={logoutHandler}
                style={{ justifyContent: "center", alignItems: "center" }}
                activeOpacity={0.8}
              >
                <Text style={{ fontSize: 11, color: "#A1A1A1" }}>로그아웃</Text>
              </TouchableOpacity>
            </View>
            {deleteVisible && (
              <TouchableOpacity
                onPress={deleteUserHandler}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 14,
                  marginBottom: -8,
                }}
                activeOpacity={0.8}
              >
                <View
                  style={{
                    borderBottomColor: "#FF5154",
                    borderBottomWidth: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      color: "red",
                      borderBottomColor: "#FF5154",
                      borderBottomWidth: 1,
                      letterSpacing: 0.6,
                    }}
                  >
                    회원 탈퇴
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.halfBoxContainer}>
          <Text style={styles.subTitle}>내 기록</Text>
          <View style={styles.halfBoxView}>
            <View style={styles.halfBox}>
              <Text style={styles.halfBoxTitle}>이 달의 커밋</Text>
              <Text style={styles.halfBoxTxt}>{nCommits}개</Text>
            </View>
            <View style={styles.halfBox}>
              <Text style={styles.halfBoxTitle}>이 달의 완료 할 일</Text>
              <Text style={styles.halfBoxTxt}>{nComplete}개</Text>
            </View>
          </View>
        </View>
        <View style={styles.halfBoxContainer}>
          <Text style={styles.subTitle}>과일 농장</Text>
          <View style={styles.halfBoxView}>
            <View style={styles.halfBox}>
              <Text style={styles.halfBoxTitle}>캐릭터</Text>
              <Text style={styles.halfBoxTxt}>{characterName}</Text>
              <View
                style={{
                  width: "100%",
                  paddingHorizontal: 27,
                  justifyContent: "center",
                  marginTop: 13,
                  marginBottom: -12,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setCharacterSettingScreenVisible(true);
                  }}
                  style={{
                    paddingVertical: 4,
                    borderRadius: 5,
                    backgroundColor: "#e3e3e3",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={{ fontSize: 10, color: "#8f8f8f" }}>변경</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.halfBox}>
              <Text style={styles.halfBoxTitle}>과일 도감</Text>
              <Text style={styles.halfBoxTxt}>{nFruits}개</Text>
              <View
                style={{
                  width: "100%",
                  paddingHorizontal: 27,
                  justifyContent: "center",
                  marginTop: 13,
                  marginBottom: -12,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setDictionaryScreenVisible(true);
                  }}
                  style={{
                    paddingVertical: 4,
                    borderRadius: 5,
                    backgroundColor: "#e3e3e3",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={{ fontSize: 10, color: "#8f8f8f" }}>더보기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {/* <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 2,
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "700" }}>
            Private 리포 접근 허용
          </Text>
          <ToggleSwitch
            onToggle={() => console.log("toggle pressed")}
            isOn={false}
          />
        </View> */}
        <View
          style={{
            width: "98%",
            height: 1,
            borderRadius: 90,
            backgroundColor: "#e7e7e7",
            marginVertical: 16,
          }}
        ></View>
        <View style={styles.boxContainer}>
          <Text style={styles.subTitle}>정보</Text>
          <View style={styles.box}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  color: "#666666",
                  marginRight: 22,
                }}
              >
                제작자
              </Text>
              <Text style={{ fontSize: 14, color: "#666666" }}>임시토리</Text>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  color: "#666666",
                  marginRight: 22,
                }}
              >
                이메일
              </Text>
              <Text style={{ fontSize: 14, color: "#666666" }}>
                temporary@email.com
              </Text>
            </View>
          </View>
        </View>
      </View>
      <CharacterSettingScreen
        visible={characterSettingScreenVisible}
        setVisible={setCharacterSettingScreenVisible}
        currentType={characterType}
        onClose={onCloseCharacterSettingScreen}
      />
      <DictionaryScreen
        visible={dictionaryScreenVisible}
        setVisible={setDictionaryScreenVisible}
        onClose={onCloseDictionaryScreen}
      />
    </View>
  );
}

export default SettingScreen;

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
    paddingHorizontal: 22,
    alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "pink",
  },
  titleView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    // backgroundColor: "skyblue",
  },
  titleTxt: {
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: 1,
  },
  subTitle: {
    width: "100%",
    paddingHorizontal: 5,
    fontSize: 16,
    fontWeight: "700",
  },
  boxContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  box: {
    width: "100%",
    borderRadius: 15,
    marginTop: 11,
    padding: 23,
    backgroundColor: "#f6f6f6",
  },
  halfBoxContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  halfBoxView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 11,
  },
  halfBox: {
    width: 164,
    paddingHorizontal: 23,
    paddingTop: 20,
    paddingBottom: 27,
    justifyContent: "center",
    alignItems: "left",
    borderRadius: 15,
    backgroundColor: "#f6f6f6",
  },
  halfBoxTitle: {
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 13,
  },
  halfBoxTxt: { fontSize: 12, color: "#555555" },
});
