import React, { useContext, useMemo, useRef, useState, useEffect } from "react";
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
import {
  getRandomImageForAlarmCard,
  getTheMostMeaningfulLocationName,
} from "../Utils";
import { MainContext } from "../Context";
import { Alarm } from "../Constants";
import uuid from "react-native-uuid";

interface CreateAlarmCardProps {
  distance: number;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setDialogueBoxInformation: (alarm: Alarm) => void;
}

const CreateAlarmCard = ({
  distance,
  setModalVisible,
  setDialogueBoxInformation,
}: CreateAlarmCardProps) => {
  const { selectedLocation } = useContext(SelectedLocationContext);
  const { onAlarmAdd, alarms } = useContext(MainContext);

  // rings at this distance
  const [distnceWhereItRings, setDistnceWhereItRings] = useState(100);

  // Create a new Animated.ValueXY instance for tracking position
  const pan = useRef(new Animated.ValueXY()).current;

  // State to keep track of the last created alarm ID
  const [lastCreatedAlarmId, setLastCreatedAlarmId] = useState<string | null>(
    null
  );

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

  // to get the most readable and informative address
  const address = getTheMostMeaningfulLocationName(selectedLocation);

  const imageLink = useMemo(
    () => getRandomImageForAlarmCard("https://placecats.com/300/200"),
    [selectedLocation?.readableAddress]
  );

  function addAlarmAndShowDialogueBox() {
    const newAlarmId = uuid.v4("").toString();
    // might exist some bug here-----------------------------------------------------------------------
    setLastCreatedAlarmId(newAlarmId);

    // Add the new alarm
    onAlarmAdd({
      id: newAlarmId,
      status: "on",
      distance: distance,
      location: address,
      Coordinates: {
        latitude: selectedLocation?.mathematicalAddress?.coords.latitude || 0,
        longitude: selectedLocation?.mathematicalAddress?.coords.longitude || 0,
      },
      image: imageLink,
      ringsWhen: distnceWhereItRings,
    });

    // Trigger modal visibility update
    setModalVisible(true);
  }

  useEffect(() => {
    if (lastCreatedAlarmId) {
      const getAlarmByIdOrFallback = (
        alarms: Alarm[],
        lastCreatedAlarmId: string
      ): Alarm => {
        const foundAlarm = alarms.find(
          (alarm) => alarm.id === lastCreatedAlarmId
        );
        console.log(foundAlarm);
        return foundAlarm || alarms[alarms.length - 1];
      };

      setDialogueBoxInformation(
        getAlarmByIdOrFallback(alarms, lastCreatedAlarmId)
      );
    }
  }, [lastCreatedAlarmId, alarms, setDialogueBoxInformation]);

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
              uri: imageLink,
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
                if (distnceWhereItRings == 800) {
                  setDistnceWhereItRings(300);
                } else if (distnceWhereItRings == 300) {
                  setDistnceWhereItRings(500);
                } else if (distnceWhereItRings == 500) {
                  setDistnceWhereItRings(600);
                } else {
                  setDistnceWhereItRings(800);
                }
              }}
            >
              <View style={styles.notImageViewSecondChildButton}>
                <Text>{distnceWhereItRings}m radius</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                addAlarmAndShowDialogueBox();
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
    fontSize: 20,
    textAlign: "left",
    marginTop: 10,
    overflow: "hidden",
  },
  buttonText: {
    color: "white",
    fontFamily: "ubuntu",
  },
});

export default CreateAlarmCard;
