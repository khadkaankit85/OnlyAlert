import React from "react";
import renderer from "react-test-renderer";
import AlarmCard from "../Components/AlarmCard";

test("AlarmCard renders correctly", () => {
  const tree = renderer
    .create(
      <AlarmCard
        onAlarmSet={() => {
          console.log("Alarm Set");
        }}
        onDistanceChange={() => {
          console.log("Distance Change");
        }}
        alarm={{
          status: true,
          distance: 5,
          location: "Home",
        }}
      />
    )
    .toJSON();
});
