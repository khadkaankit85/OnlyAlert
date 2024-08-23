import { View, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  CurrentUserLocationContext,
  UserLocationContextType,
} from "../Context";
import * as Location from "expo-location";

const SplashScreen = () => {
  const { userLocation, setUserLocation } = useContext<UserLocationContextType>(
    CurrentUserLocationContext
  );
  // since this is the main screen, we are gonna fetch the user location here if we have the permission to fetch it
  // we are gonna fetch the user location here and cache it
  useEffect(() => {
    async () => {
      let { status } = await Location.getForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was not granted");
        return;
      }
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setUserLocation({
          readableAddress: undefined,
          mathematicalAddress: location,
        });
        console.log("This is from splash screen", location);
      }
    };
  }, []);

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
