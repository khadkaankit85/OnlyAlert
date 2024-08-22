// SearchBar.js
import { useContext } from "react";
import { View, TextInput, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import backButton from "../assets/icons8-back-50.png";
import { SelectedLocation } from "../containers/CreateAlarmScreen";

const SearchBar = () => {
  const navigation = useNavigation();

  const selectedLocationContext = useContext(SelectedLocation);
  const { selectedLocation, setSelectedLocation } = selectedLocationContext;

  return (
    <View
      style={{
        position: "absolute",
        top: 80,
        left: 20,
        right: 20,
        zIndex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 50,
      }}
    >
      <Pressable
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image
          source={backButton}
          style={{
            width: 35,
            height: 35,
          }}
        />
      </Pressable>

      <TextInput
        placeholder={
          selectedLocation && selectedLocation?.street != null
            ? `${selectedLocation?.street}, ${selectedLocation?.city}`
            : ""
        }
        style={{
          flex: 1,
          marginLeft: 10,
          fontSize: 16,
          fontFamily: "montserrat",
          paddingHorizontal: 10,
          height: 40,
          borderRadius: 5,
        }}
      />
    </View>
  );
};

export default SearchBar;
