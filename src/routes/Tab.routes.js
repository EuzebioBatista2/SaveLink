import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react"
import Feather from 'react-native-vector-icons/Feather'

import Dashboard from "../Pages/Dashboard";
import Account from "../Pages/Account";
import AddLink from "../Pages/AddLink";

export default function TabRoutes({ route }) {

  const NavTab = createBottomTabNavigator();
  const { params } = route;

  return (
    <NavTab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1A1F1D' },
        tabBarStyle: { backgroundColor: '#1A1F1D' },
        headerTintColor: '#FFF',
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray'
      }}
    >
      <NavTab.Screen
        name="Dashboard"
        initialParams={params}
        component={Dashboard}
        options={{
          title: 'Página inicial',
          tabBarIcon: ({ color, size }) => {
            return <Feather name="home" color={color} size={size} />
          }
        }}
      />

      <NavTab.Screen
        name="AddLink"
        initialParams={params}
        component={AddLink}
        options={{
          title: 'Adicionar link',
          tabBarIcon: ({ color, size }) => {
            return <Feather name="plus-circle" color={color} size={size} />
          }
        }}
      />

      <NavTab.Screen
        name="Account"
        initialParams={params}
        component={Account}
        options={{
          title: 'Conta',
          tabBarIcon: ({ color, size }) => {
            return <Feather name="user" color={color} size={size} />
          }
        }}
      />
    </NavTab.Navigator>
  );
}