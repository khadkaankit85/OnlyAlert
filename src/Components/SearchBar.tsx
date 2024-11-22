// SearchBar.js
import {
  LegacyRef,
  MutableRefObject,
  useContext,
  useRef,
  useState,
} from "react";
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import backButton from "../assets/icons8-back-50.png";
import {
  SelectedLocationContext,
  CurrentUserLocationContext,
} from "../Context";
import { getTheMostMeaningfulLocationName } from "../Utils";

const SearchBar = () => {
  const navigation = useNavigation();

  const { selectedLocation, setSelectedLocation } = useContext(
    SelectedLocationContext
  );
  const { userLocation, setUserLocation } = useContext(
    CurrentUserLocationContext
  );

  const searchLocationInputValue = useRef<string>("");

  const handleInputChange = (inputvalue: string) => {
    searchLocationInputValue.current = inputvalue;
    console.log(searchLocationInputValue.current);
  };

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
      <TouchableOpacity
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
      </TouchableOpacity>

      <TextInput
        placeholder={
          getTheMostMeaningfulLocationName(selectedLocation) ||
          getTheMostMeaningfulLocationName(userLocation) ||
          "Search for a location"
        }
        autoComplete="address-line2"
        onChangeText={handleInputChange}
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
