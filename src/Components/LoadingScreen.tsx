// LoadingScreen.js
import React from "react";
import { View, Text, Image } from "react-native";
import loadingGif from "../assets/icons8-loading.gif";

const LoadingScreen = () => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
    }}
  >
    <Image
      source={loadingGif}
      style={{
        width: 60,
        height: 60,
      }}
    />
    <Text
      style={{
        color: "black",
        fontFamily: "montserrat",
        fontSize: 11,
      }}
    >
      Locating you...
    </Text>
  </View>
);

export default LoadingScreen;
