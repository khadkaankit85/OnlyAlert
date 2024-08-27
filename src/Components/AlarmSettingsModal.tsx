import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Alarm } from "../Constants";
interface AlarmSettingsModalProps {
  EditAlarmModalVisible: boolean;
  setEditAlarmModalVisible: (status: boolean) => void;
  modalInformation?: Alarm;
}

const AlarmSettingsModal = ({
  EditAlarmModalVisible,
  setEditAlarmModalVisible,
  modalInformation,
}: AlarmSettingsModalProps) => {
  if (!EditAlarmModalVisible) {
    setEditAlarmModalVisible(false);
    return;
  }
  return (
    <Modal
      onRequestClose={() => {
        setEditAlarmModalVisible(false);
      }}
      presentationStyle="formSheet"
      visible={EditAlarmModalVisible}
      animationType="slide"
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={styles.container}>
        <View style={styles.firstView}>
          <View>
            <Pressable onPress={() => setEditAlarmModalVisible(false)}>
              <Text
                style={{
                  color: "yellow",
                  fontSize: 20,
                }}
              >
                Cancel
              </Text>
            </Pressable>
          </View>
          <View>
            <Text style={{ color: "white", fontSize: 20 }}>Edit Alarm</Text>
          </View>
          <View>
            <Text
              style={{
                color: "yellow",
                fontSize: 20,
              }}
            >
              Save
            </Text>
          </View>
        </View>
        <View style={styles.secondView}>
          <View style={styles.secondViewOptions}>
            <Image
              source={{
                uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                width: 150,
                height: 150,
              }}
              resizeMode="cover"
              style={{ borderRadius: 150 / 2 }}
            />
          </View>
        </View>
        <View style={styles.thirdView}>
          <View style={styles.thirdViewOptions}>
            <Text style={[styles.textStyle]}>Location</Text>
            <Text style={[styles.textStyle]}>{modalInformation?.location}</Text>
          </View>
          <View style={styles.thirdViewOptions}>
            <Text style={[styles.textStyle]}>Label</Text>
            <Text style={[styles.textStyle]}>{modalInformation?.label}</Text>
          </View>
          <View style={styles.thirdViewOptions}>
            <Text style={[styles.textStyle]}>Distance</Text>
            <Text style={[styles.textStyle]}>{modalInformation?.distance}</Text>
          </View>
          <View
            style={[
              {
                borderWidth: 0,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                padding: 20,
              },
            ]}
          >
            <Text style={[styles.textStyle]}>Sound</Text>
            <Text style={[styles.textStyle]}>{modalInformation?.sound}</Text>
          </View>
        </View>
        <View style={styles.fourthView}>
          <TouchableOpacity
            style={{
              width: "90%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#595959",
              padding: 15,
              borderRadius: 20,
            }}
          >
            <View>
              <Text style={styles.deleteText}>Delete Alarm</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2f2f2f",
    alignItems: "center",
    justifyContent: "center",
  },
  firstView: {
    width: "100%",
    height: "10%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 15,
  },
  secondView: {
    width: "100%",
    height: "20%",
    alignItems: "center",
    padding: 40,
    marginBottom: 20,
  },
  secondViewOptions: {
    width: 160,
    height: 160,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 150 / 2,
  },
  thirdView: {
    width: "90%",
    height: "28%",
    backgroundColor: "#595959",
    marginTop: 20,
    borderRadius: 20,
  },
  thirdViewOptions: {
    width: "100%",
    height: "25%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 20,
    borderColor: "white",
    borderBottomWidth: 0.18,
  },
  fourthView: {
    width: "100%",
    height: "30%",
    alignItems: "center",
    marginTop: 30,
  },
  textStyle: { color: "white", fontSize: 15 },
  deleteText: {
    color: "red",
    fontSize: 20,
    textAlign: "center",
  },
});
export default AlarmSettingsModal;
