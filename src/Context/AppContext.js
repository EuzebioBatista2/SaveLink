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
  const [ selectOptions, setSelectOptions ] = useState([]);
  const [ option, setOption ] = useState('');


  function handleSetOption(value) {
    setOption(value)
  }

  function activateLoading(value ) {
    setLoading(value)
  }

  function activateWebPage(value, url) {
    setWebPage(value)
    setUrlPage(url)
  }

  async function getSelect() {
    const userUid = getAuth().currentUser.uid
    const dbRef = ref(database, `${userUid}/links`);
    let optionsList = [];
    await get(dbRef)
      .then(snapshot => {
        snapshot.forEach((children) => {
          const item = {
            key: children.key,
            title: children.val().title
          }
          optionsList.push(item)
        })
        optionsList.reverse();
        setSelectOptions(optionsList);
      })
    activateLoading(false);
  }

  async function getLinks() {
    const userUid = getAuth().currentUser.uid;
    const dbRef = ref(database, `${userUid}/links`);
    const itemList = [];
    await get(dbRef)
      .then((snapshot) => {
        snapshot.forEach(children => {
          let item = {
            key: children.key,
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
    let email = user.currentUser?.email
    if (user.currentUser !== null) {
      const dbRef = ref(database, `${user.currentUser.uid}/name`)
      await get(dbRef).then((snapshot) => {
        if(user.currentUser.email.includes('.savelink')) {
          email = 'Usuário local'
        }
        setAuth({
          name: snapshot.val(),
          email: email
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
          'Sucesso',
          'Usuário deslogado.',
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
      data,
      getSelect,
      selectOptions,
      handleSetOption,
      option
    }}>
      {children}
    </AppContext.Provider>
  );
} 