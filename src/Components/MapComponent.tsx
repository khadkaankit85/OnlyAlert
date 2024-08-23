import React, { useContext, useEffect, useRef, useState } from "react";
import MapView, { Marker, Region } from "react-native-maps";
import { View, Image, Alert } from "react-native";
import userLocationImg from "../assets/icons8-user-location-64.png";
import { mapStyle } from "../Constants";
import {
  SelectedLocationContext,
  CurrentUserLocationContext,
  UserLocationContextType,
} from "../Context";
import * as Location from "expo-location";
import { calculateTheDistanceBetweenTwoCoordinates } from "../Utils";
import { LocationObject } from "expo-location";

interface MapComponentProps {
  initialRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}

const MapComponent = ({ initialRegion }: MapComponentProps) => {
  const userLocationContext = useContext<UserLocationContextType>(
    CurrentUserLocationContext
  );
  // Selected location part, used to set the alarm
  const selectedLocationContext = useContext(SelectedLocationContext);
  const { selectedLocation, setSelectedLocation } = selectedLocationContext;
  const [twoPointsAreClose, settwoPointsAreClose] = useState(true);

  const { userLocation, setUserLocation } = userLocationContext;

  useEffect(() => {
    if (userLocation?.mathematicalAddress === undefined) {
      (async () => {
        let { status } = await Location.getForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission to access location was not granted");
          return;
        }
        if (status === "granted") {
          let location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
          });
          // Reverse geocode the location
          let address = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          if (address) {
            setUserLocation({
              readableAddress: address[0],
              mathematicalAddress: location,
            });
          }
        }
      })();
    }
  }, [setUserLocation, userLocation?.mathematicalAddress]);

  useEffect(() => {
    if (
      selectedLocation?.mathematicalAddress &&
      userLocation?.mathematicalAddress
    ) {
      let distance = calculateTheDistanceBetweenTwoCoordinates(
        userLocation?.mathematicalAddress?.coords,
        selectedLocation?.mathematicalAddress?.coords
      );
      if (distance < 500) {
        settwoPointsAreClose(true);
      } else {
        settwoPointsAreClose(false);
      }
    } else {
      settwoPointsAreClose(false);
    }
  }, [selectedLocation, userLocation]);

  const reverseGeoCodeHandler = useRef<NodeJS.Timeout | null>(null);

  function handleMapChange(region: Region) {
    if (reverseGeoCodeHandler.current) {
      clearTimeout(reverseGeoCodeHandler.current);
    }
    // When the user moves the map, the selected location is updated
    setSelectedLocation({
      ...selectedLocation,
      mathematicalAddress: {
        coords: {
          latitude: region.latitude,
          longitude: region.longitude,
          altitude: 0,
          accuracy: 0,
          altitudeAccuracy: 0,
          heading: 0,
          speed: 0,
        },
        timestamp: Date.now(),
      },
    });
    reverseGeoCodeHandler.current = setTimeout(async () => {
      // Reverse geocode the location only if the user has stopped moving the map
      if (userLocation?.mathematicalAddress !== undefined) {
        let address = await Location.reverseGeocodeAsync({
          latitude: userLocation?.mathematicalAddress.coords.latitude,
          longitude: userLocation?.mathematicalAddress.coords.longitude,
        });
        if (address) {
          setUserLocation({
            readableAddress: address[0],
            mathematicalAddress: userLocation?.mathematicalAddress,
          });
        }
      }
    }, 2000);
  }

  return (
    <MapView
      customMapStyle={mapStyle}
      style={{ flex: 1, width: "100%", height: "100%" }}
      initialRegion={initialRegion}
      onRegionChangeComplete={(region) => {
        handleMapChange(region); // Use `onRegionChangeComplete`
      }}
    >
      <Marker
        coordinate={{
          latitude: userLocation?.mathematicalAddress?.coords.latitude || 0,
          longitude: userLocation?.mathematicalAddress?.coords.longitude || 0,
        }}
        draggable
        onDragEnd={(e) => {
          const { latitude, longitude } = e.nativeEvent.coordinate;
          setSelectedLocation({
            ...selectedLocation,
            mathematicalAddress: {
              coords: {
                latitude,
                longitude,
                altitude: 0,
                accuracy: 0,
                altitudeAccuracy: 0,
                heading: 0,
                speed: 0,
              },
              timestamp: Date.now(),
            },
          });
        }}
        image={userLocationImg} // Use the imported image instead of URI
      />
      {selectedLocation?.mathematicalAddress && (
        <Marker
          draggable={false}
          coordinate={{
            latitude: selectedLocation.mathematicalAddress.coords.latitude,
            longitude: selectedLocation.mathematicalAddress.coords.longitude,
          }}
        >
          <View style={{ alignItems: "center", backgroundColor: "red" }}>
            <Image source={userLocationImg} style={{ width: 35, height: 35 }} />
          </View>
        </Marker>
      )}
    </MapView>
  );
};

export default MapComponent;
