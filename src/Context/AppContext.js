import { getAuth, signOut } from "firebase/auth";
import { get, ref } from "firebase/database";
import React, { createContext, useEffect, useState } from "react";
import firebase from "../database/firebase";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

export const AppContext = createContext({});

export default function AppProvider({ children }) {

  const database = firebase.database;
  const user = getAuth();
  const navigation = useNavigation();
  const [ auth, setAuth ] = useState({});

  useEffect(() => {
    function getUser() {
      if (user.currentUser !== null) {
        const dbRef = ref(database, `${user.uid}/name`)
        get(dbRef).then((snapshot) => {
          setAuth({
            name: snapshot.val(),
            email: user.email
          })
        })
      } else {
        navigation.navigate('Home');
      }
    }

    getUser();
  }, [])

  function handleLogout() {
    signOut(user)
      .then(() => {

        Alert.alert(
          'Success',
          'User logged out',
          [
            {
              text: 'Confirmar',
              style: 'default'
            }
          ]
        )
      })

      setAuth({})
      navigation.navigate('Home');
  }

  return (
    <AppContext.Provider value={{ auth, handleLogout }}>
      {children}
    </AppContext.Provider>
  );
} 