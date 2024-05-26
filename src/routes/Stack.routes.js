import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const NavStack = createNativeStackNavigator();

export default function StackRoutes() {
  return(
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
      />
      <NavStack.Screen
        name="Register"
        component={Register}
      />
    </NavStack.Navigator>
  );
}