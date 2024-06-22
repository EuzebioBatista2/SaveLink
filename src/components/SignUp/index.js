import React, {useContext, useState} from 'react';
import {
  Button,
  ButtonText,
  Container,
  Input,
  InputBox,
  Label,
  Title,
} from './styles';
import firebase from '../../database/firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {Alert, Keyboard, Text} from 'react-native';
import {ref, set} from 'firebase/database';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from '../../Context/AppContext';

export default function SignUp() {
  const auth = firebase.auth;
  const database = firebase.database;

  const {activateLoading} = useContext(AppContext);

  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [wrongPassword, setWrongPassword] = useState(false);

  function insertName(uid) {
    const dbRef = ref(database, `users/${uid}`);

    set(dbRef, {
      name: name,
    }).then(() => {
      Alert.alert('Sucesso', 'Usuário registrado com sucesso!', [
        {
          text: 'Confirmar',
          style: 'default',
        },
      ]);

      Keyboard.dismiss();
      activateLoading(false);
      navigation.navigate('TabRoutes', {screen: 'Dashboard'});
    });
  }

  function handleRegister() {
    activateLoading(true);
    if (password !== confirmPassword) {
      return setWrongPassword(true);
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(response => {
        insertName(response.user.uid);
      })
      .catch(() => {
        activateLoading(false);
        Alert.alert('Erro', 'Oops! Algo deu errado......', [
          {
            text: 'Confirmar',
            style: 'default',
          },
        ]);
      });
  }

  return (
    <Container>
      <Title>Registrar usuário</Title>

      <InputBox>
        <Label>Nome:</Label>
        <Input
          placeholder="Informe seu nome..."
          placeholderTextColor="#797B7A"
          onChangeText={text => setName(text)}
        />

        <Label>Email:</Label>
        <Input
          placeholder="Informe seu email..."
          placeholderTextColor="#797B7A"
          onChangeText={text => setEmail(text)}
        />

        <Label>Senha:</Label>
        <Input
          placeholder="Informe sua senha..."
          placeholderTextColor="#797B7A"
          onChangeText={text => setPassword(text)}
          style={wrongPassword ? {borderWidth: 1, borderColor: '#FF0000'} : ''}
          secureTextEntry={true}
        />

        <Label>Confirmar senha:</Label>
        <Input
          placeholder="Confirme sua senha..."
          placeholderTextColor="#797B7A"
          onChangeText={text => setConfirmPassword(text)}
          style={wrongPassword ? {borderWidth: 1, borderColor: '#FF0000'} : ''}
          secureTextEntry={true}
        />

        {wrongPassword && (
          <Text style={{color: '#FF0000'}}>Senhas não coincidem</Text>
        )}

        <Button onPress={handleRegister}>
          <ButtonText>Registrar</ButtonText>
        </Button>
      </InputBox>
    </Container>
  );
}
