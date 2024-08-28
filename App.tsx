import { StyleSheet, View, Alert } from "react-native";
import SplashScreen from "./src/containers/SplashScreen";
import { useState, useEffect, createContext } from "react";
import { useFonts } from "expo-font";
import * as Location from "expo-location";
import { Alarm } from "./src/Constants";
import {
  CurrentUserLocationContext,
  DetailedUserLocationType,
  MainContext,
} from "./src/Context";
import Main from "./src/containers/Main";
import { PaperProvider } from "react-native-paper";

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
  const [alarms, setAlarms] = useState<Alarm[]>([]);

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
        setuserLocation({
          readableAddress: address[0],
          mathematicalAddress: location,
        });
      }
    })();
  }, []);

  function onAlarmActivate(alarm: Alarm, value: boolean) {
    // status is changed to on, and then saved it to localstorage and some task is scheduled to track the location
    const alarmAfterActivation = alarms.map((a) => {
      if (a.id === alarm.id) {
        a.status = value ? "on" : "off";
      }
      return a;
    });

    setAlarms(alarmAfterActivation);
    console.log(
      "gotta save that in localstorage and track location to make that ring"
    );
  }
  function onAlarmDeactivate(alarm: Alarm, value: boolean) {
    const alarmAfterDeactivation = alarms.map((a) => {
      if (a.id === alarm.id) {
        a.status = value ? "on" : "off";
      }
      return a;
    });
    setAlarms(alarmAfterDeactivation);
    console.log("stop tracking user location");
  }
  function onAlarmAdd(newAlarm: Alarm) {
    setAlarms([...alarms, newAlarm]);
  }
  function onAlarmDelete(id: number[] | string) {
    const alarmAfterDeletion = alarms.filter((a) => {
      return a.id !== id;
    });
    setAlarms(alarmAfterDeletion);
  }

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
    <PaperProvider>
      <MainContext.Provider
        value={{
          alarms,
          setAlarms,
          onAlarmActivate,
          onAlarmDeactivate,
          onAlarmAdd,
          onAlarmDelete,
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
      </MainContext.Provider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
