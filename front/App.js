import { View, TouchableOpacity, Image } from "react-native";
import { useState } from "react";

import SplashScreen from "./src/screens/SplashScreen";
import CharacterScreen from "./src/screens/CharacterScreen";
import LoginScreen from "./src/screens/LoginScreen";
import CharacterSettingScreen from "./src/screens/CharacterSettingScreen";
import NewFruitScreen from "./src/screens/NewFruitScreen";
import DictionaryScreen from "./src/screens/DictionaryScreen";
import CalendarScreen from "./src/screens/CalendarScreen";
import MainScreen from "./src/screens/MainScreen";
import SettingScreen from "./src/screens/SettingsScreen";

import CustomWebView from "./src/components/CustomWebView";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeW from "./src/assets/images/ic_home_white.png";
import HomeB from "./src/assets/images/ic_home_black.png";
import SettingW from "./src/assets/images/ic_setting_white.png";
import SettingB from "./src/assets/images/ic_setting_black.png";
import CalendarW from "./src/assets/images/ic_calendar_white.png";
import CalendarB from "./src/assets/images/ic_calendar_black.png";

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

  return (
    <NavigationContainer>
      {signedIn === true ? (
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
          <Tab.Screen name="Setting" component={SettingScreen} />
        </Tab.Navigator>
      ) : (
        <LoginScreen signedIn={signedIn} setSignedIn={setSignedIn} />
        // <CharacterScreen />
      )}
    </NavigationContainer>
  );
}

// <Stack.Navigator>
// <Stack.Screen
//     name="login"
//     component={LoginScreen}
//     options={({ navigation, signedIn, setSignedIn }) => ({
//       // headerShown: false,
//       title: "Login",
//       headerLeft: () => (
//         <TouchableOpacity onPress={() => navigation.openDrawer()}>
//           {/* <Text>Drawer</Text> */}
//         </TouchableOpacity>
//       ),
//     })}
//   />
//   <Stack.Screen name="Github OAuth" component={WebView} />
// </Stack.Navigator>
