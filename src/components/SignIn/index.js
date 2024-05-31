import React, { useContext, useState } from "react";
import { 
  Button, 
  ButtonText, 
  Container, 
  Input, 
  InputBox, 
  Label, 
  Title 
} from "./styles";
import firebase from "../../database/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Alert, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../../Context/AppContext";

export default function SignIn() {

  const { getUser, activateLoading } = useContext(AppContext);
  const auth = firebase.auth;
  const navigation = useNavigation()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    activateLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async () => {
        Alert.alert(
          'Sucesso',
          'User logado!',
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
          'Erro',
          'Email ou senha incorreto(s)',
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
          placeholder="Informe seu email..."
          placeholderTextColor="#797B7A"
          onChangeText={(text) => setEmail(text)}
        />

        <Label>Senha:</Label>
        <Input
          placeholder="Informe sua senha..."
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