//lets import contexts
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AlarmScreen from "./AlarmScreen";
import CreateAlarmScreen from "./CreateAlarmScreen";
import { CurrentUserLocationContext } from "../Context";

const Stack = createStackNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AlarmScreen">
        <Stack.Screen
          name="AlarmScreen"
          component={AlarmScreen}
          options={{
            headerShown: false,
            title: "My Alarms",
            cardStyle: {
              flex: 1,
              paddingTop: 50,
            },
          }}
        />
        <Stack.Screen
          name="createAlarmScreen"
          component={CreateAlarmScreen}
          options={{
            title: "Create Alarm",
            headerShown: false,
            cardStyle: {
              flex: 1,
            },
            cardStyleInterpolator: ({ current }) => ({
              cardStyle: {
                opacity: current.progress,
              },
            }),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
