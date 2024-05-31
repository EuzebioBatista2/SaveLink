import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import TabRoutes from "./Tab.routes";

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
          title: 'Página de login',
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
          title: 'Página de cadastro',
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
        name="TabRoutes"
        component={TabRoutes}
        options={{
          headerShown: false
        }}
      />
    </NavStack.Navigator>
  );
}