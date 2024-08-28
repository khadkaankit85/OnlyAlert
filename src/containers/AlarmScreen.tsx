import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  Alert,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { SvgXml } from "react-native-svg";
import AlarmCard from "../Components/AlarmCard";
import DialogueBox from "../Components/DialogueBox";
import { useState, useEffect, useContext } from "react";
import { Alarm } from "../Constants";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { MainContext, MainContextType } from "../Context";
import { PaperProvider } from "react-native-paper";
import AlarmSettingsModal from "../Components/AlarmSettingsModal";
import CreateAlarmCard from "../Components/CreateAlarmCard";

const AlarmScreen = () => {
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }
    })();
  }, []);
  const navigation = useNavigation();
  const [DialogueBoxInformation, setDialogueBoxInformation] = useState<Alarm>();
  const [modalVisible, setModalVisible] = useState(false);
  const [EditAlarmModalVisible, setEditAlarmModalVisible] = useState(false);
  const [selectedAlarm, setSelectedAlarm] = useState<Alarm>();
  const { alarms, setAlarms } = useContext(MainContext);

  function onDistanceChange(index: number) {
    setAlarms((prevAlarms) => {
      const newAlarms = [...prevAlarms];
      const alarm = newAlarms[index];
      if (alarm.ringsWhen == 800) {
        alarm.ringsWhen = 300;
      } else if (alarm.ringsWhen == 300) {
        alarm.ringsWhen = 500;
      } else if (alarm.ringsWhen === 500) {
        alarm.ringsWhen = 600;
      } else {
        alarm.ringsWhen = 800;
      }

      return newAlarms;
    });
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
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            marginRight: 15,
          }}
          onPress={() => {
            navigation.navigate("createAlarmScreen" as never);
          }}
        >
          <SvgXml
            xml={`<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 256 256">
            <g fill="#808080" fill-rule="nonzero">
              <g transform="scale(5.12,5.12)">
                <path d="M21,3c-9.39844,0 -17,7.60156 -17,17c0,9.39844 7.60156,17 17,17c3.35547,0 6.46094,-0.98437 9.09375,-2.65625l12.28125,12.28125l4.25,-4.25l-12.125,-12.09375c2.17969,-2.85937 3.5,-6.40234 3.5,-10.28125c0,-9.39844 -7.60156,-17 -17,-17zM21,7c7.19922,0 13,5.80078 13,13c0,7.19922 -5.80078,13 -13,13c-7.19922,0 -13,-5.80078 -13,-13c0,-7.19922 5.80078,-13 13,-13z"></path>
              </g>
            </g>
            </svg>`}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{
          flex: 4 / 5,
          width: "100%",
          padding: 25,
        }}
      >
        {alarms.map((alarm, index) => (
          <AlarmCard
            key={index}
            onDistanceChange={() => {
              onDistanceChange(index);
            }}
            alarm={alarm}
            setSelectedAlarm={setSelectedAlarm}
            setEditAlarmModalVisible={setEditAlarmModalVisible}
            setDialogueBoxInformation={setDialogueBoxInformation}
            setModalVisible={setModalVisible}
          />
        ))}
        <DialogueBox
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          DialogueBoxInformation={DialogueBoxInformation}
        />
        <AlarmSettingsModal
          EditAlarmModalVisible={EditAlarmModalVisible}
          setEditAlarmModalVisible={setEditAlarmModalVisible}
          modalInformation={selectedAlarm}
        />
      </ScrollView>
    </View>
  );
};

export default AlarmScreen;
