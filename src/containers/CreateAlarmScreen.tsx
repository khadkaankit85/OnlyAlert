import React, { useState, useEffect, useContext } from "react";
import { View, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import * as Location from "expo-location";
import LoadingScreen from "../Components/LoadingScreen";
import MapComponent from "../Components/MapComponent";
import OverlayComponent from "../Components/SearchBar";
import {
  SelectedLocationContext,
  DetailedUserLocationType,
  UserLocationContextType,
  CurrentUserLocationContext,
} from "../Context";
import { SelectedLocationContextType } from "../Constants";

const CreateAlarmScreen = () => {
  const { userLocation, setUserLocation } = useContext<UserLocationContextType>(
    CurrentUserLocationContext
  );
  // state initializor for selectedlocation
  const [selectedLocation, setselectedLocation] =
    useState<DetailedUserLocationType>({
      readableAddress: undefined,
      mathematicalAddress: undefined,
    });
  console.log(userLocation);
  if (userLocation?.mathematicalAddress === undefined) {
    return <LoadingScreen />;
  }
  const initialRegion = {
    latitude: userLocation.mathematicalAddress.coords.latitude,
    longitude: userLocation.mathematicalAddress.coords.longitude,
    latitudeDelta: 0.002612860232268588,
    longitudeDelta: 0.0028689858730075457,
  };

  return (
    <SelectedLocationContext.Provider
      value={{
        selectedLocation: selectedLocation,
        setSelectedLocation: setselectedLocation,
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, width: "100%" }}>
          <MapComponent initialRegion={initialRegion} />
          <OverlayComponent />
        </View>
      </TouchableWithoutFeedback>
    </SelectedLocationContext.Provider>
  );
};

export default CreateAlarmScreen;
