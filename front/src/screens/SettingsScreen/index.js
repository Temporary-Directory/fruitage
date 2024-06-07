import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import ToggleSwitch from "../../components/ToggleSwitch";
import { useState } from "react";

function SettingScreen() {
  const [email, setEmail] = useState("email@email.com"); // get user-email from local storage
  const [nCommits, setNCommits] = useState(4); // get total number of commits from BE
  const [nDone, setNDone] = useState(44); // get total number of done-toto from BE
  const [character, setCharacter] = useState("호랭이"); // get selected character name from BE
  const [nFruits, setNFruits] = useState(4); // get the number available fruits from BE

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
                    width: 15,
                    height: 15,
                    marginRight: 10,
                    borderRadius: 90,
                    backgroundColor: "#555555",
                  }}
                ></View>
                <TouchableOpacity
                  style={{ justifyContent: "center", alignItems: "center" }}
                  activeOpacity={0.8}
                >
                  <Text style={{ fontSize: 14, color: "#292929" }}>
                    {email}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={{ justifyContent: "center", alignItems: "center" }}
                activeOpacity={0.8}
              >
                <Text style={{ fontSize: 11, color: "#A1A1A1" }}>로그아웃</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.halfBoxContainer}>
          <Text style={styles.subTitle}>내 기록</Text>
          <View style={styles.halfBoxView}>
            <View style={styles.halfBox}>
              <Text style={styles.halfBoxTitle}>총 커밋 수</Text>
              <Text style={styles.halfBoxTxt}>{nCommits}개</Text>
            </View>
            <View style={styles.halfBox}>
              <Text style={styles.halfBoxTitle}>총 완료 할 일 수</Text>
              <Text style={styles.halfBoxTxt}>{nDone}개</Text>
            </View>
          </View>
        </View>
        <View style={styles.halfBoxContainer}>
          <Text style={styles.subTitle}>과일 농장</Text>
          <View style={styles.halfBoxView}>
            <View style={styles.halfBox}>
              <Text style={styles.halfBoxTitle}>캐릭터</Text>
              <Text style={styles.halfBoxTxt}>{character}</Text>
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
                    console.log("Open CharacterSettingScreen");
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
                    console.log("Open DictionaryScreen");
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
        <View
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
        </View>
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
