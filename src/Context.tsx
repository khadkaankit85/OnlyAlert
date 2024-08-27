import React, { createContext, Dispatch, SetStateAction } from "react";
import { LocationGeocodedAddress, LocationObject } from "expo-location";
import { Alarm } from "./Constants";

// type for readable address
export type LocationDetails = {
  city: string;
  country: string;
  district: string;
  isoCountryCode: string;
  name: string;
  postalCode: string;
  region: string;
  street: string;
  streetNumber: string;
  subregion: string;
  timezone: string;
};

//this is the type for detailed userlocation, for selected location and users's current location
export type DetailedUserLocationType = {
  readableAddress?: LocationGeocodedAddress;
  mathematicalAddress?: LocationObject;
};

// Context types for selected location and user location
type SelectedLocationContextType = {
  selectedLocation: DetailedUserLocationType | null;
  setSelectedLocation: Dispatch<SetStateAction<DetailedUserLocationType>>;
};

export type UserLocationContextType = {
  userLocation: DetailedUserLocationType | null;
  setUserLocation: Dispatch<SetStateAction<DetailedUserLocationType>>;
};

//this is the context for selected location
export const SelectedLocationContext =
  createContext<SelectedLocationContextType>({
    selectedLocation: null,
    setSelectedLocation: () => {},
  });

export const CurrentUserLocationContext =
  createContext<UserLocationContextType>({
    userLocation: null,
    setUserLocation: () => {},
  });

export type MainContextType = {
  alarms: Alarm[];
  setAlarms: Dispatch<SetStateAction<Alarm[]>>;
  onAlarmActivate: (alarm: Alarm) => void;
  onAlarmDeactivate: (alarm: Alarm) => void;
  onAlarmDelete: (alarm: Alarm) => void;
  onAlarmAdd: (alarm: Alarm) => void;
};
export const MainContext = createContext<MainContextType>({
  alarms: [],
  setAlarms: () => {},
  onAlarmActivate: () => {},
  onAlarmDeactivate: () => {},
  onAlarmDelete: () => {},
  onAlarmAdd: () => {},
});
