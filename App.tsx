import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput } from "react-native";
import SplashScreen from "./src/containers/SplashScreen";
import { useEffect, useState } from "react";
import AlarmScreen from "./src/containers/AlarmScreen";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CreateAlarmScreen from "./src/containers/CreateAlarmScreen";

const Stack = createStackNavigator();

export default function App() {
  const [isSplash, setSplash] = useState(true);

  const fontsLoaded = useFonts({
    montserrat: require("./src/assets/fonts/Montserrat/static/Montserrat-Bold.ttf"),
    ubuntu: require("./src/assets/fonts/Ubuntu/Ubuntu-Bold.ttf"),
  });
  if (fontsLoaded) {
    setTimeout(() => {
      setSplash(false);
    }, 2000);
  }
  if (isSplash) {
    return (
      <View style={styles.container}>
        <SplashScreen />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AlarmScreen">
        <Stack.Screen
          name="AlarmScreen"
          component={AlarmScreen}
          options={{
            headerShown: false,
            title: "My Alarms",
            cardStyle: {
              flex: 1,
              paddingTop: 50,
            },
          }}
        />
        <Stack.Screen
          name="createAlarmScreen"
          component={CreateAlarmScreen}
          options={{
            title: "Create Alarm",
            headerShown: false,
            cardStyle: {
              flex: 1,
            },
            cardStyleInterpolator: ({ current }) => ({
              cardStyle: {
                opacity: current.progress,
              },
            }),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
