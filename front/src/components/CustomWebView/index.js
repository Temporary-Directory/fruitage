import { SafeAreaView, StyleSheet } from "react-native";
import { useRef, useEffect, useState } from "react";
import WebView from "react-native-webview";
import { API_SERVER } from "../../Config";

const CustomWebView = ({ onAuthSuccess }) => {
  const ref = useRef(null);
  const [navState, setNavState] = useState(null);

  console.log(navState);
  useEffect(() => {
    if (navState && navState.url) {
      handleNavigationStateChange(navState);
    }
  }, [navState, handleNavigationStateChange]);

  const handleNavigationStateChange = (navState) => {
    const { url } = navState;
    if (!url) return;

    // Check if the URL contains the redirect URI
    if (url.startsWith("fruitage://oauthredirect")) {
      // Extract the auth token from the URL
      const authToken = extractAuthToken(url);
      onAuthSuccess(authToken);
      if (authToken) {
        // Pass the auth token back to the parent component
        console.log("AUTH TOKEN:", authToken);
      }
    }
  };

  const extractAuthToken = (url) => {
    // Example code to extract token from URL query params
    const regex = /code=([^&]*)/;
    const match = url.match(regex);
    return match && match[1];
  };

  return (
    <SafeAreaView style={styles.webViewContainer}>
      <WebView
        ref={ref}
        style={styles.webview}
        source={{ uri: `${API_SERVER}/login/oauth/authorize` }}
        onNavigationStateChange={setNavState}
      />
    </SafeAreaView>
  );
};

export default CustomWebView;

const styles = StyleSheet.create({
  webViewContainer: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
