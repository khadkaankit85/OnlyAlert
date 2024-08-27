import React, { useContext, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

import { SelectedLocationContext } from "../Context";

interface CreateAlarmCardProps {
  distance: number;
}
const CreateAlarmCard = ({ distance }: CreateAlarmCardProps) => {
  const { selectedLocation } = useContext(SelectedLocationContext);

  // Create a new Animated.ValueXY instance for tracking position
  const pan = useRef(new Animated.ValueXY()).current;

  // This handler will be called every time a gesture event occurs
  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: pan.x, translationY: pan.y } }],
    { useNativeDriver: false }
  );

  // This handler will be called when the gesture state changes (e.g., when the user releases the drag)
  const onHandlerStateChange = (event: PanGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === 5) {
      // State.END
      // When the gesture ends, animate the card to the new position without snapping back
      pan.flattenOffset(); // Ensure the offset is applied to the position
    }
  };
  //to get the most readable and informative address
  const address =
    selectedLocation?.readableAddress?.streetNumber &&
    selectedLocation?.readableAddress?.street &&
    selectedLocation?.readableAddress?.city
      ? `${selectedLocation.readableAddress.streetNumber} ${selectedLocation.readableAddress.street}, ${selectedLocation.readableAddress.city}`
      : selectedLocation?.readableAddress?.name &&
        selectedLocation?.readableAddress?.city
      ? `${selectedLocation.readableAddress.name}, ${selectedLocation.readableAddress.city}`
      : selectedLocation?.readableAddress?.name &&
        selectedLocation?.readableAddress?.region
      ? `${selectedLocation.readableAddress.name}, ${selectedLocation.readableAddress.region}`
      : selectedLocation?.readableAddress?.street &&
        selectedLocation?.readableAddress?.city
      ? `${selectedLocation.readableAddress.street}, ${selectedLocation.readableAddress.city}`
      : selectedLocation?.readableAddress?.city &&
        selectedLocation?.readableAddress?.region
      ? `${selectedLocation.readableAddress.city}, ${selectedLocation.readableAddress.region}`
      : selectedLocation?.readableAddress?.district &&
        selectedLocation?.readableAddress?.city
      ? `${selectedLocation.readableAddress.district}, ${selectedLocation.readableAddress.city}`
      : selectedLocation?.readableAddress?.city &&
        selectedLocation?.readableAddress?.country
      ? `${selectedLocation.readableAddress.city}, ${selectedLocation.readableAddress.country}`
      : selectedLocation?.readableAddress?.formattedAddress
      ? selectedLocation.readableAddress.formattedAddress
      : selectedLocation?.readableAddress?.name
      ? selectedLocation.readableAddress.name
      : selectedLocation?.readableAddress?.city
      ? selectedLocation.readableAddress.city
      : selectedLocation?.readableAddress?.region
      ? selectedLocation.readableAddress.region
      : selectedLocation?.readableAddress?.country
      ? selectedLocation.readableAddress.country
      : "Location not available";

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          },
        ]}
      >
        <View style={styles.imageView}>
          <Image
            resizeMode="cover"
            source={{
              uri: "https://picsum.photos/100",
              width: 100,
              height: 100,
            }}
          />
        </View>
        <View style={styles.notImageView}>
          <View style={styles.notImageViewFirstChild}>
            <View style={styles.textContainer}>
              <Text style={styles.boldText}>
                {distance != -1 ? distance.toFixed(0) : "0"} metres away
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.largeText}>{address}</Text>
            </View>
          </View>
          <View style={styles.notImageViewSecondChild}>
            <TouchableOpacity
              onPress={() => {
                console.log("i shall implement the logic to toggle the radius");
              }}
            >
              <View style={styles.notImageViewSecondChildButton}>
                <Text>Set Radius</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                console.log("create alarm function should be called here");
              }}
            >
              <View
                style={[
                  styles.notImageViewSecondChildButton,
                  {
                    backgroundColor: "green",
                    paddingHorizontal: 20,
                  },
                ]}
              >
                <Text style={styles.buttonText}>Set</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 350,
    height: 180,
    position: "absolute",
    alignSelf: "center",
    bottom: 50,
    borderRadius: 20,
    backgroundColor: "white",
    flexDirection: "row",
  },
  imageView: {
    width: "33%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  notImageView: {
    width: "67%",
    height: "100%",
  },
  notImageViewFirstChild: {
    width: "100%",
    height: "60%",
    display: "flex",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
  },
  notImageViewSecondChild: {
    width: "100%",
    height: "40%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  notImageViewSecondChildButton: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 6,
  },
  textContainer: {
    display: "flex",
    alignItems: "flex-start",
    width: "100%",
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "ubuntu",
    textAlign: "left",
    paddingTop: 10,
  },
  largeText: {
    fontFamily: "ubuntu",
    fontSize: 22,
    textAlign: "left",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontFamily: "ubuntu",
  },
});

export default CreateAlarmCard;
