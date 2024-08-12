import { View, Image, StyleSheet } from "react-native";
import React from "react";

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
    </View>
  );
};

export default SplashScreen;
