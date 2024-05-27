import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const NavStack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <NavStack.Navigator>
      <NavStack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false
        }}
      />
      <NavStack.Screen
        name="Login"
        component={Login}
        options={{
          headerStyle: {
            backgroundColor: '#1A1F1D',
          },
          headerTitleStyle: {
            color: '#FFF'
          },
          headerTintColor: '#FFF'
        }}
      />
      <NavStack.Screen
        name="Register"
        component={Register}
        options={{
          headerStyle: {
            backgroundColor: '#1A1F1D',
          },
          headerTitleStyle: {
            color: '#FFF'
          },
          headerTintColor: '#FFF'
        }}
      />
    </NavStack.Navigator>
  );
}