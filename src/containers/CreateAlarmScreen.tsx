import {
  View,
  Text,
  Pressable,
  ScrollView,
  Alert,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SvgXml } from "react-native-svg";
import DialogueBox from "../Components/DialogueBox";
import { Alarm, mapStyle } from "../Constants";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { useState, useEffect } from "react";
import * as Location from "expo-location";

import loadingGif from "../assets/icons8-loading.gif";
import userLocation from "../assets/icons8-user-location-64.png";
import backButton from "../assets/icons8-back-50.png";

const CreateAlarmScreen = () => {
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
    // if (true) {
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
        ></Image>
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
        <View
          style={{
            backgroundColor: "white",
            width: "90%",
            height: 60,
            marginTop: 80,
            marginHorizontal: "auto",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Pressable
            style={{
              width: "20%",
              height: 50,
              justifyContent: "center",
              borderColor: "black",
              borderWidth: 1,
              display: "flex",
              alignItems: "center",
              backgroundColor: "red",
            }}
          >
            <Image
              source={backButton}
              style={{
                width: 35,
                height: 35,
                justifyContent: "center",
              }}
            ></Image>
          </Pressable>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "80%",
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "black",
                }}
              >
                <TextInput
                  placeholder="Enter Alarm Name lkjfdskl kljsdflfsl kjlk flkdslfs jljsdflk jjkldsf lkjdsflklkfjlk flkjflk dsflkllfklkklsd jl"
                  style={{
                    width: "100%",
                    height: 50,
                    fontSize: 20,
                    fontFamily: "montserrat",
                    borderColor: "black",
                    borderWidth: 1,
                    paddingLeft: 10,
                  }}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Marker
          style={{
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
          image={userLocation}
          draggable
          coordinate={location.coords}
          onDragEnd={(e) =>
            setLocation(
              e.nativeEvent.coordinate as unknown as Location.LocationObject
            )
          }
        ></Marker>
      </MapView>
    </View>
  );
};

export default CreateAlarmScreen;
