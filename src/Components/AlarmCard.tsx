import { View, Image, Text, Pressable, Animated } from "react-native";
import { useState, useRef } from "react";
import { Alarm } from "../Constants";

interface AlarmCardProps {
  onAlarmSet: (alarm: Alarm) => void;
  onDistanceChange: (alarm: Alarm) => void;
  alarm: Alarm;
}

const Components = ({
  onAlarmSet,
  onDistanceChange,
  alarm,
}: AlarmCardProps) => {
  const backgroundColorAnim = useRef(new Animated.Value(0)).current;
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

  return (
    <View
      style={{
        width: "100%",
        height: 110,
        flexDirection: "row",
        borderRadius: 10,
        backgroundColor: "white",
        marginTop: 14,
        padding: 10,
      }}
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
                console.log("Pressed");
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

            <Pressable
              onPress={() => {
                onAlarmSet(alarm);
              }}
              style={{
                width: 70,
                height: 30,
                marginRight: 20,
                backgroundColor: "#000080",
                borderRadius: 20,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontFamily: "ubuntu",
                  fontSize: 18,
                }}
              >
                Set
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Components;
