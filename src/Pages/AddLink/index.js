import React, {useContext, useEffect, useState} from 'react';
import {Alert, Keyboard, Text} from 'react-native';
import {AppContext} from '../../Context/AppContext';
import Loading from '../../components/Loading';
import {
  AddLinkBackground,
  Button,
  ButtonText,
  Buttons,
  Container,
  Forms,
} from './styles';
import ContainerForm from '../../components/ContainerForm';
import {getAuth} from 'firebase/auth';
import firebase from '../../database/firebase';
import {push, ref, set, update} from 'firebase/database';
import {useNavigation} from '@react-navigation/native';
import LinkForm from '../../components/LinkForm';

export default function AddLink() {
  const database = firebase.database;
  const navigation = useNavigation();

  const {
    getUser,
    loading,
    activateLoading,
    getLinks,
    getSelect,
    selectOptions,
    handleSetOption,
    option,
  } = useContext(AppContext);

  function buttonToggle(option) {
    handleSetOption(option);
  }

  async function submitLink(data) {
    const capitalizeTitle =
      data.name.charAt(0).toUpperCase() + data.name.slice(1);
    activateLoading(true);
    const userUid = getAuth().currentUser.uid;
    const dbRef = ref(database, `users/${userUid}/links/${data.key}/items`);
    const linkName = capitalizeTitle;
    const linkUrl = data.url;
    await update(dbRef, {
      [linkName]: linkUrl,
    })
      .then(() => {
        Alert.alert('Sucesso', 'Link criado!', [
          {
            text: 'Confirmar',
            style: 'default',
          },
        ]);

        Keyboard.dismiss();
        handleSetOption('');
        activateLoading(true);
        getLinks();
        navigation.navigate('Dashboard');
      })
      .catch(() => {
        Alert.alert('Erro', 'Oops! Algo deu errado...', [
          {
            text: 'Confirmar',
            style: 'default',
          },
        ]);
        activateLoading(false);
      });
  }

  async function submitContainer(title) {
    const capitalizeTitle = title.charAt(0).toUpperCase() + title.slice(1);
    activateLoading(true);
    const userUid = getAuth().currentUser.uid;
    const key = push(ref(database, `users/${userUid}/links`)).key;
    const dbRef = ref(database, `users/${userUid}/links/${key}`);
    await set(dbRef, {
      title: capitalizeTitle,
    })
      .then(() => {
        Alert.alert('Sucesso', 'Container criado!', [
          {
            text: 'Confirmar',
            style: 'default',
          },
        ]);

        Keyboard.dismiss();
        handleSetOption('');
        activateLoading(true);
        getLinks();
        activateLoading(true);
        getSelect();
        navigation.navigate('Dashboard');
      })
      .catch(() => {
        Alert.alert('Erro', 'Oops! Algo deu errado...', [
          {
            text: 'Confirmar',
            style: 'default',
          },
        ]);
        activateLoading(false);
      });
  }

  useEffect(() => {
    activateLoading(true);
    getUser();
    getSelect();
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <Container>
        <AddLinkBackground source={require('../../images/Background2.jpg')}>
          <Buttons>
            <Button
              checked={option === 'Container' ? true : false}
              onPress={() => buttonToggle('Container')}>
              <ButtonText>Container</ButtonText>
            </Button>

            <Button
              checked={option === 'Link' ? true : false}
              onPress={() => buttonToggle('Link')}>
              <ButtonText>Link</ButtonText>
            </Button>
          </Buttons>

          <Forms>
            {option === 'Container' || option === 'Link' ? (
              option === 'Container' ? (
                <ContainerForm submit={submitContainer} />
              ) : (
                <LinkForm list={selectOptions} submit={submitLink} />
              )
            ) : (
              <Text style={{color: '#FFF', textAlign: 'center', fontSize: 20}}>
                Nenhuma opção selecionada
              </Text>
            )}
          </Forms>
        </AddLinkBackground>
      </Container>
    );
  }
}
