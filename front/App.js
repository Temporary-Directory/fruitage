import { View, TouchableOpacity, Image } from "react-native";
import { useEffect, useState } from "react";

import SplashScreen from "./src/screens/SplashScreen";
import CharacterScreen from "./src/screens/CharacterScreen";
import LoginScreen from "./src/screens/LoginScreen";
import CalendarScreen from "./src/screens/CalendarScreen";
import MainScreen from "./src/screens/MainScreen";
import SettingScreen from "./src/screens/SettingsScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeW from "./src/assets/images/ic_home_white.png";
import HomeB from "./src/assets/images/ic_home_black.png";
import SettingW from "./src/assets/images/ic_setting_white.png";
import SettingB from "./src/assets/images/ic_setting_black.png";
import CalendarW from "./src/assets/images/ic_calendar_white.png";
import CalendarB from "./src/assets/images/ic_calendar_black.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

function TabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        shadowColor: "black",
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.06,
        shadowRadius: 7,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            activeOpacity={0.8}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 28,
              paddingTop: 10,
            }}
          >
            {label === "Main" ? (
              <Image
                style={{ width: 44, height: 44 }}
                source={isFocused ? HomeB : HomeW}
              />
            ) : label === "Calendar" ? (
              <Image
                style={{ width: 44, height: 44 }}
                source={isFocused ? CalendarB : CalendarW}
              />
            ) : (
              <Image
                style={{ width: 44, height: 44 }}
                source={isFocused ? SettingB : SettingW}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [flag, setFlag] = useState(false);
  const [splash, setSplash] = useState(false);

  useEffect(() => {
    const checkSignInStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const expirationTime = await AsyncStorage.getItem("authExpirationTime");

        if (token && expirationTime) {
          const expirationTimeInt = parseInt(expirationTime, 10); // to Decimal integer
          const currentTime = new Date().getTime();

          if (currentTime > expirationTimeInt) {
            // Handle token expiration, e.g., navigate to login screen
            await AsyncStorage.removeItem("authToken");
            await AsyncStorage.removeItem("authExpirationTime");
          } else {
            // Token is valid, proceed with your app's logic
            setSignedIn(true);
          }
        }
        setSplash(false);
      } catch (error) {
        console.error("Error retrieving the token:", error);
      }
    };

    setSplash(true);
    checkSignInStatus();
  }, []);

  return (
    <NavigationContainer>
      {splash ? (
        <SplashScreen />
      ) : signedIn === true && flag === false ? (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "red",
          }}
          tabBar={(props) => <TabBar {...props} />}
          initialRouteName="Main"
        >
          <Tab.Screen name="Calendar" component={CalendarScreen} />
          <Tab.Screen name="Main" component={MainScreen} />
          <Tab.Screen
            name="Setting"
            children={(props) => (
              <SettingScreen {...props} setSignedIn={setSignedIn} />
            )}
          />
        </Tab.Navigator>
      ) : flag === true ? (
        <CharacterScreen setFlag={setFlag} />
      ) : (
        <LoginScreen
          signedIn={signedIn}
          setSignedIn={setSignedIn}
          setFlag={setFlag}
        />
      )}
    </NavigationContainer>
  );
}
