import {
  View,
  Image,
  Text,
  Pressable,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useState, useRef, useContext } from "react";
import { Alarm } from "../Constants";
import { Switch } from "react-native-paper";
import GestureRecognizer from "react-native-swipe-gestures";
import { MainContext } from "../Context";
interface AlarmCardProps {
  onDistanceChange: (alarm: Alarm) => void;
  alarm: Alarm;
  setSelectedAlarm: (alarm: Alarm) => void;
  setEditAlarmModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setDialogueBoxInformation: (alarm: Alarm) => void;
  setModalVisible: (value: boolean) => void;
}

const Components = ({
  onDistanceChange,
  alarm,
  setSelectedAlarm,
  setEditAlarmModalVisible,
  setDialogueBoxInformation,
  setModalVisible,
}: AlarmCardProps) => {
  const [isDeleteButtonVisible, setIsDeleteButtonVisible] = useState(false);

  const backgroundColorAnim = useRef(new Animated.Value(0)).current;
  const animateDeleteButton = useRef(new Animated.Value(0)).current;

  // global states
  const { onAlarmActivate, onAlarmDeactivate, onAlarmDelete } =
    useContext(MainContext);

  // Function to handle the button press (start animation)
  const handlePressIn = () => {
    Animated.timing(backgroundColorAnim, {
      toValue: 1, // Transition to grey color
      duration: 3000, // Duration of the animation
      useNativeDriver: false, // Color animation doesn't support native driver
    }).start();
  };

  // Function to handle the button release (reset animation)
  const handlePressOut = () => {
    Animated.timing(backgroundColorAnim, {
      toValue: 0, // Transition back to original color
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };

  // Interpolating the animated value to transition between colors
  const backgroundColor = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FFFFFF", "#D3D3D3"], // From white to light grey
  });
  const translateView = useRef(new Animated.Value(0)).current;

  const swipeToShowDeleteButton = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(translateView, {
      toValue: -50,
      duration: 100,
      useNativeDriver: true,
    }).start();

    // will also animte the delete button
    animateDeleteButton.setValue(50);
    Animated.timing(animateDeleteButton, {
      toValue: -50,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const swipeToHideDeleteButton = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(translateView, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).start();
  };

  return (
    <GestureRecognizer
      onSwipeLeft={() => {
        setIsDeleteButtonVisible(true);
        swipeToShowDeleteButton();
      }}
      onSwipeRight={() => {
        setIsDeleteButtonVisible(false);
        swipeToHideDeleteButton();
      }}
    >
      <Pressable
        style={{
          width: "100%",
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        onPress={() => {
          setSelectedAlarm(alarm);
          setEditAlarmModalVisible(true);
        }}
      >
        <Animated.View
          style={[
            {
              width: isDeleteButtonVisible ? "100%" : "100%",
              height: 110,
              flexDirection: "row",
              borderRadius: 10,
              backgroundColor: "white",
              marginTop: 14,
              padding: 10,
            },
            { transform: [{ translateX: translateView }] },
          ]}
        >
          <View
            style={{
              flex: 1.6 / 5,
            }}
          >
            <Image
              resizeMode="cover"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 25,
              }}
              source={{
                uri: alarm?.image,
              }}
            />
          </View>
          <View
            style={{
              flex: 3.4 / 5,
              paddingHorizontal: 10,
              justifyContent: "space-between",

              //   backgroundColor: "blue",
            }}
          >
            <View
              style={{
                flex: 1.4 / 3,
                // backgroundColor: "red",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontFamily: "ubuntu",
                }}
              >
                {Math.round(alarm?.distance)}m Away
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontFamily: "ubuntu",
                  fontSize: 18,
                  flexWrap: "wrap",
                  height: 40,
                }}
              >
                {alarm?.location}
              </Text>
            </View>

            <View
              style={{
                flex: 1.4 / 3,
                flexDirection: "row",
                justifyContent: "space-between",
                // backgroundColor: "green",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  onPress={() => {
                    onDistanceChange(alarm);
                  }}
                >
                  <Animated.View
                    style={{
                      borderColor: "black",
                      backgroundColor: backgroundColor,
                      maxWidth: 100,
                      padding: 5,
                      borderRadius: 20,
                      borderWidth: 1,
                      paddingHorizontal: 10,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        maxWidth: 100,
                        overflow: "hidden",
                        height: "auto",
                        fontSize: 12,
                        maxHeight: 20,
                      }}
                    >
                      {Math.round(alarm?.ringsWhen)}m radius
                    </Text>
                  </Animated.View>
                </TouchableOpacity>

                <View>
                  <Switch
                    value={alarm?.status === "on"}
                    onValueChange={(value) => {
                      if (value) {
                        setDialogueBoxInformation(alarm);
                        onAlarmActivate(alarm, value);
                        setModalVisible(true);
                      } else {
                        onAlarmDeactivate(alarm, value);
                      }
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
        {isDeleteButtonVisible && (
          <Pressable
            style={{
              width: "20%",
              justifyContent: "center",
              padding: 10,
            }}
            onPress={() => {
              onAlarmDelete(alarm.id);
              setIsDeleteButtonVisible(false);
              swipeToHideDeleteButton();
            }}
          >
            <Animated.View
              style={{
                width: 35,
                height: 35,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transform: [{ translateX: animateDeleteButton }],
              }}
            >
              <Image
                style={{ width: 45, height: 45 }}
                source={require("../assets/icons8-delete-button-200.png")}
                resizeMode="contain"
              />
            </Animated.View>
          </Pressable>
        )}
      </Pressable>
    </GestureRecognizer>
  );
};

export default Components;
