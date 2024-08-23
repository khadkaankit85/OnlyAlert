import { LocationObjectCoords } from "expo-location";
export function calculateTheDistanceBetweenTwoCoordinates(
  location1: LocationObjectCoords | undefined,
  location2: LocationObjectCoords | undefined
): number {
  if (!location1 || !location2) {
    return 0;
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
