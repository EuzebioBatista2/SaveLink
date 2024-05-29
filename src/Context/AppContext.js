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
  const [loading, setLoading] = useState(false);
  const [webPage, setWebPage] = useState(false);
  const [urlPage, setUrlPage] = useState('');
  const [data, setData] = useState([]);

  function activateLoading(value ) {
    setLoading(value)
  }

  function activateWebPage(value, url) {
    setWebPage(value)
    setUrlPage(url)
  }

  async function getLinks() {
    activateLoading(true);
    const userUid = getAuth().currentUser.uid;
    const dbRef = ref(database, `${userUid}/links`);
    const itemList = [];
    await get(dbRef)
      .then((snapshot) => {
        snapshot.forEach(children => {
          let item = {
            name: children.val().title,
            links: children.val().items
          }
          itemList.push(item)
        })

        itemList.reverse()
        setData(itemList)
      })
    activateLoading(false);
  }

  async function getUser() {
    const user = getAuth();
    if (user.currentUser !== null) {
      const dbRef = ref(database, `${user.currentUser.uid}/name`)
      await get(dbRef).then((snapshot) => {
        setAuth({
          name: snapshot.val(),
          email: user.currentUser.email
        })
      })
      activateLoading(false);
    } else {
      activateLoading(false);
      navigation.navigate('Home');
    }
  }

  function handleLogout() {
    activateLoading(true);
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
    activateLoading(false);
    navigation.navigate('Home');
  }

  useEffect(() => {
    activateLoading(true);
    getUser();
  }, []);

  return (
    <AppContext.Provider value={{ 
      auth, 
      handleLogout, 
      getUser, 
      loading, 
      activateLoading,
      webPage,
      activateWebPage,
      urlPage,
      getLinks,
      data
    }}>
      {children}
    </AppContext.Provider>
  );
} 