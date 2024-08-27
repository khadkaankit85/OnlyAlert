import { StyleSheet, View, Alert } from "react-native";
import SplashScreen from "./src/containers/SplashScreen";
import { useState, useEffect, createContext } from "react";
import { useFonts } from "expo-font";
import * as Location from "expo-location";
import { Alarm } from "./src/Constants";
import {
  CurrentUserLocationContext,
  DetailedUserLocationType,
  SavedAlarmsContext,
} from "./src/Context";
import Main from "./src/containers/Main";

// states of both locations are gonna initiate here
// fetching of user location at first stage is gonna be here, caching will also be implemented here

export default function App() {
  const [isSplash, setSplash] = useState(true);

  //states for current userlocation
  const [userLocation, setuserLocation] = useState<DetailedUserLocationType>({
    readableAddress: undefined,
    mathematicalAddress: undefined,
  });
  // this component provides the app with alarms and set alarm logic
  // context for alarm goes here

  // initializing alarms with a dummy data for now
  const [alarms, setAlarms] = useState<Alarm[]>([
    {
      status: "on",
      distance: 5,
      location: "8 tansley avenue",
      id: 0,
    },
    {
      status: "off",
      distance: 10,
      location: "Work",
      id: 1,
    },
  ]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }
    })();

    (async () => {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      let address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      if (address) {
        console.log("uselocation set from app.tsx");
        setuserLocation({
          readableAddress: address[0],
          mathematicalAddress: location,
        });
      }
    })();
  }, []);

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
    <SavedAlarmsContext.Provider
      value={{
        alarms: alarms,
        setAlarms: setAlarms,
      }}
    >
      <CurrentUserLocationContext.Provider
        value={{
          userLocation: userLocation,
          setUserLocation: setuserLocation,
        }}
      >
        <Main />
      </CurrentUserLocationContext.Provider>
    </SavedAlarmsContext.Provider>
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
