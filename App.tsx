import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SplashScreen from "./src/containers/SplashScreen";
import { useEffect, useState } from "react";

export default function App() {
  const [isSplash, setSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 2000),
      [];
  });
  return (
    <View style={styles.container}>
      {isSplash ? (
        <SplashScreen />
      ) : (
        <View>
          <Text>Open up App.tsx to start working on your app!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
