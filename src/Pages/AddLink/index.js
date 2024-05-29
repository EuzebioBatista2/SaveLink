import React, { useContext, useEffect, useState } from "react";
import { Alert, Keyboard, Text } from "react-native";
import { AppContext } from "../../Context/AppContext";
import Loading from "../../components/Loading";
import { AddLinkBackground, Button, ButtonText, Buttons, Container, Forms } from "./styles";
import ContainerForm from "../../components/ContainerForm";
import { getAuth } from "firebase/auth";
import firebase from "../../database/firebase";
import { get, push, ref, set, update } from "firebase/database";
import { useNavigation } from "@react-navigation/native";
import LinkForm from "../../components/LinkForm";

export default function AddLink () {

  const database = firebase.database;
  const navigation = useNavigation();

  const { getUser, loading, activateLoading, getLinks } = useContext(AppContext);

  const [ option, setOption ] = useState('');
  const [ options, setOptions ] = useState([]);

  function buttonToggle(option) {
    setOption(option)
  }

  async function submitLink(data) {
    const capitalizeTitle = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    activateLoading(true);
    const userUid = getAuth().currentUser.uid;
    const dbRef = ref(database, `${userUid}/links/${data.key}/items`);
    const linkName = capitalizeTitle;
    const linkUrl = data.url
    await update(dbRef, {
      [linkName]: linkUrl
    })
    .then(() => {
      Alert.alert(
        'Sucesso',
        'Link criado!',
        [
          {
            text: 'Confirmar',
            style: 'default'
          }
        ]
      );

      Keyboard.dismiss();
      setOption('');
      activateLoading(false);
      getLinks();
      navigation.navigate('Dashboard');
    })
    .catch(() => {
      Alert.alert(
        'Erro',
        'Oops! Algo deu errado...',
        [
          {
            text: 'Confirmar',
            style: 'default'
          }
        ]
      );
      activateLoading(false);
    })

  }

  async function submitContainer(title) {
    const capitalizeTitle = title.charAt(0).toUpperCase() + title.slice(1);
    activateLoading(true);
    const userUid = getAuth().currentUser.uid;
    const key = push(ref(database, `${userUid}/links`)).key
    const dbRef = ref(database, `${userUid}/links/${key}`);
    await set(dbRef, {
      title: capitalizeTitle
    })
    .then(() => {
      Alert.alert(
        'Sucesso',
        'Container criado!',
        [
          {
            text: 'Confirmar',
            style: 'default'
          }
        ]
      );

      Keyboard.dismiss();
      setOption('');
      activateLoading(false);
      getLinks();
      getSelect();
      navigation.navigate('Dashboard');
    })
    .catch(() => {
      Alert.alert(
        'Erro',
        'Oops! Algo deu errado...',
        [
          {
            text: 'Confirmar',
            style: 'default'
          }
        ]
      );
      activateLoading(false);
    })
  }

  async function getSelect() {
    activateLoading(true);
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
        setOptions(optionsList);
      })
    activateLoading(false);
  }


  useEffect(() => {
    activateLoading(true);
    getUser();
    getSelect();
  }, [])

  if(loading) {
    return(
      <Loading />
    )
  } else {
    return (
      <Container>
        <AddLinkBackground source={require('../../images/Background.jpg')}>
          <Buttons>
            <Button
              checked={option === 'Container' ? true : false}
              onPress={() => buttonToggle('Container')}
            >
              <ButtonText>Container</ButtonText>
            </Button>

            <Button
              checked={option === 'Link' ? true : false}
              onPress={() => buttonToggle('Link')}
            >
              <ButtonText>Link</ButtonText>
            </Button>
          </Buttons>

          <Forms>
            {option === 'Container' || option === 'Link' ? (
              option === 'Container' ? <ContainerForm submit={submitContainer} /> : <LinkForm list={options} submit={submitLink} />
            ) : (
              <Text style={{ color: '#5F6362', textAlign: 'center' }}>Nenhuma opções selecionada</Text>
            )}
          </Forms>
        </AddLinkBackground>
      </Container>
    );
  }

}