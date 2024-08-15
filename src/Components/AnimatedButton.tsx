import React, { useEffect, useRef } from "react";
import { View, Animated, Text, TouchableOpacity } from "react-native";
const DrawnButton = () => {
  const scaleAnim = useRef(new Animated.Value(0)).current; // Start with width 0

  useEffect(() => {
    // Start the rubber-like animation when the component is mounted
    Animated.spring(scaleAnim, {
      toValue: 1.4, // The scale value you want to achieve (twice the original size)
      friction: 1, // Controls the bounciness (lower values are bouncier)
      tension: 100, // Controls the stiffness of the spring (higher values are stiffer)
      useNativeDriver: true,
    }).start(() => {
      // Optionally, reverse the animation to return to the original size
      Animated.spring(scaleAnim, {
        toValue: 1, // Back to original size
        friction: 2,
        tension: 100,
        useNativeDriver: true,
      }).start();
    });
  }, [scaleAnim]);

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }], // Move the button to the left
        height: 30,
        width: 31,
        backgroundColor: "#FF69B4", // Light pink color
        justifyContent: "center",
        borderRadius: 25,
      }}
    >
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontSize: 18,
        }}
      >
        ✓
      </Text>
    </Animated.View>
  );
};
export default DrawnButton;
