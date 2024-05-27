import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import StackRoutes from "./src/routes/Stack.routes";
import AppProvider from "./src/Context/AppContext";

export default function App() {
  return(
    <NavigationContainer>
      <AppProvider>
        <StackRoutes />
      </AppProvider>
    </NavigationContainer>
  );
}