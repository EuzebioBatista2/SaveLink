import React, { useContext, useEffect, useState } from "react";
import { BrandContainer, Button, ButtonText, Buttons, Container, HomeBackground, LineOne, LineTwo, LogoIcon, PrincipalLogo, PrincipalText } from "./styles";
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AppContext } from "../../Context/AppContext";
import Loading from "../../components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "../../database/firebase";
import { ref, set } from "firebase/database";
import getRandomString from "../../functions/getRandomString";
import { Alert, Keyboard } from "react-native";

export default function Home() {

  const database = firebase.database;
  const auth = firebase.auth;
  const navigation = useNavigation();
  const { loading, activateLoading, getUser } = useContext(AppContext);

  useEffect(() => {
    activateLoading(true);
    const auth = getAuth();

    auth.onAuthStateChanged((user) => {
      if (user !== null) {
        activateLoading(false);
        navigation.navigate('TabRoutes', { screen: 'Dashboard' })
      }
      activateLoading(false);
    });
  }, []);

  function insertName(uid) {
    const dbRef = ref(database, `${uid}`);

    set(dbRef, {
      name: 'localUser'
    })
      .then(() => {

        Alert.alert(
          'Success',
          'Register successfully!',
          [
            {
              text: 'Confirmar',
              style: 'default'
            }
          ]
        );

        Keyboard.dismiss();
        activateLoading(false);
        navigation.navigate('TabRoutes', { screen: 'Dashboard' })
      })
  }

  async function autoLogin() {
    activateLoading(true)
    await AsyncStorage.getItem('@SAVELINK').then(value => {
      if (value === null) {
        const randomString = getRandomString(8);
        const fakeEmail = `${randomString}@${randomString}.com`
        const fakePassword = randomString

        const stringValue = JSON.stringify({
          email: fakeEmail,
          password: fakePassword
        })

        AsyncStorage.setItem('@SAVELINK', stringValue);

        createUserWithEmailAndPassword(auth, fakeEmail, fakePassword)
          .then((response) => {
            insertName(response.user.uid)
          })
          .catch(() => {
            activateLoading(false);
            Alert.alert(
              'Error',
              'Something went wrong...',
              [
                {
                  text: 'Confirmar',
                  style: 'default'
                }
              ]
            )
          })
      } else {
        objectValue = JSON.parse(value);
        const email = objectValue.email;
        const password = objectValue.password;
        signInWithEmailAndPassword(auth, email, password)
          .then(async () => {
            Alert.alert(
              'Success',
              'User loged in!',
              [
                {
                  text: 'Confirmar',
                  style: 'default'
                }
              ]
            );
            await getUser();
            Keyboard.dismiss();
            activateLoading(false);
            navigation.navigate('TabRoutes', { screen: 'Dashboard' })
          })
          .catch(() => {
            activateLoading(false);
            Alert.alert(
              'Error',
              'Password or Email wrong',
              [
                {
                  text: 'Confirmar',
                  style: 'default'
                }
              ]
            );
          })

      }
    })
  }

  if (loading) {
    return (
      <Loading />
    );
  } else {
    return (
      <Container>
        <HomeBackground source={require('../../images/Background.jpg')}>
          <LogoIcon>
            <Feather name="check-circle" size={120} color="#FF5757" />
          </LogoIcon>

          <Buttons>
            <Button onPress={() => navigation.navigate('Login')}>
              <ButtonText>Login</ButtonText>
            </Button>
            <Button onPress={() => navigation.navigate('Register')}>
              <ButtonText>Registrar</ButtonText>
            </Button>
            <Button onPress={autoLogin}>
              <ButtonText>Entra sem uma conta</ButtonText>
            </Button>
          </Buttons>

          <BrandContainer>
            <PrincipalLogo>
              <Feather name="save" size={60} color="#FF5757" />
            </PrincipalLogo>
            <PrincipalText>SAVE LINK</PrincipalText>
            <LineOne />
            <LineTwo />
          </BrandContainer>
        </HomeBackground>
      </Container>
    );
  }
}