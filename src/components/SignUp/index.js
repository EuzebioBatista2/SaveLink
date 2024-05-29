import React, { useContext, useState } from "react";
import { Button, ButtonText, Container, Input, InputBox, Label, Title } from "./styles";
import firebase from "../../database/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Alert, Keyboard, Text } from "react-native";
import { ref, set } from "firebase/database";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../../Context/AppContext";
import Loading from "../Loading";

export default function SignUp() {

  const auth = firebase.auth;
  const database = firebase.database;

  const { activateLoading } = useContext(AppContext);

  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [wrongPassword, setWrongPassword] = useState(false);

  function insertName(uid) {
    const dbRef = ref(database, `${uid}`);

    set(dbRef, {
      name: name
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

  function handleRegister() {
    activateLoading(true);
    if (password !== confirmPassword) {
      return setWrongPassword(true);
    }

    createUserWithEmailAndPassword(auth, email, password)
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
  }

  return (
    <Container>
      <Title>Registro</Title>

      <InputBox>
        <Label>Nome:</Label>
        <Input
          placeholder="Seu nome..."
          placeholderTextColor="#797B7A"
          onChangeText={(text) => setName(text)}
        />

        <Label>Email:</Label>
        <Input
          placeholder="Seu email..."
          placeholderTextColor="#797B7A"
          onChangeText={(text) => setEmail(text)}
        />

        <Label>Senha:</Label>
        <Input
          placeholder="Sua senha..."
          placeholderTextColor="#797B7A"
          onChangeText={(text) => setPassword(text)}
          style={wrongPassword ? { borderWidth: 1, borderColor: '#FF0000' } : ''}
        />

        <Label>Confirmar senha:</Label>
        <Input
          placeholder="Confirme sua senha..."
          placeholderTextColor="#797B7A"
          onChangeText={(text) => setConfirmPassword(text)}
          style={wrongPassword ? { borderWidth: 1, borderColor: '#FF0000' } : ''}
        />

        {wrongPassword && (
          <Text style={{ color: '#FF0000' }}>Senhas não coincidem</Text>
        )}

        <Button onPress={handleRegister}>
          <ButtonText>Registrar</ButtonText>
        </Button>
      </InputBox>
    </Container>
  );

}