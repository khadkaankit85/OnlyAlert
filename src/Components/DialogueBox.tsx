import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Button } from "react-native";
import { Alarm } from "../Constants";
import AnimatedButton from "./AnimatedButton";
import { Modal, Portal } from "react-native-paper";

interface DialogueBoxProps {
  modalVisible: boolean;
  setModalVisible: (statusOfModal: boolean) => void;
  DialogueBoxInformation: Alarm | undefined;
}

const DialogueBox = ({
  modalVisible,
  setModalVisible,
  DialogueBoxInformation,
}: DialogueBoxProps) => {
  console.log("mounted the modal");

  return (
    <Portal>
      <Modal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        style={styles.container}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <View
              style={{
                width: 100,
                height: 100,
                backgroundColor: "#FF69B4",
                marginBottom: 20,
                borderRadius: (1 / 2) * 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AnimatedButton />
            </View>
            <Text style={styles.modalText}>
              Now you can relax and enjoy your trip. we will inform you when you
              are{" "}
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                {Math.round(DialogueBoxInformation?.ringsWhen || 0)}m away from{" "}
                {DialogueBoxInformation?.location}
              </Text>
            </Text>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Thanks</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
});

export default DialogueBox;
