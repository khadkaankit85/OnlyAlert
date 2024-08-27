// SearchBar.js
import { useContext } from "react";
import { View, TextInput, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import backButton from "../assets/icons8-back-50.png";
import {
  SelectedLocationContext,
  CurrentUserLocationContext,
} from "../Context";

const SearchBar = () => {
  const navigation = useNavigation();

  const { selectedLocation, setSelectedLocation } = useContext(
    SelectedLocationContext
  );
  const { userLocation, setUserLocation } = useContext(
    CurrentUserLocationContext
  );
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
          selectedLocation &&
          selectedLocation.readableAddress?.streetNumber &&
          selectedLocation.readableAddress?.street &&
          selectedLocation.readableAddress.city
            ? `${selectedLocation?.readableAddress.streetNumber}, ${selectedLocation?.readableAddress.street}, ${selectedLocation?.readableAddress.city}`
            : userLocation?.readableAddress?.streetNumber &&
              userLocation?.readableAddress?.street &&
              userLocation?.readableAddress?.city
            ? `${userLocation?.readableAddress.streetNumber}, ${userLocation?.readableAddress.street}, ${userLocation?.readableAddress.city}`
            : "Search for a location"
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
