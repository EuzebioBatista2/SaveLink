import React, { useContext, useState } from "react";
import { Button, ButtonText, Container, Input, InputBox, Label, Title } from "./styles";
import firebase from "../../database/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../../Context/AppContext";

export default function SignIn() {

  const { getUser } = useContext(AppContext);
  const auth = firebase.auth;
  const navigation = useNavigation()

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  function handleLogin() {
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
      navigation.navigate('TabRoutes', { screen: 'Dashboard' })
    })
    .catch(() => {
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


  return (
    <Container>
      <Title>Login</Title>

      <InputBox>
        <Label>Email:</Label>
        <Input
          placeholder="Your email..."
          placeholderTextColor="#797B7A"
          onChangeText={(text) => setEmail(text)}
        />

        <Label>Password:</Label>
        <Input
          placeholder="Your password..."
          placeholderTextColor="#797B7A"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />

        <Button onPress={handleLogin}>
          <ButtonText>Login</ButtonText>
        </Button>
      </InputBox>
    </Container>
  );
}