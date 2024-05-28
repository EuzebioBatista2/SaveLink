import { getAuth, signOut } from "firebase/auth";
import { get, ref } from "firebase/database";
import React, { createContext, useEffect, useState } from "react";
import firebase from "../database/firebase";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

export const AppContext = createContext({});

export default function AppProvider({ children }) {

  const database = firebase.database;
  const navigation = useNavigation();
  const [auth, setAuth] = useState({});

  function getUser() {
    const user = getAuth();
    if (user.currentUser !== null) {
      const dbRef = ref(database, `${user.currentUser.uid}/name`)
      get(dbRef).then((snapshot) => {
        console.log(snapshot)
        setAuth({
          name: snapshot.val(),
          email: user.currentUser.email
        })
      })
    } else {
      navigation.navigate('Home');
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  function handleLogout() {
    const user = getAuth();
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
    <AppContext.Provider value={{ auth, handleLogout, getUser }}>
      {children}
    </AppContext.Provider>
  );
} 