import {
  View,
  Image,
  Text,
  Pressable,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useState, useRef } from "react";
import { Alarm } from "../Constants";
import { Switch } from "react-native-paper";
import GestureRecognizer from "react-native-swipe-gestures";
interface AlarmCardProps {
  onDistanceChange: (alarm: Alarm) => void;
  alarm: Alarm;
  setSelectedAlarm: (alarm: Alarm) => void;
  setEditAlarmModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Components = ({
  onDistanceChange,
  alarm,
  setSelectedAlarm,
  setEditAlarmModalVisible,
}: AlarmCardProps) => {
  const [isAlarmOn, setIsAlarmOn] = useState(alarm.status === "on");
  const [isDeleteButtonVisible, setIsDeleteButtonVisible] = useState(false);

  const backgroundColorAnim = useRef(new Animated.Value(0)).current;
  const animateDeleteButton = useRef(new Animated.Value(0)).current;

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
                uri: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
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
                {alarm.distance}Km Away
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  fontFamily: "ubuntu",
                }}
              >
                {alarm.location}
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
                <Pressable
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
                      {alarm.distance}km radius
                    </Text>
                  </Animated.View>
                </Pressable>

                <View>
                  <Switch
                    value={isAlarmOn}
                    onValueChange={(value) => {
                      if (value) {
                        console.log("on alarm set shall be implemented here");
                      }
                      setIsAlarmOn((prev) => !prev);
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
              console.log("delete button ");
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
