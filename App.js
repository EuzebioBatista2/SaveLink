import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import StackRoutes from "./src/routes/Stack.routes";


export default function App() {
  return(
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  );
}