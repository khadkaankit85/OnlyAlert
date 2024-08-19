import { View, Text, Pressable, ScrollView, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SvgXml } from "react-native-svg";
import DialogueBox from "../Components/DialogueBox";
import { Alarm } from "../Constants";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { useState, useEffect } from "react";
import * as Location from "expo-location";

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
    return <Text>Loading...</Text>;
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
        customMapStyle={[
          {
            elementType: "geometry",
            stylers: [{ color: "#212121" }],
          },
          {
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
          },
          {
            elementType: "labels.text.fill",
            stylers: [{ color: "#757575" }],
          },
          {
            elementType: "labels.text.stroke",
            stylers: [{ color: "#212121" }],
          },
          {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [{ color: "#757575" }],
          },
          {
            featureType: "poi",
            elementType: "geometry",
            stylers: [{ color: "#212121" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#484848" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#000000" }],
          },
        ]}
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
          }}
        ></View>
        <Marker
          image={{
            uri: "https://img.icons8.com/?size=100&id=0sTmBjAQDKfi&format=png&color=000000",
          }}
          draggable
          coordinate={location.coords}
          onDragEnd={(e) =>
            setLocation(
              e.nativeEvent.coordinate as unknown as Location.LocationObject
            )
          }
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "montserrat",
                fontSize: 16,
              }}
            ></Text>
          </View>
        </Marker>
      </MapView>

      {/* Uncomment and use the below code if you need additional UI components */}
      {/* 
      <View
        style={{
          flex: 0.4 / 5,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontFamily: "montserrat",
            marginLeft: 15,
          }}
        >
          Create Alarm
        </Text>
        <Pressable
          style={{
            width: 50,
            height: 50,
            marginRight: 15,
          }}
          onPress={() => {
            navigation.navigate("AlarmScreen" as never);
          }}
        >
          <SvgXml
            xml={`<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 256 256">
              <g fill="#808080" fill-rule="nonzero">
                <g transform="scale(5.12,5.12)">
                  <path d="M21,3c-9.39844,0 -17,7.60156 -17,17c0,9.39844 7.60156,17 17,17c3.35547,0 6.46094,-0.98437 9.09375,-2.65625l12.28125,12.28125l4.25,-4.25l-12.125,-12.09375c2.17969,-2.85937 3.5,-6.40234 3.5,-10.28125c0,-9.39844 -7.60156,-17 -17,-17zM21,7c7.19922,0 13,5.80078 13,13c0,7.19922 -5.80078,13 -13,13c-7.19922,0 -13,-5.80078 -13,-13c0,-7.19922 5.80078,-13 13,-13z"></path>
                </g>
              </g>
            </svg>`}
          />
        </Pressable>
      </View>

      <ScrollView
        style={{
          flex: 4 / 5,
          width: "100%",
          padding: 25,
        }}
      >
        <DialogueBox
          modalVisible={false}
          setModalVisible={() => {}}
          DialogueBoxInformation={
            {
              title: "Create Alarm",
              description: "This is a description",
              buttonText: "Create Alarm",
              onPress: () => {},
            } as unknown as Alarm
          }
        />
      </ScrollView>
      */}
    </View>
  );
};

export default CreateAlarmScreen;
