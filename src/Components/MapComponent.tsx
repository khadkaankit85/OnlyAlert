import React, { useContext, useEffect, useState } from "react";
import MapView, { Marker, Region } from "react-native-maps";
import { View, Image, Alert } from "react-native";
import userLocationImg from "../assets/icons8-location-100.png";
import centerMarkerImg from "../assets/icons8-user-location-64.png";
import { mapStyle } from "../Constants";
import {
  SelectedLocationContext,
  CurrentUserLocationContext,
  UserLocationContextType,
} from "../Context";
import * as Location from "expo-location";
import { calculateTheDistanceBetweenTwoCoordinates } from "../Utils";

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
  const selectedLocationContext = useContext(SelectedLocationContext);
  const { selectedLocation, setSelectedLocation } = selectedLocationContext;
  const { userLocation, setUserLocation } = userLocationContext;

  const [showCenterMarker, setShowCenterMarker] = useState(true);
  const [centerCoords, setCenterCoords] =
    useState<Location.LocationObjectCoords>({
      latitude: initialRegion.latitude,
      longitude: initialRegion.longitude,
      altitude: 0,
      accuracy: 0,
      altitudeAccuracy: 0,
      heading: 0,
      speed: 0,
    });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was not granted");
        return;
      }
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
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
    })();
  }, [setUserLocation]);

  useEffect(() => {
    if (
      selectedLocation?.mathematicalAddress &&
      userLocation?.mathematicalAddress
    ) {
      let distance = calculateTheDistanceBetweenTwoCoordinates(
        userLocation?.mathematicalAddress?.coords,
        centerCoords
      );
      console.log("distance is ", distance);
      setShowCenterMarker(distance >= 50);
    }
  }, [
    selectedLocation?.mathematicalAddress,
    userLocation?.mathematicalAddress,
    centerCoords,
  ]);

  const handleMapChange = (region: Region) => {
    console.log("region changed", region);

    // Update the center coordinates based on the new region center
    const newCenterCoords: Location.LocationObjectCoords = {
      latitude: region.latitude,
      longitude: region.longitude,
      altitude: 0,
      accuracy: 0,
      altitudeAccuracy: 0,
      heading: 0,
      speed: 0,
    };
    setCenterCoords(newCenterCoords);

    // Update selected location context based on new center
    setSelectedLocation({
      ...selectedLocation,
      mathematicalAddress: {
        coords: newCenterCoords,
        timestamp: Date.now(),
      },
      readableAddress: selectedLocation?.readableAddress,
    });

    // Update the showCenterMarker state after updating selectedLocation
    if (userLocation?.mathematicalAddress) {
      let distance = calculateTheDistanceBetweenTwoCoordinates(
        userLocation.mathematicalAddress.coords,
        newCenterCoords
      );
      console.log("distance is ", distance);
      setShowCenterMarker(distance >= 50);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        customMapStyle={mapStyle}
        style={{ flex: 1, width: "100%", height: "100%" }}
        initialRegion={initialRegion}
        onRegionChangeComplete={handleMapChange}
      >
        {/* User Location Marker */}
        {userLocation?.mathematicalAddress && (
          <Marker
            coordinate={{
              latitude: userLocation.mathematicalAddress.coords.latitude,
              longitude: userLocation.mathematicalAddress.coords.longitude,
            }}
            image={userLocationImg}
          />
        )}
      </MapView>

      {/* Center Marker */}
      {showCenterMarker && (
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginLeft: -15, // Adjust based on your marker size
            marginTop: -30, // Adjust based on your marker size
          }}
        >
          <Image source={centerMarkerImg} style={{ width: 30, height: 30 }} />
        </View>
      )}
    </View>
  );
};

export default MapComponent;
