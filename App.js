import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import {
  createStackNavigator,
  StackView,
  TransitionSpecs,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "./src/features/Home/index";
import ItemScreen from "./src/features/Home/Screens/ItemScreen";
import colors from "./src/config/colors";
import string from "./src/config/string";
import config from "./src/config/config";

const Stack = createSharedElementStackNavigator();

const MyTransition = {
  gestureDirection: "horizontal",
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        opacity: current.progress,
      },
    };
  },
};

const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ ...MyTransition }}
      />
      <Stack.Screen
        name="Item"
        component={ItemScreen}
        sharedElementsConfig={(route, otherRoute, showing) => {
          if (otherRoute.name === "Home") {
            const { item } = route.params;
            return [`item.${item.key}.photo`];
          }
        }}
        options={({ navigation, route }) => ({
          ...MyTransition,
          headerShown: true,
          title: false,
          headerTransparent: true,
          headerTintColor: colors.white,
          headerLeft: false,
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                padding: config.SPACING,
              }}
            >
              <MaterialCommunityIcons
                style={{ marginHorizontal: config.SPACING }}
                name={string.ic_name_fire}
                color={colors.white}
                size={config.height * 0.04}
              />
              <MaterialCommunityIcons
                style={{ marginHorizontal: config.SPACING }}
                name={string.ic_name_download}
                color={colors.white}
                size={config.height * 0.04}
              />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden />
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
