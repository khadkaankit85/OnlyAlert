import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SplashScreen from "./src/containers/SplashScreen";
import { useEffect, useState } from "react";
import AlarmScreen from "./src/containers/AlarmScreen";
import { useFonts } from "expo-font";

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
  return (
    <View style={styles.container}>
      {isSplash ? (
        <SplashScreen />
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: "#cccccc",
            width: "100%",
            borderWidth: 4,
            paddingTop: 55,
          }}
        >
          <AlarmScreen />
          <StatusBar style="auto" />
        </View>
      )}
    </View>
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
