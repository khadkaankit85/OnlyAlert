import { LocationObjectCoords } from "expo-location";
import * as Location from "expo-location";
import { Alarm, LocationDetails } from "./Constants";
import { DetailedUserLocationType } from "./Context";

export function calculateTheDistanceBetweenTwoCoordinates(
  location1: LocationObjectCoords | undefined,
  location2: LocationObjectCoords | undefined
): number {
  if (!location1 || !location2) {
    return -1;
  }
  const R = 6371e3; // metres
  const φ1 = (location1.latitude * Math.PI) / 180; // φ, λ in radians
  const φ2 = (location2.latitude * Math.PI) / 180;
  const Δφ = ((location2.latitude - location1.latitude) * Math.PI) / 180;
  const Δλ = ((location2.longitude - location1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres
  return d;
}

export function reverseGeocodeAsync(location: LocationObjectCoords) {
  return Location.reverseGeocodeAsync({
    latitude: location.latitude,
    longitude: location.longitude,
  });
}

export function getTheMostMeaningfulLocationName(
  selectedLocation: DetailedUserLocationType | null
) {
  console.log(selectedLocation?.readableAddress);
  if (!selectedLocation) {
    return "";
  }
  //to get the most readable and informative address
  return selectedLocation?.readableAddress?.streetNumber &&
    selectedLocation?.readableAddress?.street &&
    selectedLocation?.readableAddress?.city
    ? `${selectedLocation.readableAddress.streetNumber} ${selectedLocation.readableAddress.street}, ${selectedLocation.readableAddress.city}`
    : selectedLocation?.readableAddress?.name &&
      selectedLocation?.readableAddress?.city
    ? `${selectedLocation.readableAddress.name}, ${selectedLocation.readableAddress.city}`
    : selectedLocation?.readableAddress?.name &&
      selectedLocation?.readableAddress?.region
    ? `${selectedLocation.readableAddress.name}, ${selectedLocation.readableAddress.region}`
    : selectedLocation?.readableAddress?.street &&
      selectedLocation?.readableAddress?.city
    ? `${selectedLocation.readableAddress.street}, ${selectedLocation.readableAddress.city}`
    : selectedLocation?.readableAddress?.city &&
      selectedLocation?.readableAddress?.region
    ? `${selectedLocation.readableAddress.city}, ${selectedLocation.readableAddress.region}`
    : selectedLocation?.readableAddress?.district &&
      selectedLocation?.readableAddress?.city
    ? `${selectedLocation.readableAddress.district}, ${selectedLocation.readableAddress.city}`
    : selectedLocation?.readableAddress?.city &&
      selectedLocation?.readableAddress?.country
    ? `${selectedLocation.readableAddress.city}, ${selectedLocation.readableAddress.country}`
    : selectedLocation?.readableAddress?.formattedAddress
    ? selectedLocation.readableAddress.formattedAddress
    : selectedLocation?.readableAddress?.name
    ? selectedLocation.readableAddress.name
    : selectedLocation?.readableAddress?.city
    ? selectedLocation.readableAddress.city
    : selectedLocation?.readableAddress?.region
    ? selectedLocation.readableAddress.region
    : selectedLocation?.readableAddress?.country
    ? selectedLocation.readableAddress.country
    : "";
}

export function getRandomImageForAlarmCard(
  baseLink:
    | "https://picsum.photos/200/300"
    | "https://placecats.com/300/200"
    | "upsplash"
) {
  if (baseLink === "https://placecats.com/300/200") {
    console.log(`${baseLink}?random=${Math.floor(Math.random() * 1000)}`);
    return baseLink + `?random=${Math.floor(Math.random() * 1000)}`;
  }
  if (baseLink === "upsplash") {
    return `https://source.unsplash.com/random/800x600?sig=${Math.floor(
      Math.random() * 1000
    )}`;
  }
  return `https://picsum.photos/seed/${Math.floor(
    Math.random() * 1000
  )}/800/600`;
}
