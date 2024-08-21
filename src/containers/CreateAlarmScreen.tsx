import {
  View,
  Text,
  Pressable,
  Alert,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { mapStyle } from "../Constants";

import { useNavigation } from "@react-navigation/native";

import loadingGif from "../assets/icons8-loading.gif";
import userLocation from "../assets/icons8-user-location-64.png";
import backButton from "../assets/icons8-back-50.png";

const CreateAlarmScreen = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        setErrorMsg("Error getting location");
        Alert.alert("Error", errorMsg as string);
      }
    })();
  }, []);

  if (location === null) {
    return (
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
  }

  const initialRegion = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, width: "100%" }}>
        <MapView
          customMapStyle={mapStyle}
          style={{ flex: 1, width: "100%", height: "100%" }}
          initialRegion={initialRegion}
          onRegionChange={(region) => {
            setLocation({
              coords: {
                latitude: region.latitude,
                longitude: region.longitude,
                altitude: 0,
                accuracy: 0,
                altitudeAccuracy: 0,
                heading: 0,
                speed: 0,
              },
              timestamp: 0,
            });
          }}
        >
          <Marker
            image={userLocation}
            draggable
            coordinate={location.coords}
            onDragEnd={(e) => {
              const { latitude, longitude } = e.nativeEvent.coordinate;
              setLocation({
                coords: { ...location.coords, latitude, longitude },
                timestamp: Date.now(),
              });
            }}
          />
        </MapView>

        {/* Overlaying the back button and input field on top of the MapView */}
        <View
          style={{
            position: "absolute",
            top: 80,
            left: 20,
            right: 20,
            zIndex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "white",
            padding: 10,
            borderRadius: "50%",
          }}
        >
          <Pressable
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image
              source={backButton}
              style={{
                width: 35,
                height: 35,
              }}
            />
          </Pressable>

          <TextInput
            placeholder="Enter Alarm Name"
            style={{
              flex: 1,
              marginLeft: 10,
              fontSize: 16,
              fontFamily: "montserrat",
              paddingHorizontal: 10,
              height: 40,
              borderRadius: 5,
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreateAlarmScreen;
