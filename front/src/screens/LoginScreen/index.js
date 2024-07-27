import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Logo from "../../assets/images/fruitage-eng-w280-2.png";
import FruitBox from "../../assets/images/fruit-box.png";
import CustomWebView from "../../components/CustomWebView";
import AsyncStorage from "@react-native-async-storage/async-storage";

function LoginScreen({ navigation, signedIn, setSignedIn, setFlag }) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmitLogin = () => {
    setVisible(true);
  };

  const handleAuthSuccess = async (f) => {
    // console.log("auth success", d); // Check response from CustomWebView
    // console.log(await AsyncStorage.getItem("authToken")); // Check authToken stored in AsyncStorage
    setFlag(f);
    setSignedIn(true);
    setVisible(false); // Hide CustomWebView when auth is successful
  };

  // const onSubmitSignUp = () => {
  //   console.log("SignUp Button is pressed!");
  // };

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>

      {visible ? (
        <View style={styles.body}>
          <CustomWebView onAuthSuccess={handleAuthSuccess} />
        </View>
      ) : (
        <View style={styles.body}>
          <Image source={Logo} style={{ width: 240, resizeMode: "contain" }} />
          <Image source={FruitBox} style={styles.imgFruitBox} />
          <View style={styles.btnView}>
            <TouchableOpacity
              onPress={onSubmitLogin}
              activeOpacity={0.8}
              style={styles.btnLogin}
            >
              <AntDesign name="github" size={22} color="white" />
              <Text style={styles.btnTxt}>Github으로 로그인</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={onSubmitSignUp}
              activeOpacity={0.8}
              style={styles.btnSignUp}
            >
              <Text style={{ ...styles.btnTxt, color: "#aaaaaa" }}>
                회원가입
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      )}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
}

export default LoginScreen;

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
  },
  body: {
    flex: 12,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  imgFruitBox: {
    width: 230,
    height: 200,
    resizeMode: "contain",
    marginTop: 17,
    marginBottom: 49,
  },
  btnView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  btnLogin: {
    width: 242,
    height: 42,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 54,
    borderRadius: 8,
    marginBottom: 17,
  },
  btnTxt: {
    color: "white",
    fontSize: 14,
    fontWeight: "800",
  },
  btnSignUp: {
    width: 242,
    height: 42,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});
