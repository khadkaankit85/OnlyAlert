// CreateAlarmScreen.js
import React, { useState, useEffect, createContext } from "react";
import { View, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import * as Location from "expo-location";
import LoadingScreen from "../Components/LoadingScreen";
import MapComponent from "../Components/MapComponent";
import OverlayComponent from "../Components/SearchBar";
import { LocationObject } from "expo-location";
import { LocationDetails } from "../Constants";

type SelectedLocationContextType = {
  selectedLocation: LocationDetails | null;
  setSelectedLocation: (location: LocationDetails) => void;
};

export const SelectedLocation = createContext<SelectedLocationContextType>({
  selectedLocation: null,
  setSelectedLocation: () => {},
});

const CreateAlarmScreen = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedLocation, setselectedLocation] =
    useState<LocationDetails | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
        });
        setLocation(location);
        let address = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        if (address) {
          setselectedLocation(address[0] as LocationDetails);
        }
      } catch (error) {
        setErrorMsg("Error getting location");
        Alert.alert("Error", errorMsg as string);
      }
    })();
  }, []);

  if (location === null) {
    return <LoadingScreen />;
  }

  const initialRegion = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922, // Controls the zoom level (increase to zoom out)
    longitudeDelta: 0.0421,
  };

  return (
    <SelectedLocation.Provider
      value={{
        selectedLocation: selectedLocation,
        setSelectedLocation: setselectedLocation,
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, width: "100%" }}>
          <MapComponent
            initialRegion={initialRegion}
            location={location}
            setLocation={setLocation}
          />
          <OverlayComponent />
        </View>
      </TouchableWithoutFeedback>
    </SelectedLocation.Provider>
  );
};

export default CreateAlarmScreen;
