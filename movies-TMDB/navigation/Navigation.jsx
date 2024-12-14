import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "../screens/Home";
import MovieScreen from "../screens/MovieScreen";
import SearchScreen from "../screens/SearchScreen";
import SignIn from "../screens/SignIn";
import Favorites from "../screens/Favorites";
import PrivateRoutes from "./PrivateRoutes";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: "#1E1E1E", width: 250 },
        drawerLabelStyle: { color: "white" },
      }}
    >
      <Drawer.Screen
        name="DrawerHome"
        options={{ title: "Home" }}
        component={Home}
      />
      <Drawer.Screen
        name="Favorites"
        options={{ title: "Favoritos" }}
        component={Favorites}
      />
    </Drawer.Navigator>
  );
}

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
              <DrawerNavigator />
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
