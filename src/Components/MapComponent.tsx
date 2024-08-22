// MapComponent.js
import React, { useContext } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, Image, Text } from "react-native";
import userLocation from "../assets/icons8-user-location-64.png";
import { mapStyle } from "../Constants";
import { LocationObject } from "expo-location";
import { SelectedLocation } from "../containers/CreateAlarmScreen";

interface MapComponentProps {
  initialRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  location: LocationObject;
  setLocation: (location: LocationObject) => void;
}

const MapComponent = ({
  initialRegion,
  location,
  setLocation,
}: MapComponentProps) => {
  const selectedLocationContext = useContext(SelectedLocation);
  const { selectedLocation, setSelectedLocation } = selectedLocationContext;

  return (
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
        coordinate={location.coords}
        draggable
        onDragEnd={(e) => {
          const { latitude, longitude } = e.nativeEvent.coordinate;
          setLocation({
            coords: { ...location.coords, latitude, longitude },
            timestamp: Date.now(),
          });
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Image source={userLocation} style={{ width: 35, height: 35 }} />
          {/* Additional content or styling can be added here */}
        </View>
      </Marker>
    </MapView>
  );
};

export default MapComponent;
