import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import MovieScreen from "../screens/MovieScreen";
import SearchScreen from "../screens/SearchScreen";
import SignIn from "../screens/SignIn";
import PrivateRoutes from "./PrivateRoutes";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          options={{ headerShown: false }}
          component={SignIn}
        />

        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {() => (
            <PrivateRoutes>
              <Home />
            </PrivateRoutes>
          )}
        </Stack.Screen>

        <Stack.Screen name="Movie" options={{ headerShown: false }}>
          {() => (
            <PrivateRoutes>
              <MovieScreen />
            </PrivateRoutes>
          )}
        </Stack.Screen>

        <Stack.Screen name="Search" options={{ headerShown: false }}>
          {() => (
            <PrivateRoutes>
              <SearchScreen />
            </PrivateRoutes>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
