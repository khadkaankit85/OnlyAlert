import { View, Text, Image, ScrollView, Pressable } from "react-native";
import { SvgXml } from "react-native-svg";
import AlarmCard from "../Components/AlarmCard";
import DialogueBox from "../Components/DialogueBox";
import { useState } from "react";
import { Alarm } from "../Constants";

const AlarmScreen = () => {
  const [DialogueBoxInformation, setDialogueBoxInformation] = useState<Alarm>();
  const [modalVisible, setModalVisible] = useState(true);
  const Alarms: Alarm[] = [
    {
      status: true,
      distance: 5,
      location: "Home",
    },
    {
      status: false,
      distance: 10,
      location: "Work",
    },
  ];

  function onAlarmSet(alarm: Alarm) {
    setDialogueBoxInformation(alarm);
    setModalVisible(true);
  }

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
      }}
    >
      <View
        style={{
          flex: 0.4 / 5,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontFamily: "montserrat",
            marginLeft: 15,
          }}
        >
          My Alarms
        </Text>
        <Pressable
          style={{
            width: 50,
            height: 50,
            marginRight: 15,
          }}
        >
          <SvgXml
            xml={` <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 256 256">
      <g fill="#808080" fill-rule="nonzero">
        <g transform="scale(5.12,5.12)">
          <path d="M21,3c-9.39844,0 -17,7.60156 -17,17c0,9.39844 7.60156,17 17,17c3.35547,0 6.46094,-0.98437 9.09375,-2.65625l12.28125,12.28125l4.25,-4.25l-12.125,-12.09375c2.17969,-2.85937 3.5,-6.40234 3.5,-10.28125c0,-9.39844 -7.60156,-17 -17,-17zM21,7c7.19922,0 13,5.80078 13,13c0,7.19922 -5.80078,13 -13,13c-7.19922,0 -13,-5.80078 -13,-13c0,-7.19922 5.80078,-13 13,-13z"></path>
        </g>
      </g>
    </svg>`}
          />
        </Pressable>
      </View>

      <ScrollView
        style={{
          flex: 4 / 5,
          width: "100%",
          padding: 25,
        }}
      >
        {Alarms.map((alarm, index) => {
          return (
            <AlarmCard
              key={index}
              onAlarmSet={() => {
                onAlarmSet(alarm);
              }}
              alarm={alarm}
            />
          );
        })}
        <DialogueBox
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          DialogueBoxInformation={DialogueBoxInformation}
        />
      </ScrollView>
    </View>
  );
};

export default AlarmScreen;
