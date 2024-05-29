import React, { useContext, useEffect, useState } from "react";
import { CloseButton, Container, DashboardBackground, Title } from "./styles";
import { AppContext } from "../../Context/AppContext";
import Loading from "../../components/Loading";
import { getAuth } from "firebase/auth";
import firebase from "../../database/firebase";
import { get, ref } from "firebase/database";
import { FlatList, View } from "react-native";
import CardItem from "../../components/CardItem";
import { WebView } from "react-native-webview";
import Feather from 'react-native-vector-icons/Feather'

export default function Dashboard() {

  const database = firebase.database;
  const { 
    getUser, 
    loading, 
    activateLoading, 
    webPage, 
    activateWebPage,
    urlPage
  } = useContext(AppContext);

  const [data, setData] = useState([]);

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

  useEffect(() => {
    activateLoading(true);
    getUser();
  }, [])

  useEffect(() => {
    getLinks();
  }, [])

  if (loading) {
    return (
      <Loading />
    )
  }
  else if (webPage) {
    return (
      <View style={{ flex: 1, position: 'relative' }}>
        <WebView source={{ uri: urlPage}} />
        <CloseButton onPress={() => activateWebPage(false)}>
          <Feather name="x" color="#FFF" size={25} />
        </CloseButton>
      </View>
    )
  }
  else {
    return (
      <Container>
        <DashboardBackground source={require('../../images/Background.jpg')}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <CardItem list={item} />
            )}
            showsVerticalScrollIndicator={false}
          />
        </DashboardBackground>
      </Container>
    );
  }

}