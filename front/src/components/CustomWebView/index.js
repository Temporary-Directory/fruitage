import { SafeAreaView, StyleSheet, View, Text, Dimensions } from "react-native";
import { useRef, useEffect, useState } from "react";
import WebView from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_SERVER } from "../../Config";

const CustomWebView = ({ onAuthSuccess }) => {
  const ref = useRef(null);
  const [error, setError] = useState(null);
  const [navState, setNavState] = useState(null);

  useEffect(() => {
    if (navState && navState.url) {
      handleNavigationStateChange(navState);
    }
  }, [navState]);

  const handleNavigationStateChange = (navState) => {
    const { url } = navState;
    if (!url) return;

    // Inject JavaScript to log the cookies
    ref.current.injectJavaScript(`
      (function() {
        window.ReactNativeWebView.postMessage(document.cookie);
      })();
    `);
  };

  const onMessage = async (event) => {
    try {
      if (event.nativeEvent && event.nativeEvent.data) {
        if (event.nativeEvent.data.includes("accessToken=")) {
          const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

          const res = event.nativeEvent.data.split("; ");
          const accessToken = res[0].split("accessToken=")[1];
          const flag = res[1].split("flag=")[1] === "true" ? true : false;

          await AsyncStorage.setItem("authToken", accessToken);
          await AsyncStorage.setItem(
            "authExpirationTime",
            (new Date().getTime() + oneDayInMilliseconds).toString()
          );

          const x_auth = await AsyncStorage.getItem("authToken");
          onAuthSuccess(flag);
        }
      }
    } catch (e) {
      console.error("Error in onMessage:", e);
    }
  };

  const handleError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.error("WebView error:", nativeEvent);
    setError(nativeEvent.description); // Set error state
  };

  return (
    <SafeAreaView style={styles.webViewContainer}>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>An error occurred: {error}</Text>
        </View>
      ) : (
        <WebView
          ref={ref}
          style={styles.webview}
          source={{ uri: `${API_SERVER}/login/oauth/authorize` }}
          onNavigationStateChange={setNavState} // callback
          onMessage={onMessage}
          onError={handleError}
        />
      )}
    </SafeAreaView>
  );
};

export default CustomWebView;

const styles = StyleSheet.create({
  webViewContainer: {
    // flex: 1,
    height: Dimensions.get("window").height,
    width: "100%",
  },
  webview: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});
