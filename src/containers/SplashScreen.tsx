import { View, Image, StyleSheet } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Image
        source={{
          uri: "https://media.tenor.com/jfmI0j5FcpAAAAAM/loading-wtf.gif",
          width: 200,
          height: 200,
        }}
      ></Image>
      <StatusBar hidden />
    </View>
  );
};

export default SplashScreen;
