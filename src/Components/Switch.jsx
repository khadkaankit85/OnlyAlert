import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';

const CustomSwitch = ({ isOn, onToggle }) => {
    const [switchOn, setSwitchOn] = useState(isOn);
    const translateX = useRef(new Animated.Value(switchOn ? 20 : 0)).current;

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: switchOn ? 20 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [switchOn]);

    const toggleSwitch = () => {
        setSwitchOn(!switchOn);
        onToggle(!switchOn);
    };

    return (
        <TouchableOpacity onPress={toggleSwitch} style={styles.switchContainer}>
            <Animated.View
                style={[
                    styles.switchCircle,
                    {
                        transform: [{ translateX }],
                        backgroundColor: switchOn ? '#4cd137' : '#dcdde1',
                    },
                ]}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    switchContainer: {
        width: 50,
        height: 25,
        borderRadius: 25,
        backgroundColor: '#dcdde1',
        justifyContent: 'center',
        padding: 3,
    },
    switchCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#4cd137',
    },
});

export default CustomSwitch;
